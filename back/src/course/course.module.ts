import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'schemas/course.schema';
import { JwtGuard } from 'guards/jwt.guard';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'schemas/user.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
            UserModule],
  controllers: [CourseController],
  providers: [CourseService, JwtGuard],
})
export class CourseModule {}
