import { IsString, IsNotEmpty } from 'class-validator';

export class CourseDto{
    @IsString()
    @IsNotEmpty()
    title: String;

    @IsString()
    @IsNotEmpty()
    description: String;

    @IsString()
    @IsNotEmpty()
    instructor: String;

    @IsString()
    @IsNotEmpty()
    schedule: String;
}