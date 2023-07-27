// inyectamos idUser y roleUser a las request de express
declare namespace Express {
  interface Request {
    idUser: string;
    roleUser: string;
  }
}
