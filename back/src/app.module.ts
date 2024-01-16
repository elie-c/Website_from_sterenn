import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { User } from './users/user.entity';
import { Association } from './associations/association.entity';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/role.entity';
import { MinutesModule } from './minutes/minutes.module';
import { Minute } from './minutes/minute.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

// @ts-ignore
@Module({
    controllers: [AppController],
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'database',
            port: 5432,
            username: "esir",
            password: "esir",
            database: 'assoDeRennes',
            entities: [User, Association, Role, Minute],
            synchronize: true,
        }),
        UsersModule, AssociationsModule, AuthModule, RolesModule, MinutesModule],
    providers: [AppService],
})
export class AppModule {}
