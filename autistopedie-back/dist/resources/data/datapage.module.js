"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPageModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const illustration_schema_1 = require("../illustration/schemas/illustration.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const datapage_controller_1 = require("./datapage.controller");
const datapage_service_1 = require("./datapage.service");
const datapage_schema_1 = require("./schemas/datapage.schema");
let DataPageModule = class DataPageModule {
};
exports.DataPageModule = DataPageModule;
exports.DataPageModule = DataPageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: datapage_schema_1.DataPage.name, schema: datapage_schema_1.DataPageSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: illustration_schema_1.Illustration.name, schema: illustration_schema_1.IllustrationSchema },
            ]),
        ],
        controllers: [datapage_controller_1.DataPageController],
        providers: [datapage_service_1.DataPageService],
    })
], DataPageModule);
//# sourceMappingURL=datapage.module.js.map