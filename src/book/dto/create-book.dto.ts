import { Category } from "../schemas/book.schema";
import { IsNotEmpty, IsEnum, IsNumber, IsString, MinLength, MaxLength } from "class-validator";


export class CreateBookDto{

    @MaxLength(40)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    readonly title : string;

    @MaxLength(1000)
    @MinLength(10)
    @IsString()
    @IsNotEmpty()
    readonly description : string;

    @MinLength(3)
    @MaxLength(40)
    @IsString()
    @IsNotEmpty()
    readonly author: string;

    @MinLength(3)
    @MaxLength(40)
    @IsNumber()
    @IsNotEmpty()
    readonly price: number;

    @IsEnum(Category, {message:'Please enter correct category'})
    @IsNotEmpty()
    readonly category: Category;


}