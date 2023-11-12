import {Inject, Injectable} from '@nestjs/common';
import {CreateBrewlogDto} from './dto/create-brewlog.dto';
import {UpdateBrewlogDto} from './dto/update-brewlog.dto';
import {Db, ObjectId} from "mongodb";
import {DATABASE_CONNECTION} from "../mongo/mongo.module";
import {Collections} from "../types/enum";

@Injectable()
export class BrewlogsService {

    constructor(@Inject(DATABASE_CONNECTION) private readonly conn: Db) {
    }

    get collection() {
        return this.conn.collection(Collections.BREWLOGS);
    }

    create(createBrewlogDto: CreateBrewlogDto) {
        return this.collection.insertOne(createBrewlogDto);
    }

    findAll() {
        return this.collection.find({}).toArray();
    }

    findOne(id: string) {
        return this.collection.findOne({_id: new ObjectId(id)})
    }

    update(id: string, updateBrewlogDto: UpdateBrewlogDto) {
        return this.collection.updateOne({_id: new ObjectId(id)}, {$set: updateBrewlogDto});
    }

    remove(id: string) {
        return this.collection.deleteOne({_id: new ObjectId(id)})
    }
}
