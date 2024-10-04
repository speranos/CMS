import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'strategy/jwt.strategy';
import { JwtGuard } from 'guards/jwt.guard';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  JwtModule.register({
     secret: String(process.env.JWT_SECRET),
     signOptions: { expiresIn: '30s'}
  }) ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, JwtGuard],
})
export class UserModule {}
