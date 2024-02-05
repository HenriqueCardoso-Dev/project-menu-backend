import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor (
        @InjectRepository(UserEntity)
        private readonly userRespository: Repository<UserEntity>
    ) {}
    
    async setUserDatabase(createUserDto : CreateUserDto) : Promise<UserEntity> {

        //hashed password
        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDto.password, saltOrRounds);

        return this.userRespository.save({
            ...createUserDto,
            password: passwordHashed
        })
    }


    async getAllUsers() : Promise<UserEntity[]> {
        return  this.userRespository.find();
    }
}
