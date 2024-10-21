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
exports.IllustrationSchema = exports.Illustration = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_1 = require("mongodb");
const mongoose_2 = require("mongoose");
const datapage_schema_1 = require("../../data/schemas/datapage.schema");
let Illustration = class Illustration {
};
exports.Illustration = Illustration;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongodb_1.ObjectId,
        default: () => new mongodb_1.ObjectId(),
    }),
    __metadata("design:type", mongodb_1.ObjectId)
], Illustration.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ length: 80, nullable: false }),
    __metadata("design:type", String)
], Illustration.prototype, "filename", void 0);
__decorate([
    (0, mongoose_1.Prop)({ length: 256, nullable: false }),
    __metadata("design:type", String)
], Illustration.prototype, "filepath", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.ObjectId, ref: 'Data' }),
    __metadata("design:type", datapage_schema_1.DataPage)
], Illustration.prototype, "dataIllustrated", void 0);
exports.Illustration = Illustration = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Illustration);
exports.IllustrationSchema = mongoose_1.SchemaFactory.createForClass(Illustration);
//# sourceMappingURL=illustration.schema.js.map