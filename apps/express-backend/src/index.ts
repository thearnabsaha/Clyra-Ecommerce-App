import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3001;
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { SignUpSchema } from '@workspace/utils/types';
const morganFormat = ':method :url :status :response-time ms';
import { graphqlHTTP } from 'express-graphql';
import { schema } from '@workspace/graphql/index';
app.use(morgan(morganFormat));
app.use(helmet());
import { prisma } from '@workspace/database/client'
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('hello from simple server :)');
});
app.get('/health', async (req, res) => {
    const start = Date.now();
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: new Date(),
        responseTime: `${Date.now() - start}ms`,
    };
    res.status(200).json(healthcheck);
});
app.post('/signup', async (req, res) => {
    const result = SignUpSchema.safeParse(req.body);
    if (!result.success) {
        res.send(result.error.format());
    } else {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                age: req.body.age,
                password: req.body.password,
            }
        });

        res.send(user);
    }
});
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // enables GraphiQL UI
}));
app.listen(port, () => console.log('> Server is up and running on port: ' + port));