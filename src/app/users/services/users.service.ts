import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async createUser(userId: number) {
        const savedUser = this.usersRepository.create({ id: userId });
        await this.usersRepository.save(savedUser);
    }
}
