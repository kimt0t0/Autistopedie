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
exports.IllustrationController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const mongodb_1 = require("mongodb");
const public_decorator_1 = require("../../decorators/public.decorator");
const role_decorator_1 = require("../../decorators/role.decorator");
const role_enum_1 = require("../user/enums/role.enum");
const create_illustration_dto_1 = require("./dto/create-illustration.dto");
const illustration_service_1 = require("./illustration.service");
let IllustrationController = class IllustrationController {
    constructor(illustrationService) {
        this.illustrationService = illustrationService;
    }
    create(createIllustrationDto, illustration) {
        return this.illustrationService.create(createIllustrationDto, illustration);
    }
    findAll() {
        return this.illustrationService.findAll();
    }
    findOne(id) {
        return this.illustrationService.findOne(new mongodb_1.ObjectId(id));
    }
    remove(id) {
        return this.illustrationService.remove(new mongodb_1.ObjectId(id));
    }
};
exports.IllustrationController = IllustrationController;
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.CONTRIBUTOR),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('illustration')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: '.(png|jpeg|jpg|wepb|gif)',
    })
        .addMaxSizeValidator({
        maxSize: 32000000,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        fileIsRequired: true,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_illustration_dto_1.CreateIllustrationDto, Object]),
    __metadata("design:returntype", void 0)
], IllustrationController.prototype, "create", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IllustrationController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IllustrationController.prototype, "findOne", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.CONTRIBUTOR),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IllustrationController.prototype, "remove", null);
exports.IllustrationController = IllustrationController = __decorate([
    (0, common_1.Controller)('illustrations'),
    __metadata("design:paramtypes", [illustration_service_1.IllustrationService])
], IllustrationController);
//# sourceMappingURL=illustration.controller.js.map