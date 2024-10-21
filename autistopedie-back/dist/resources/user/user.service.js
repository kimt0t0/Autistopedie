"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const mongodb_1 = require("mongodb");
const mongoose_2 = require("mongoose");
const token_util_1 = require("../../utils/token.util");
const role_enum_1 = require("./enums/role.enum");
const user_schema_1 = require("./schemas/user.schema");
let UserService = class UserService {
    constructor(request, userModel) {
        this.request = request;
        this.userModel = userModel;
    }
    async create(createUserDto) {
        try {
            const { username, email, password, role } = createUserDto;
            if (role == role_enum_1.Role.ADMIN || role == role_enum_1.Role.CONTRIBUTOR)
                throw new common_1.NotAcceptableException('You cannot create an admin or contributor account on your own. Please contact the administrator of the website if you wish to contribute.');
            const hash = await bcrypt.hash(password, 15);
            const userData = {
                username,
                email,
                hash,
                role,
            };
            if (!role)
                userData.role = role_enum_1.Role.READER;
            const newUser = new this.userModel(userData);
            const createdUser = await newUser.save();
            delete createdUser.email;
            delete createdUser.hash;
            return createdUser;
        }
        catch (e) {
            console.error(`User could not be created due to error with code ${e.code}:  ${e.message}`);
        }
    }
    async findAll() {
        try {
            const users = await this.userModel
                .find()
                .select('-hash')
                .select('-email')
                .populate('addedData')
                .exec();
            return users;
        }
        catch (e) {
            console.error(`Users could not be loaded due to error with code ${e.code}:  ${e.message}`);
        }
    }
    async findAllPublic() {
        try {
            const users = await this.userModel
                .find()
                .select('username')
                .select('createdAt')
                .populate('addedData')
                .exec();
            return users;
        }
        catch (e) {
            console.error(`Users could not be loaded due to error with code ${e.code}:  ${e.message}`);
        }
    }
    async findOne(id) {
        try {
            const selectedUser = await this.userModel
                .findById(id)
                .select('-hash')
                .select('-email')
                .populate('addedData')
                .exec();
            if (!selectedUser)
                throw new common_1.NotFoundException(`User with id ${id} was not found !`);
            return selectedUser;
        }
        catch (e) {
            console.error(`User with id ${id} could not be found due to error with code ${e.code}:  ${e.message}`);
        }
    }
    async findOnePublic(id) {
        try {
            const selectedUser = await this.userModel
                .findById(id)
                .select('username')
                .select('createdAt')
                .populate('addedData')
                .exec();
            if (!selectedUser)
                throw new common_1.NotFoundException(`User with id ${id} was not found !`);
            return selectedUser;
        }
        catch (e) {
            console.error(`User with id ${id} could not be found due to error with code ${e.code}:  ${e.message}`);
        }
    }
    async update(id, updateUserDto) {
        try {
            const { username, email, newEmail, password, newPassword, role } = updateUserDto;
            const token = this.request.rawHeaders
                .find((header) => header.startsWith('Bearer '))
                .replace('Bearer ', '')
                .replace(' ', '');
            const decodedToken = (0, token_util_1.decodeToken)(token);
            const authenticatedUser = await this.userModel
                .findById(new mongodb_1.ObjectId(decodedToken._id))
                .exec();
            if (authenticatedUser.role != role_enum_1.Role.ADMIN &&
                authenticatedUser._id.toString() != id.toString())
                throw new common_1.UnauthorizedException(`A user account can be edited only by its owner or an admin account.`);
            const isPasswordMatch = bcrypt.compare(authenticatedUser.hash, password);
            if (!isPasswordMatch)
                throw new common_1.NotAcceptableException(`User password is incorrect.`);
            if (email != authenticatedUser.email)
                throw new common_1.NotAcceptableException(`User email is incorrect.`);
            let updatedHash;
            if (newPassword) {
                updatedHash = bcrypt.hash(newPassword, 15);
                await this.userModel.findByIdAndUpdate(id, { hash: updatedHash }).exec();
            }
            if (newEmail) {
                await this.userModel.findByIdAndUpdate(id, { email: newEmail }).exec();
            }
            if (role && authenticatedUser.role == role_enum_1.Role.ADMIN) {
                await this.userModel.findByIdAndUpdate(id, { role });
            }
            if (username)
                await this.userModel.findByIdAndUpdate(id, { username }).exec();
            const updatedUser = await this.userModel.findById(id).exec();
            return updatedUser;
        }
        catch (e) {
            console.error(`User with id ${id} could not be updated due to error with code ${e.code}:  ${e.message}`);
        }
    }
    async remove(id, removeUserDto) {
        try {
            const { email, password } = removeUserDto;
            const token = this.request.rawHeaders
                .find((header) => header.startsWith('Bearer '))
                .replace('Bearer ', '')
                .replace(' ', '');
            const decodedToken = (0, token_util_1.decodeToken)(token);
            const authenticatedUser = await this.userModel
                .findById(decodedToken._id)
                .select('email')
                .select('password')
                .exec();
            if (authenticatedUser.role != role_enum_1.Role.ADMIN && authenticatedUser._id != id)
                throw new common_1.UnauthorizedException(`A user account can be edited only by its owner or an admin account.`);
            const isPasswordMatch = bcrypt.compare(authenticatedUser.hash, password);
            if (!isPasswordMatch)
                throw new common_1.NotAcceptableException(`User password is incorrect.`);
            if (email != authenticatedUser.email)
                throw new common_1.NotAcceptableException(`User email is incorrect.`);
            const deletedUser = await this.userModel
                .findByIdAndDelete(id)
                .select('id')
                .select('username')
                .exec();
            return deletedUser;
        }
        catch (e) {
            console.error(`User with id ${id} could not be deleted due to error with code ${e.code}:  ${e.message}`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [Object, mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map