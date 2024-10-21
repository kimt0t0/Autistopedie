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
exports.DataPageService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const mongodb_1 = require("mongodb");
const mongoose_2 = require("mongoose");
const token_util_1 = require("../../utils/token.util");
const role_enum_1 = require("../user/enums/role.enum");
const user_schema_1 = require("../user/schemas/user.schema");
const datapage_schema_1 = require("./schemas/datapage.schema");
let DataPageService = class DataPageService {
    constructor(request, userModel, dataPageModel) {
        this.request = request;
        this.userModel = userModel;
        this.dataPageModel = dataPageModel;
    }
    async create(createDataDto) {
        try {
            const token = this.request.rawHeaders
                .find((header) => header.startsWith('Bearer '))
                .replace('Bearer ', '')
                .replace(' ', '');
            const decodedToken = (0, token_util_1.decodeToken)(token);
            const authenticatedUser = await this.userModel
                .findById(new mongodb_1.ObjectId(decodedToken._id))
                .select('_id')
                .select('role')
                .exec();
            if (authenticatedUser.role != role_enum_1.Role.ADMIN && authenticatedUser.role != role_enum_1.Role.CONTRIBUTOR)
                throw new common_1.UnauthorizedException('You cannot create new data without an admin or contributor account.');
            const newData = new this.dataPageModel(createDataDto);
            newData.dataAuthor = authenticatedUser;
            const createdData = await newData.save();
            try {
                await this.userModel.findByIdAndUpdate(new mongodb_1.ObjectId(authenticatedUser._id), {
                    addedData: createdData,
                });
            }
            catch (e) {
                console.error(`New data could not be related to user account with id ${authenticatedUser._id} due to error with code ${e.code}: ${e.message}`);
            }
            return await this.dataPageModel
                .findById(createdData._id)
                .populate('dataAuthor')
                .populate('illustration')
                .exec();
        }
        catch (e) {
            console.error(`Data could not be created due to error with code ${e.code}: ${e.message}`);
        }
    }
    async findAll() {
        try {
            const data = await this.dataPageModel
                .find()
                .populate('illustration')
                .populate('dataAuthor')
                .exec();
            return data;
        }
        catch (e) {
            console.error(`Data could not be loaded due to error with code ${e.code}: ${e.message}`);
        }
    }
    async findOne(id) {
        try {
            const data = await this.dataPageModel
                .findById(id)
                .populate('illustration')
                .populate('dataAuthor')
                .exec();
            return data;
        }
        catch (e) {
            console.error(`Single data page could not be loaded due to error with code ${e.code}: ${e.message}`);
        }
    }
    async update(id, updateDataDto) {
        try {
            const token = this.request.rawHeaders
                .find((header) => header.startsWith('Bearer '))
                .replace('Bearer ', '')
                .replace(' ', '');
            const decodedToken = (0, token_util_1.decodeToken)(token);
            const authenticatedUser = await this.userModel
                .findById(new mongodb_1.ObjectId(decodedToken._id))
                .select('_id')
                .select('role')
                .exec();
            if (authenticatedUser.role != role_enum_1.Role.ADMIN && authenticatedUser.role != role_enum_1.Role.CONTRIBUTOR)
                throw new common_1.UnauthorizedException('You cannot update new data without an admin or contributor account.');
            await this.dataPageModel.findByIdAndUpdate(id, { ...updateDataDto });
            const updatedData = await this.dataPageModel
                .findById(id)
                .populate('illustration')
                .populate('dataAuthor')
                .exec();
            return await this.dataPageModel
                .findById(updatedData._id)
                .populate('dataAuthor')
                .populate('illustration')
                .exec();
        }
        catch (e) {
            console.error(`Data with id ${id} could not be updated due to error with code ${e.code}: ${e.message}`);
        }
    }
    async remove(id, removeDataDto) {
        try {
            const { email, password } = removeDataDto;
            const token = this.request.rawHeaders
                .find((header) => header.startsWith('Bearer '))
                .replace('Bearer ', '')
                .replace(' ', '');
            const decodedToken = (0, token_util_1.decodeToken)(token);
            const authenticatedUser = await this.userModel
                .findById(new mongodb_1.ObjectId(decodedToken._id))
                .select('email')
                .select('hash')
                .select('role')
                .exec();
            const dataPage = await this.dataPageModel
                .findById(new mongodb_1.ObjectId(id))
                .populate('dataAuthor')
                .exec();
            if (authenticatedUser.role != role_enum_1.Role.ADMIN &&
                authenticatedUser._id.toString() != dataPage.dataAuthor._id.toString())
                throw new common_1.UnauthorizedException(`A datapage can be removed only by its owner or an admin account.`);
            const isPasswordMatch = bcrypt.compare(authenticatedUser.hash, password);
            if (!isPasswordMatch)
                throw new common_1.NotAcceptableException(`User password is incorrect.`);
            if (email != authenticatedUser.email)
                throw new common_1.NotAcceptableException(`User email is incorrect.`);
            const deletedData = await this.dataPageModel
                .findByIdAndDelete(id)
                .select('_id')
                .select('title')
                .exec();
            return deletedData;
        }
        catch (e) {
            console.error(`Data with id ${id} could not be removed due to error with code ${e.code}: ${e.message}`);
        }
    }
};
exports.DataPageService = DataPageService;
exports.DataPageService = DataPageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(datapage_schema_1.DataPage.name)),
    __metadata("design:paramtypes", [Object, mongoose_2.Model,
        mongoose_2.Model])
], DataPageService);
//# sourceMappingURL=datapage.service.js.map