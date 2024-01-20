import { FastifyRequest } from "fastify";
import { User } from "../entities/user.entity";

export type RequestAuthenticated = FastifyRequest & { user: User };
