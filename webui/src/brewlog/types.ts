import {z, ZodAny, ZodTypeAny} from "zod";
import {brewlogSchema} from "brewster-types";

export type Brewlog = z.infer<typeof brewlogSchema>;


export interface InputPropsType<T, E> {
    readOnly: boolean,
    value: T,
    onChange: E,
    error:string,
    shape: ZodTypeAny
}

export interface InputPropsTypeWithLabel<T, E> extends InputPropsType<T, E> {
    label: string;
}
