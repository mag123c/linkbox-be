import { Injectable } from '@nestjs/common';
import { CreateUserReq, UpdateUserReq, UsersRes } from '../dto/users.dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    /**
     * @API GET /users
     * @param userId
     */
    async getUser(userId: number) {
        const user = await this.usersRepository.findOneOrFail({ where: { id: userId } });
        return UsersRes.of(user);
    }

    /**
     * @API POST /users
     * @param req
     * @returns
     */
    async createUser(req: CreateUserReq) {
        const user = this.usersRepository.create({ ...req });
        const savedUser = await this.usersRepository.save(user);
        return UsersRes.of(savedUser);
    }

    /**
     * @PATCH /users/:userId
     * @param userId
     * @param req
     */
    async updateUser(userId: number, req: UpdateUserReq) {
        await this.usersRepository.update({ id: userId }, { ...req });
        return await this.getUser(userId);
    }

    /**
     * @param uuid
     * @returns
     */
    async getUserByUUID(uuid: string) {
        const user = await this.usersRepository.findOne({ where: { uuid } });
        return user;
    }
}
