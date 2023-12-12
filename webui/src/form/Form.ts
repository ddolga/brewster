import {produce} from "immer";
import {get, set} from "lodash";
import {useReducer} from "react";
import {InputPropsType} from "../brewlog/types.ts";
import {brewlogSchema} from "brewster-types";


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

export function useForm<I extends Something>(initialValue: I, readOnly: boolean = false) {

    const [state, dispatch] = useReducer(reducer, initialValue);

    function getInputProps<T, E = (v: T) => void>(path: string): InputPropsType<T, E> {

        if (!(path in Object.keys(initialValue))) {
            throw new Error('path is not compatible')
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
            readOnly: readOnly
        }
    }

    return {
        getInputProps
    }

}
