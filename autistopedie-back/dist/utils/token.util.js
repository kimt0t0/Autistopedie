"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = void 0;
const jwt_decode_1 = require("jwt-decode");
const decodeToken = (token) => {
    const decoded = (0, jwt_decode_1.jwtDecode)(token);
    return decoded;
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=token.util.js.map