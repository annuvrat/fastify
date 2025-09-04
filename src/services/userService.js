import { get } from "http";
import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const createUser = async ({ email, password, name }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });
  return result;
};

const getUsers = async ({ name, email }) => {
  const users = await prisma.user.findMany({
    where: {
      AND: [
        name ? { name: { contains: name, mode: "insensitive" } } : {},
        email ? { email: { contains: email, mode: "insensitive" } } : {},
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
      // don't expose password!
    },
  });

  return users;
};

export default { createUser, getUsers };
