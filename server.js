import Fastify from 'fastify';
import userRouter from './src/routes/user.js';

const fastify = Fastify({ logger: true });





fastify.register(userRouter, { prefix: '/api' });  
 
// try {
   fastify.listen({ port: 3000 });
//   console.log('Server listening at http://localhost:3000');
// } catch (err) { 
//   fastify.log.error(err);
//   process.exit(1);
// } 
