import { createUser, getuser } from "../controllers/userController.js";

async function userRouter(fastify, options) {
  // Define the POST /user route
  fastify.post("/user", createUser);
  fastify.get("/user/get", getuser);

  // You can add more routes here, e.g., GET, PUT, DELETE
}

export default userRouter;
