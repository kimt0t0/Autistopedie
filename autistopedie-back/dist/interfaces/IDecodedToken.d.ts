import { ObjectId } from 'mongodb';
import { Role } from 'src/resources/user/enums/role.enum';
export interface IDecodedToken {
    _id: string | ObjectId;
    username: string;
    role: Role;
}
