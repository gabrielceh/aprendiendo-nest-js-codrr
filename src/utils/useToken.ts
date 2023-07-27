import * as jwt from 'jsonwebtoken';
import { AuthTokenResult, IUseToken } from 'src/auth/interfaces/auth.interface';

export const useToken = (token): IUseToken | string => {
  try {
    // decodificamos el token
    const decode = jwt.decode(token) as AuthTokenResult;

    // Calculamos si el token esta expirado
    const currentDate = new Date();
    const expiresDate = new Date(decode.exp);

    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: +expiresDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Token invalido';
  }
};
