"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDataPageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_datapage_dto_1 = require("./create-datapage.dto");
class UpdateDataPageDto extends (0, mapped_types_1.PartialType)(create_datapage_dto_1.CreateDataPageDto) {
}
exports.UpdateDataPageDto = UpdateDataPageDto;
//# sourceMappingURL=update-datapage.dto.js.map