import {Inject, Injectable} from '@nestjs/common';
import {Db, ObjectId} from "mongodb";
import {DATABASE_CONNECTION} from "../mongo/mongo.module";
import {Collections} from "../types/enum";
import {CreateBrewlogDto, UpdateBrewlogDto} from "./dto";
import {brewlogSchema, updateBrewlogSchema} from "brewster-types";
import {createFixture} from "zod-fixture";
import {Brewlog} from "./entities/brewlog.entity";

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
        return this.collection.find({}).sort({date: -1}).toArray();
    }

    sampleData() {
        return createFixture(brewlogSchema.omit({_id: true}).array().min(10));
    }

    findOne(id: string) {
        return this.collection.findOne<Brewlog>({_id: new ObjectId(id)});
    }

    async getNewTemplate(id: string) {
        const res = await this.collection.findOne<Brewlog>({_id: new ObjectId(id)});
        const {_id, date, ...rest} = res;
        return {...rest, date: new Date()}
    }

    async update(updateBrewlogDto: UpdateBrewlogDto) {
        const validate = updateBrewlogSchema.safeParse(updateBrewlogDto);
        if (validate.success) {
            const {_id, ...data} = validate.data;
            const res = await this.collection.updateOne({_id: new ObjectId(_id)}, {$set: data});
            return res;
        }

        throw new Error('Failed to validate data')
    }

    remove(id: string) {
        return this.collection.deleteOne({_id: new ObjectId(id)})
    }
}
