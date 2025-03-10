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
            DATABASE_NAME: Joi.string().required(),

            YOUTUBE_API_KEY: Joi.string().required(),
            OPENGRAPH_API_KEY: Joi.string().required(),
            WEBVIEW_URL: Joi.string().required(),

            JWT_SECRET: Joi.string().required(),
            JWT_EXPIRES_IN: Joi.string().required(),
            JWT_ALGORITHM: Joi.string().required(),

            KAKAO_API_KEY: Joi.string().required(),
            KAKAO_CALLBACK_URI: Joi.string().required(),
        }),
    };
};
