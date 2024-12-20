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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
let AuthService = class AuthService {
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async login(loginAuthDto) {
        const { username, password } = loginAuthDto;
        if (!username)
            throw new common_1.NotAcceptableException(`User must enter a username.`);
        if (!password)
            throw new common_1.NotAcceptableException(`User must enter a password.`);
        try {
            const user = await this.userModel.findOne({ username }).select('-email').select('-id');
            if (!user)
                throw new common_1.NotFoundException(`User with username ${username} was not found.`);
            const isMatch = await bcrypt.compare(password, user.hash);
            if (!isMatch)
                throw new common_1.UnauthorizedException(`User password is incorrect.`);
            const payload = { _id: user._id, username: user.username, role: user.role };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
        catch (e) {
            throw new Error(`Could not login user with username ${username}: ${e}`);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map