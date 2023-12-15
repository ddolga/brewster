import {Inject, Injectable} from '@nestjs/common';
import {Db, ObjectId} from "mongodb";
import {DATABASE_CONNECTION} from "../mongo/mongo.module";
import {Collections} from "../types/enum";
import {CreateBrewlogDto, UpdateBrewlogDto, updateBrewlogSchema} from "./dto";
import {brewlogSchema} from "brewster-types";
import {createFixture} from "zod-fixture";
import {Brewlog} from "./entities/brewlog.entity";
import dayjs from "dayjs";

const initialValue: Brewlog = {
    _id: '',
    date: dayjs().toDate(),
    grinderSetting: 1,
    grindSize: 400,
    doze_in: 7,
    doze_out: 7,
    doze_used: 7,
    coffee: "Some Coffee",
    roaster: '',
    origin:'',
    comment: "",
    decaff: false,
    brew_time: 25,
    preinfusion: false,
    coffee_out: 6,
    basketType: 'Single',
    basketSize: 7,
    discarded: false,
    drinkType: "Espresso",
    sweetness: 1,
    body: 1,
    acidity: 1,
    flavors: [],
    finish: [],
}
@Injectable()
export class BrewlogsService {

    constructor(@Inject(DATABASE_CONNECTION) private readonly conn: Db) {
    }

    get collection() {
        return this.conn.collection(Collections.BREWLOGS);
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
        if(id === 'start'){
           return initialValue;
        }

        const res = await this.collection.findOne<Brewlog>({_id: new ObjectId(id)});
        const {_id, date, ...rest} = res;
        return {...rest, date: new Date()}
    }

    create(createBrewlogDto: CreateBrewlogDto) {
        return this.collection.insertOne(createBrewlogDto);
    }

    async update(updateBrewlogDto: UpdateBrewlogDto) {
        const validate = updateBrewlogSchema.safeParse(updateBrewlogDto);
        if (validate.success) {
            const {_id, ...data} = validate.data;
            return await this.collection.updateOne({_id: new ObjectId(_id)}, {$set: data});
        }

        throw new Error('Failed to validate data')
    }

    remove(id: string) {
        return this.collection.deleteOne({_id: new ObjectId(id)})
    }
}
