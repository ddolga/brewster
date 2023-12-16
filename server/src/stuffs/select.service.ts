import {Inject, Injectable} from "@nestjs/common";
import {Db} from "mongodb";
import {DATABASE_CONNECTION} from "../mongo/mongo.module";
import {Collections} from "../types/enum";
import {Stuff} from "./entities/stuff.entity";
import {Select, TypeOfStuff} from "../types/types";


@Injectable()
export class SelectService {

    constructor(@Inject(DATABASE_CONNECTION) private readonly conn: Db) {
    }

    get collection() {
        return this.conn.collection(Collections.STUFFS);
    }

    private static formatSummary(type: TypeOfStuff, stuff: Stuff) {
        switch (type) {
            case "Basket":
                return `${stuff.make} ${stuff.model} ${stuff.basketSize}g (${stuff.basketType})`
            case 'Coffee':
                return `${stuff.make} ${stuff.model}` + (stuff.decaff ? ' (Decaff)' : '');
            default:
                return `${stuff.make} ${stuff.model}`;
        }
    }

    async getSelection(type: TypeOfStuff):Promise<Select[]> {
        const res = await this.collection.find<Stuff>({type: type}).toArray();
        return res.map((stuff: Stuff) => {
            return {sourceId: stuff._id, label: SelectService.formatSummary(type, stuff)}
        })
    }

}
