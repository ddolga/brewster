import {produce} from "immer";
import {get, last, set} from "lodash";
import {useEffect, useReducer} from "react";
import {brewlogSchema} from "brewster-types";
import {ZodIssue, ZodTypeAny} from "zod";
import {InputPropsType} from "../types/brewlog.ts";


type ActionType<T> = {
    type: keyof T | 'reset',
    value: any
}

type Something = { [index: string]: any };

function reducer<T extends Something>(state: T, action: ActionType<T>) {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'reset':
                return action.value;
            default:
                set(draft, action.type, action.value);
        }
    })
}

function getFieldError(field: string, errors: ZodIssue[]) {
    const err = errors.find(e =>  last(e.path)  === field);
    return err ? err.message : '';
}

export function useForm<I extends Something>(data: I, initialValue: I, errors: ZodIssue[], readOnly: boolean = false) {

    const [state, dispatch] = useReducer(reducer, initialValue);

    function getInputProps<T, E = (v: T) => void>(path: string): InputPropsType<T, E> {

        if (initialValue && !(path in initialValue)) {
            throw new Error(`path ${path} does not exist in state`)
        }

        return {
            onChange: ((event: any) => {
                if (event instanceof Object && 'target' in event) {
                    dispatch({type: path, value: event.target.value})
                } else {
                    dispatch({type: path, value: event})
                }
            }) as E,
            value: get(state, path) as T,
            shape: get(brewlogSchema.shape, path),
            readOnly: readOnly,
            error: getFieldError(path, errors)
        }
    }

    useEffect(() => {
        if (data) {
            dispatch({type: 'reset', value: data})
        }
    }, [data])


    return {
        getInputProps,
        dispatch,
        state: state as I,
    }

}
