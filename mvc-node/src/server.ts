import express from 'express';
import helmet from 'helmet';
import router from './routes';
import passport from 'passport';
import { localStrategy } from './libs/passport-local.lib';

const server = express();

passport.use(localStrategy);

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(passport.initialize());

server.use('/', router);

server.listen(3000, () => {
    console.log('Servidor rodando: http://localhost:3000/');
});