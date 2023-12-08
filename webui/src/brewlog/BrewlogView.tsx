import React, {ChangeEventHandler, useEffect, useReducer, useState} from "react";
import {Button, Container, createStyles, Flex, Group, Radio, rem, Select, Textarea, TextInput} from "@mantine/core";
import {DateTimePicker} from "@mantine/dates";
import {BrewlogUpdateDto} from "../services/dto/brewlog.dto.ts";
import dayjs from "dayjs";
import {useNavigate, useParams} from "react-router-dom";
import {
    useCreateNewEntryMutation,
    useGetBrewlogEntryQuery,
    useUpdateEntryMutation
} from "../services/api/brewlogApi.ts";
import {BasketTypeType, brewlogSchema, createBrewlogSchema, updateBrewlogSchema} from "brewster-types";
import {get, set} from "lodash";
import {produce} from "immer";
import {Brewlog, InputPropsType} from "./types.ts";
import {ValueSlider} from "../components/ValueSlider.tsx";
import {CheckboxField} from "../components/CheckboxField.tsx";

const useStyles = createStyles((theme) => ({
    field: {
        padding: theme.spacing.md,
        textAlign: 'left',
        maxWidth: rem(600)
    },
    label: {
        width: rem(150),
        textAlign: 'left'
    },
    withLabel: {
        display: 'flex',
    },
}))

interface BrewlogViewProps {
    viewMode: 'new' | 'view' | 'edit',
}

type OnChangeType<T> = (v: T) => void;


interface BrewlogViewWDataProps extends BrewlogViewProps {
    data?: BrewlogUpdateDto
}


const initialValue: Brewlog = {
    _id: '',
    date: dayjs().toDate(),
    grinderSetting: 0,
    grindSize: 0,
    doze_in: 0,
    doze_out: 0,
    doze_used: 0,
    coffee: "Some Coffee",
    decaff: false,
    brew_time: 0,
    preinfusion: false,
    coffee_out: 0,
    basketType: "single",
    basketSize: 0,
    discarded: false,
    drinkType: "espresso",
    sweetness: 0,
    body: 0,
    acidity: 0,
    flavors: [],
    finish: [],
    comment: "",
}

type ActionType = {
    type: keyof Brewlog | 'reset',
    value: any
}

function reducer(state: Brewlog, action: ActionType) {
    return produce(state, draft => {
        switch (action.type) {
            case 'reset':
                return action.value;
            default:
                set(draft, action.type, action.value);
        }
    })
}

export function BrewlogView(props: BrewlogViewProps) {

    const {id} = useParams();
    const data = useGetBrewlogEntryQuery({id: id!}).data;

    const parsed = data ? updateBrewlogSchema.parse(data) : null
    return parsed && <BrewlogViewWData data={parsed} {...props}/>
}


export function BrewlogViewWData(props: BrewlogViewWDataProps) {

    const {viewMode, data} = props;

    const [state, dispatch] = useReducer(reducer, initialValue);
    const navigate = useNavigate();
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const [updateAction] = useUpdateEntryMutation();
    const [createNewAction] = useCreateNewEntryMutation();

    useEffect(() => {
        dispatch({type: 'reset', value: data})
    }, [data]);

    useEffect(() => {
        if (viewMode === 'new' || viewMode === 'edit') {
            setReadOnly(false);
        } else {
            setReadOnly(true);
        }
    }, [viewMode]);

    function handleEditClick() {
        navigate(`/brewlog/edit/${state._id}`)
    }

    const handleFormSubmit = () => {
        if (viewMode === 'new') {
            const {_id, ...rest} = state;
            const entry = createBrewlogSchema.safeParse(rest);
            console.log(entry);
            // createNewAction(entry);
        } else {
            const res = updateBrewlogSchema.safeParse(state);
            if (res.success) {
                updateAction(res.data);
            }
        }
    }


    function getInputProps<T, E = (v: T) => void>(path: keyof Brewlog): InputPropsType<T, E> {

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

    const {classes} = useStyles();
    const canEdit = viewMode === 'edit' || viewMode === 'new';

    return <Container>
        <form onSubmit={handleFormSubmit}>
            <Flex>
                {viewMode !== 'new' && <Button disabled={readOnly} onClick={handleEditClick}>Edit</Button>}
                {canEdit && <Button type='submit'>Submit</Button>}
            </Flex>
            <TextInput className={classes.field} label={'Coffee'}
                       {...getInputProps<string, ChangeEventHandler<HTMLInputElement>>('coffee')} />
            <DateTimePicker className={classes.field} label={'Date'} {...getInputProps<Date>('date')}
            />
            <ValueSlider  {...getInputProps<number>('grinderSetting')} label={'Grinder Setting'}/>
            <ValueSlider  {...getInputProps<number>('grindSize')} label={'Grind Size'}/>
            <ValueSlider  {...getInputProps<number>('doze_in')} label={'Doze Out'}/>
            <ValueSlider  {...getInputProps<number>('doze_out')} label={'Doze In'}/>
            <ValueSlider  {...getInputProps<number>('doze_used')} label={'Doze In'}/>
            <CheckboxField label='Decaff' {...getInputProps<boolean>('decaff')} readOnly={readOnly}/>
            <ValueSlider {...getInputProps<number>('brew_time')} label={'Brew Time'}/>
            <CheckboxField label='Preinfuse' {...getInputProps<boolean>('preinfusion')} readOnly={readOnly}/>
            <ValueSlider {...getInputProps<number>('coffee_out')} label={'Coffee Out'}/>
            <Radio.Group
                className={classes.field}
                name='basketType'
                label='Basket Type'
                {...getInputProps<BasketTypeType>('basketType')}
            >
                <Group>
                    <Radio value='single' disabled={readOnly} label={'Single'}/>
                    <Radio value='double' disabled={readOnly} label={'Double'}/>
                </Group>
            </Radio.Group>
            <ValueSlider {...getInputProps<number>('basketSize')} label={'Basket Size'}/>
            <CheckboxField label='Discarded' {...getInputProps<boolean>('discarded')} readOnly={readOnly}/>
            <Select className={classes.field}
                    label='Drink Type'
                    placeholder='Pick drink'
                    data={['Espresso', 'Latte', 'Cappuccino']}
                    {...getInputProps<string>('drinkType')}
            />
            <ValueSlider {...getInputProps<number>('sweetness')} label={'Sweetness Out'}/>
            <ValueSlider {...getInputProps<number>('body')} label={'Body'}/>
            <ValueSlider {...getInputProps<number>('acidity')} label={'Acidity'}/>
            <Textarea className={classes.field} label='Comment'
                      {...getInputProps<string, ChangeEventHandler<HTMLTextAreaElement>>('comment')}
            />
        </form>
    </Container>
}
