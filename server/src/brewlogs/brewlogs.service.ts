import {Inject, Injectable} from '@nestjs/common';
import {Db, ObjectId} from "mongodb";
import {DATABASE_CONNECTION} from "../mongo/mongo.module";
import {Collections} from "../types/enum";
import {CreateBrewlogDto, DetailBrewlogDto, UpdateBrewlogDto} from "./dto";
import {
    brewlogSchema,
    createBrewlogSchema,
    templateBrewlogSchema,
    updateBrewlogSchema
} from "brewster-types";
import {createFixture} from "zod-fixture";
import {Brewlog} from "./entities/brewlog.entity";
import dayjs from "dayjs";
import {Select} from "../types/types";
import {createZodDto} from "nestjs-zod";

const select: Select = {
    sourceId: '',
    label: ''
}

const initialValue: CreateBrewlogDto = {
    date: dayjs().toISOString(),
    grinderSetting: 1,
    grindSize: 400,
    doze_in: 7,
    doze_out: 7,
    doze_used: 7,
    coffee: select,
    comment: "",
    brew_time: 25,
    preinfusion: false,
    coffee_out: 6,
    discarded: false,
    drinkType: "Espresso",
    basket: select,
    sweetness: 1,
    body: 1,
    acidity: 1,
    flavors: [],
    finish: [],
}

class TemplateBrewlogDto extends createZodDto(templateBrewlogSchema){}

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

    async getNewTemplate(id: string): Promise<CreateBrewlogDto | TemplateBrewlogDto> {
        if (id === 'start') {
            return initialValue;
        }

        const res = await this.collection.findOne<Brewlog>({_id: new ObjectId(id)});
        const {_id, date, ...rest} = res;
        return {...rest, date: new Date()} as TemplateBrewlogDto;
    }

    create(createBrewlogDto: CreateBrewlogDto) {
        const res = createBrewlogSchema.safeParse(createBrewlogDto);
        if(res.success){
            return this.collection.insertOne(res.data);
        }

        throw new Error('Failed to validate data')
    }

    async update(updateBrewlogDto: UpdateBrewlogDto) {
        const res = updateBrewlogSchema.safeParse(updateBrewlogDto);
        if (res.success) {
            const {_id, ...data} = res.data;
            return await this.collection.updateOne({_id: new ObjectId(_id)}, {$set: data});
        }

        throw new Error('Failed to validate data')
    }

    remove(id: string) {
        return this.collection.deleteOne({_id: new ObjectId(id)})
    }
}
