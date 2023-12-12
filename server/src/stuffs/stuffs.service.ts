import {Inject, Injectable} from '@nestjs/common';
import {CreateStuffDto} from './dto/create-stuff.dto';
import {UpdateStuffDto} from './dto/update-stuff.dto';
import {Db, ObjectId} from "mongodb";
import {DATABASE_CONNECTION} from "../mongo/mongo.module";
import {Collections} from "../types/enum";
import {Stuff} from "./entities/stuff.entity";
import {createFixture} from "zod-fixture";
import {stuffsSchema} from "brewster-types";

@Injectable()
export class StuffsService {

    constructor(@Inject(DATABASE_CONNECTION) private readonly conn: Db) {
    }

    get collection() {
        return this.conn.collection(Collections.STUFFS);
    }

    create(createStuffDto: CreateStuffDto) {
        return this.collection.insertOne(createStuffDto);
    }

    findAll() {
        return this.collection.find({}).sort({type:1}).toArray();
    }

    sampleData() {
        return createFixture(stuffsSchema.omit({_id: true}).array().min(20));
    }

    findOne(id: number) {
        return this.collection.find<Stuff>({_id: new ObjectId(id)});
    }

    update(id: number, updateStuffDto: UpdateStuffDto) {
        return this.collection.updateOne({_id: new ObjectId(id)}, updateStuffDto);
    }

    remove(id: number) {
        return this.collection.deleteOne({id: new ObjectId(id)})
    }
}