import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async find(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findMatchedKeycloackUser(keycloackUser): Promise<UserEntity> {
        return await this.findOneByUserName(keycloackUser.preferred_username);
    }

    async findOneById(id: number): Promise<UserEntity> {
        return (await this.userRepository.findOne({where: {id}})) || null;
    }

    async findOneByUserName(username: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({username});

        return user || null;
    }

    async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
        const newUser = await this.userRepository.create(user);

        return this.userRepository.save(newUser);
    }

    async findOrCreate(keycloackUser): Promise<UserEntity> {
        const user = await this.findOneByUserName(keycloackUser.preferred_username);

        if (user) {
            return user;
        }

        return this.createUser({username: keycloackUser.preferred_username});
    }
}
