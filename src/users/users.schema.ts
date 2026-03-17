import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ default: 'user' }) // user / admin
    role: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: true }) // active/inactive
    status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);