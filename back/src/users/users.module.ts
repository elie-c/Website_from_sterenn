import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { AssociationsModule } from "src/associations/associations.module";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports:[TypeOrmModule.forFeature([User]),
        ClientsModule.register([
            {
                name: 'MAIL_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [
                        `amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PWD}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`,
                    ],
                    queue: process.env.RABBIT_QUEUE,
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),],
    controllers: [UsersController],
    providers: [UsersService],
    exports:[UsersService]
})
export class UsersModule{}