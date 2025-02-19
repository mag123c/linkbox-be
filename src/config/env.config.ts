import Joi from 'joi';

//환경변수 검사
export const envConfig = () => {
    const ENV: string[] = ['local', 'production', 'test'];
    return {
        isGlobal: true,
        envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
        validationSchema: Joi.object({
            NODE_ENV: Joi.string().valid(...ENV),
            DATABASE_HOST: Joi.string().required(),
            DATABASE_PORT: Joi.number().required(),
            DATABASE_USERNAME: Joi.string().required(),
            DATABASE_PASSWORD: Joi.string().required(),
        }),
    };
};
