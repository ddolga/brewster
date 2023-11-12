import {Inject, Injectable} from '@nestjs/common';
import {CreateEquipmentDto} from './dto/create-equipment.dto';
import {UpdateEquipmentDto} from './dto/update-equipment.dto';
import {Db, ObjectId} from "mongodb";
import {DATABASE_CONNECTION} from "../mongo/mongo.module";
import {Collections} from "../types/enum";

@Injectable()
export class EquipmentService {

    constructor(@Inject(DATABASE_CONNECTION) private readonly conn: Db) {
    }

    get collection() {
        return this.conn.collection(Collections.EQUIPMENT);
    }

    create(createEquipmentDto: CreateEquipmentDto) {
        return this.collection.insertOne(createEquipmentDto);
    }

    findAll() {
        return this.collection.find({}).toArray();
    }

    findOne(id: string) {
        return this.collection.findOne({_id: new ObjectId(id)})
    }

    update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
        return this.collection.updateOne({_id: new ObjectId(id)}, {$set: updateEquipmentDto});
    }

    remove(id: string) {
        return this.collection.deleteOne({_id: new ObjectId(id)})
    }
}
