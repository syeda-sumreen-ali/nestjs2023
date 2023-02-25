import { IsNotEmpty , IsOptional, MaxLength, MinLength, IsString, IsNumber, IsEnum } from "class-validator";
import { Category } from "../schemas/book.schema";

export class UpdateBookDto{
    @IsOptional()
    @MaxLength(40)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    readonly title : string;

    @IsOptional()
    @MaxLength(1000)
    @MinLength(10)
    @IsString()
    @IsNotEmpty()
    readonly description : string;

    @IsOptional()
    @MaxLength(40)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    readonly author: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    readonly price: number;

    @IsOptional()
    @IsEnum(Category, {message:'Please enter correct category'})
    @IsNotEmpty()
    readonly category: Category;


}