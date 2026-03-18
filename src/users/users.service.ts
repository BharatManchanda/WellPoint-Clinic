import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}
    async create(data: any) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = new this.userModel({
            ...data,
            password: hashedPassword,
        });

        return user.save();
    }

    async findAll() {
        return this.userModel.find();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return user;
    }
}
