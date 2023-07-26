import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const allowedOrigin = ['http://localhost:3000'];
export const CORS: CorsOptions = {
  origin: allowedOrigin,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
};
