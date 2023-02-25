import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
import {Query } from 'express-serve-static-core'


@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>

    ){}

    async findAll(query: Query ):Promise<Book[]>{
        
        //pagination
        const resPerPage= 2
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage - 1 )


        //search

        //  $and: [ { $or: [{title: regex },{description: regex}] }, {category: value.category}, {city:value.city} ] } 
      let regex= {
                $regex: query.keyword,
                $options:'i'
            }
        const keyword= query.keyword? {
            $or: [
                {title:regex},
                {description: regex},
                {category: regex},
                {author:regex}
            ]
        }:{}
       
         

        const book = await this.bookModel
        .find({...keyword})
        .limit(resPerPage)
        .skip(skip);
        return book;
    }

    async create(book: Book):Promise<Book>{
        const res = await this.bookModel.create(book)
        return res
    }

    async findById(id:string): Promise<Book>{
        const book = await this.bookModel.findById(id);
        if(!book){
            throw new NotFoundException('Book not found')
        }
        return book
    }

    async updateById(id: string, book:Book): Promise<Book>{
        return await this.bookModel.findByIdAndUpdate(id, book,{
            new : true,
            runValidators: true
        })
    }

    async deleteById(id: string): Promise <Book>{
        return await this.bookModel.findByIdAndDelete(id)
    }
}
