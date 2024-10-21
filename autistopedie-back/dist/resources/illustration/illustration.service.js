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
exports.IllustrationService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_1 = require("mongodb");
const mongoose_2 = require("mongoose");
const token_util_1 = require("../../utils/token.util");
const datapage_schema_1 = require("../data/schemas/datapage.schema");
const role_enum_1 = require("../user/enums/role.enum");
const user_schema_1 = require("../user/schemas/user.schema");
const illustration_schema_1 = require("./schemas/illustration.schema");
const fs = require('fs');
let IllustrationService = class IllustrationService {
    constructor(request, illustrationModel, dataModel, userModel) {
        this.request = request;
        this.illustrationModel = illustrationModel;
        this.dataModel = dataModel;
        this.userModel = userModel;
    }
    async create(createIllustrationDto, illustration) {
        try {
            const { dataId } = createIllustrationDto;
            try {
                const data = await this.dataModel
                    .findById(new mongodb_1.ObjectId(dataId))
                    .populate('illustration')
                    .exec();
                if (data.illustration) {
                    await this.remove(new mongodb_1.ObjectId(data.illustration._id));
                }
            }
            catch (e) {
                console.error(`Former illustration could not be found due to error with code ${e.code}: ${e.message}`);
            }
            const filename = illustration.filename;
            const filepath = illustration.path;
            const newIllustration = new this.illustrationModel({
                dataIllustrated: new mongodb_1.ObjectId(dataId),
                filename,
                filepath,
            });
            const createdIllustration = await newIllustration.save();
            try {
                await this.dataModel
                    .findByIdAndUpdate(new mongodb_1.ObjectId(dataId), { illustration: createdIllustration })
                    .exec();
            }
            catch (e) {
                console.error(`New illustration with id ${createdIllustration._id} could not be added to data page with id ${dataId} due to error with code ${e.code}: ${e.message}`);
            }
            return createdIllustration;
        }
        catch (e) {
            console.error(`New illustration could not be saved due to error with code ${e.code}: ${e.message}`);
        }
    }
    async findAll() {
        try {
            const illustrations = await this.illustrationModel.find();
            return illustrations;
        }
        catch (e) {
            console.error(`Illustrations could not be loaded due to error with code ${e.code}: ${e.message}`);
        }
    }
    async findOne(id) {
        try {
            const illustration = await this.illustrationModel.findById(id).exec();
            return illustration;
        }
        catch (e) {
            console.error(`Illustration with id ${id} could not be loaded due to error with code ${e.code}: ${e.message}`);
        }
    }
    async remove(id) {
        try {
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
            if (authenticatedUser.role != role_enum_1.Role.ADMIN && authenticatedUser.role != role_enum_1.Role.CONTRIBUTOR)
                throw new common_1.UnauthorizedException(`An illustration can be removed only by a contributor or admin account.`);
            const deletedIllustration = await this.illustrationModel
                .findByIdAndDelete(id)
                .select('_id')
                .select('filename')
                .select('filepath')
                .exec();
            if (!deletedIllustration)
                throw new common_1.NotFoundException(`Illustration with id ${id} was not found.`);
            fs.unlinkSync(deletedIllustration.filepath);
            return deletedIllustration;
        }
        catch (e) {
            console.error(`Illustration with id ${id} could not be removed due to error with code ${e.code}: ${e.message}`);
        }
    }
};
exports.IllustrationService = IllustrationService;
exports.IllustrationService = IllustrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __param(1, (0, mongoose_1.InjectModel)(illustration_schema_1.Illustration.name)),
    __param(2, (0, mongoose_1.InjectModel)(datapage_schema_1.DataPage.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [Object, mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], IllustrationService);
//# sourceMappingURL=illustration.service.js.map