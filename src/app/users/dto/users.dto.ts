import { faker } from '@faker-js/faker';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Users } from '../entities/users.entity';

export class UsersRes {
    id!: number;
    name!: string;
    thumbnail!: number;

    static of(user: Users) {
        const usersRes = new UsersRes();
        usersRes.id = user.id;
        usersRes.name = user.name;
        usersRes.thumbnail = user.thumbnail;
        return usersRes;
    }
}

export class CreateUserReq {
    @IsString()
    @IsNotEmpty()
    uuid!: string;

    @IsNumber()
    @IsOptional()
    thumbnail: number = faker.number.int({ min: 1, max: 11 });

    @IsString()
    @IsOptional()
    name: string = faker.lorem.word({ length: { min: 5, max: 10 } });

    constructor(partial: Partial<CreateUserReq>) {
        Object.assign(this, partial);
    }
}

export class UpdateUserReq {
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    thumbnail?: number;
}
