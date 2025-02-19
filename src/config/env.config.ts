import Joi from 'joi';

//환경변수 검사
export const envConfig = () => {
    const ENV: string[] = ['local', 'dev', 'production', 'test', 'staging'];
    return {
        isGlobal: true,
        envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
        validationSchema: Joi.object({
            NODE_ENV: Joi.string().valid(...ENV),
            AWS_REGION: Joi.string().required(),
            AWS_ACCESS_KEY_ID: Joi.string().required(),
            AWS_SECRET_ACCESS_KEY: Joi.string().required(),
            AWS_S3_BUCKET_NAME: Joi.string().required(),
        }),
    };
};
