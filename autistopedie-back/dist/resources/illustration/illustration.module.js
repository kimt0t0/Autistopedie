"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IllustrationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const datapage_schema_1 = require("../data/schemas/datapage.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const illustration_controller_1 = require("./illustration.controller");
const illustration_service_1 = require("./illustration.service");
const illustration_schema_1 = require("./schemas/illustration.schema");
let IllustrationModule = class IllustrationModule {
};
exports.IllustrationModule = IllustrationModule;
exports.IllustrationModule = IllustrationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: illustration_schema_1.Illustration.name, schema: illustration_schema_1.IllustrationSchema },
                { name: datapage_schema_1.DataPage.name, schema: datapage_schema_1.DataPageSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            platform_express_1.MulterModule.registerAsync({
                useFactory: () => ({
                    storage: (0, multer_1.diskStorage)({
                        destination: './public/data-illustrations',
                        filename: (req, illustration, callback) => {
                            const uniquePrefix = Date.now() + '_' + Math.round(Math.random() * 1e4);
                            callback(null, uniquePrefix + illustration.originalname);
                        },
                    }),
                }),
            }),
        ],
        controllers: [illustration_controller_1.IllustrationController],
        providers: [illustration_service_1.IllustrationService],
    })
], IllustrationModule);
//# sourceMappingURL=illustration.module.js.map