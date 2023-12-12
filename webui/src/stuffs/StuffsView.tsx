import React, {useEffect, useReducer} from "react";
import {Button, Container, Select, Textarea, TextInput} from "@mantine/core";
import {useGetStuffsDetailQuery, useUpdateStuffsMutation} from "../services/api/stuffsApi.ts";
import {useParams} from "react-router-dom";
import {CreateStuffsDto} from "../services/dto/stuffs.dto.ts";
import {produce} from "immer";
import {set} from "lodash";

const initialValue: CreateStuffsDto = {
    model: '',
    make: '',
    origin: '',
    type: 'coffee',
    description: ''
}

type ActionType = {
    type: keyof CreateStuffsDto | 'reset',
    value: any
}


function reducer(state: CreateStuffsDto, action: ActionType) {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'reset':
                return action.value;
            default:
                set(draft, action.type, action.value);
        }
    })
}


export function StuffsView() {

    const [updateAction] = useUpdateStuffsMutation();
    const {id} = useParams();
    const data = useGetStuffsDetailQuery({id: id!}).data;

    const [state, dispatch] = useReducer(reducer, initialValue);

    useEffect(() => {
        if (data) {
            dispatch({type: 'reset', value: data})
        }
    }, [data]);


    const handleFormSubmit = (save: boolean) => {
        if(save){
            updateAction(state)
        }
    }

    return <Container>
        <form onSubmit={() => handleFormSubmit(true)}>
            <Button type='submit'>Save</Button>
            <Select label={"Type"} data={["brewer", "coffee", "grinder", "basket", "scale", "tamper"]}/>
            <TextInput label="Make"/>
            <TextInput label="Model"/>
            <TextInput label="Origin"/>
            <Textarea label='Description'/>
        </form>
    </Container>
}
