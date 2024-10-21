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
exports.DataPageController = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const public_decorator_1 = require("../../decorators/public.decorator");
const role_decorator_1 = require("../../decorators/role.decorator");
const role_enum_1 = require("../user/enums/role.enum");
const datapage_service_1 = require("./datapage.service");
const create_datapage_dto_1 = require("./dto/create-datapage.dto");
const remove_datapage_dto_1 = require("./dto/remove-datapage.dto");
const update_datapage_dto_1 = require("./dto/update-datapage.dto");
let DataPageController = class DataPageController {
    constructor(dataPageService) {
        this.dataPageService = dataPageService;
    }
    create(createDataDto) {
        return this.dataPageService.create(createDataDto);
    }
    findAll() {
        return this.dataPageService.findAll();
    }
    findOne(id) {
        return this.dataPageService.findOne(new mongodb_1.ObjectId(id));
    }
    update(id, updateDataDto) {
        return this.dataPageService.update(new mongodb_1.ObjectId(id), updateDataDto);
    }
    remove(id, removeDataDto) {
        return this.dataPageService.remove(new mongodb_1.ObjectId(id), removeDataDto);
    }
};
exports.DataPageController = DataPageController;
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.CONTRIBUTOR),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_datapage_dto_1.CreateDataPageDto]),
    __metadata("design:returntype", void 0)
], DataPageController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DataPageController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DataPageController.prototype, "findOne", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.CONTRIBUTOR),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_datapage_dto_1.UpdateDataPageDto]),
    __metadata("design:returntype", void 0)
], DataPageController.prototype, "update", null);
__decorate([
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN, role_enum_1.Role.CONTRIBUTOR),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, remove_datapage_dto_1.RemoveDataPageDto]),
    __metadata("design:returntype", void 0)
], DataPageController.prototype, "remove", null);
exports.DataPageController = DataPageController = __decorate([
    (0, common_1.Controller)('datapages'),
    __metadata("design:paramtypes", [datapage_service_1.DataPageService])
], DataPageController);
//# sourceMappingURL=datapage.controller.js.map