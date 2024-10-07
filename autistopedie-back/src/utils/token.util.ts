import { jwtDecode } from 'jwt-decode';
import { IDecodedToken } from 'src/interfaces/IDecodedToken';

export const decodeToken = (token): IDecodedToken => {
    const decoded = jwtDecode<IDecodedToken>(token);
    return decoded;
};
