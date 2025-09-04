import userService from "../services/userService.js";
import { PrismaClient } from "../generated/prisma/index.js";
const Prisma = new PrismaClient();

export const createUser = async (request, reply) => {
  const { email, password, name } = request.body;
  if (!email || !password || !name) {
    reply.code(400);
    return { error: "Missing required fields: email, password, name" };
  }
  const user = await Prisma.user.findUnique({ where: { email } });
  if (user) {
    reply.code(409);
    return { error: "User with this email already exists" };
  }
  const result = await userService.createUser({ email, password, name });

  reply.code(201);
  return { id: result.id, result };
};

export const getuser = async (request, reply) => {
  const { name, email } = request.query;

  try {
    const users = await userService.getUsers({ name, email });
    reply.code(200).send(users);
  } catch (err) {
    console.error(err);
    reply.code(500).send({ error: "Something went wrong" });
  }
};
