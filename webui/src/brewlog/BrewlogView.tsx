import React, {ChangeEventHandler, useEffect, useReducer, useState} from "react";
import {Button, Container, createStyles, Flex, Group, Radio, rem, Select, Textarea, TextInput} from "@mantine/core";
import {DateTimePicker, DateTimePickerProps} from "@mantine/dates";
import {BrewlogSummaryDto, CreateBrewlogDto} from "../services/dto/brewlog.dto.ts";
import dayjs from "dayjs";
import {useNavigate, useParams} from "react-router-dom";
import {
    useCreateNewEntryMutation,
    useGetBrewlogEntryQuery,
    useGetBrewlogNewTemplateQuery,
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
    padded: {
        margin: rem(2)
    }
}))

interface BrewlogViewProps {
}

type OnChangeType<T> = (v: T) => void;

export enum ViewMode {
    new, view, edit
}

interface BrewlogViewWDataProps extends BrewlogViewProps {
    data: BrewlogSummaryDto | CreateBrewlogDto
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

function convertViewModeToEnum(mode: string): ViewMode {
    type ViewModeString = keyof typeof ViewMode;
    const viewModeAsString: ViewModeString = mode as ViewModeString;
    return ViewMode[viewModeAsString];
}


export function BrewlogView(props: BrewlogViewProps) {

    const {id} = useParams();

    const data: BrewlogSummaryDto | undefined = useGetBrewlogEntryQuery({id: id!}).data;
    return data && <BrewlogViewWData data={data} {...props}/>
}

export function BrewlogNew(props: BrewlogViewProps) {

    const {id} = useParams();

    const data: CreateBrewlogDto | undefined = useGetBrewlogNewTemplateQuery({id: id!}).data;
    return data && <BrewlogViewWData data={data} {...props}/>
}

export function BrewlogViewWData(props: BrewlogViewWDataProps) {

    const {data} = props;

    const {mode} = useParams();
    const viewMode: ViewMode = convertViewModeToEnum(mode || 'view');

    const [state, dispatch] = useReducer(reducer, initialValue);
    const navigate = useNavigate();
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const [updateAction] = useUpdateEntryMutation();
    const [createNewAction] = useCreateNewEntryMutation();

    useEffect(() => {
        dispatch({type: 'reset', value: data})
    }, [data]);

    useEffect(() => {
        setReadOnly(!(viewMode === ViewMode.new || viewMode === ViewMode.edit))
    }, [viewMode]);

    function handleEditClick() {
        navigate(`/brewlog/edit/${state._id}`)
    }

    function handleGoBack() {
        navigate('/brewlog')
    }

    const handleFormSubmit = (save: boolean) => {
        if (save) {
            if (viewMode === ViewMode.new) {
                const {_id, ...rest} = state;
                const resCreate = createBrewlogSchema.safeParse(rest);
                if (resCreate.success) {
                    createNewAction(resCreate.data);
                }
            } else {
                const resSave = updateBrewlogSchema.safeParse(state);
                if (resSave.success) {
                    updateAction(resSave.data);
                }
            }
        }
        navigate(`/brewlog/view/${state._id}`)
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

    function DateTimePickerString(props: Omit<DateTimePickerProps, "value" | "onChange"> & { value: string } & {
        onChange: (val: string) => void
    }) {

        const {value, onChange, ...rest} = props;

        return <DateTimePicker value={new Date(value)} onChange={(date) => onChange(date!.toISOString())}   {...rest}/>
    }

    const {classes} = useStyles();
    const canEdit = viewMode === ViewMode.edit || viewMode === ViewMode.new;

    return <Container>
        <form onSubmit={() => handleFormSubmit(true)}>
            <Flex>
                <Button className={classes.padded} onClick={handleGoBack}>Back</Button>
                {viewMode !== ViewMode.new && readOnly &&
                    <Button className={classes.padded} onClick={handleEditClick}>Edit</Button>}
                {canEdit && <Button className={classes.padded} color={'green'} type='submit'>Save</Button>}
                {canEdit && <Button className={classes.padded} color={'red'}
                                    onClick={() => handleFormSubmit(false)}>Cancel</Button>}
            </Flex>
            <TextInput className={classes.field} label={'Coffee'}
                       {...getInputProps<string, ChangeEventHandler<HTMLInputElement>>('coffee')} />
            <DateTimePickerString className={classes.field} label={'Date'} {...getInputProps<string>('date')}
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
