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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPageSchema = exports.DataPage = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_1 = require("mongodb");
const mongoose_2 = require("mongoose");
const illustration_schema_1 = require("../../illustration/schemas/illustration.schema");
const user_schema_1 = require("../../user/schemas/user.schema");
const category_enum_1 = require("../enums/category.enum");
let DataPage = class DataPage {
};
exports.DataPage = DataPage;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongodb_1.ObjectId,
        default: () => new mongodb_1.ObjectId(),
    }),
    __metadata("design:type", mongodb_1.ObjectId)
], DataPage.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ length: 255, nullable: false, unique: true }),
    __metadata("design:type", String)
], DataPage.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], DataPage.prototype, "summary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Mixed, nullable: true }),
    __metadata("design:type", Object)
], DataPage.prototype, "contents", void 0);
__decorate([
    (0, mongoose_1.Prop)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], DataPage.prototype, "authors", void 0);
__decorate([
    (0, mongoose_1.Prop)({ nullable: false, default: [category_enum_1.Category.OTHER] }),
    __metadata("design:type", Array)
], DataPage.prototype, "categories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.ObjectId, ref: 'Illustration' }),
    __metadata("design:type", illustration_schema_1.Illustration)
], DataPage.prototype, "illustration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], DataPage.prototype, "dataAuthor", void 0);
exports.DataPage = DataPage = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DataPage);
exports.DataPageSchema = mongoose_1.SchemaFactory.createForClass(DataPage);
//# sourceMappingURL=datapage.schema.js.map