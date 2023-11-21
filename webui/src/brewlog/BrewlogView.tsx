import React, {Fragment, useEffect, useState} from "react";
import {Box, Button, Checkbox, Group, Radio, Select, Slider, Text, Textarea, TextInput} from "@mantine/core";
import {DateTimePicker} from "@mantine/dates";
import {BrewlogCreateDto, BrewlogSummaryDto, BrewlogUpdateDto} from "../services/dto/brewlog.dto.ts";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import {
    useCreateNewEntryMutation,
    useGetBrewlogEntryQuery,
    useUpdateEntryMutation
} from "../services/api/brewlogApi.ts";
import {useForm} from "@mantine/form";
import {createBrewlogSchema, updateBrewlogSchema} from "brewster-types";

interface BrewlogViewProps {
    viewMode: boolean,
    isNew: boolean
}

interface BrewlogViewWDataProps extends BrewlogViewProps {
    data?: BrewlogUpdateDto
}

const initialValue: BrewlogSummaryDto = {
    _id: '',
    date: '',
    grinderSetting: 0,
    grindSize: 0,
    doze_in: 0,
    doze_out: 0,
    coffee: "",
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
    comment: ""
}

export function BrewlogView(props: BrewlogViewProps) {

    const {id} = useParams();
    const data = useGetBrewlogEntryQuery({id: id!}).data;

    const parsed = data ? updateBrewlogSchema.parse(data) : null

    return parsed && <BrewlogViewWData data={parsed} {...props}/>
}

export function BrewlogViewWData(props: BrewlogViewWDataProps) {

    const {viewMode, isNew, data} = props;

    const [readOnly, setReadOnly] = useState<boolean>(viewMode);

    const [updateAction] = useUpdateEntryMutation();
    const [createNewAction] = useCreateNewEntryMutation();

    const form = useForm({
        initialValues: data || initialValue,
    })

    useEffect(() => {
        if (data) {
            form.setValues(data);
        }
    }, [data])

    function handleEditClick() {
        setReadOnly(!readOnly);
    }

    const handleFormSubmit = form.onSubmit((values) => {
        if (isNew) {
            const {_id, ...rest} = values;
            const entry: BrewlogCreateDto = createBrewlogSchema.parse(rest);
            createNewAction(entry);
        } else {
            const entry: BrewlogUpdateDto = updateBrewlogSchema.parse(values);
            updateAction(entry);
        }
    })

    function ValueSlider(props: { readOnly: boolean, path: string, label: string }) {
        return <Fragment>
            <Text>{props.label}</Text>
            <Slider labelAlwaysOn defaultValue={50}
                    disabled={props.readOnly}   {...form.getInputProps(props.path)}   />
        </Fragment>
    }

    return <Box>
        {!isNew && <Button onClick={handleEditClick}>Edit</Button>}
        <form onSubmit={handleFormSubmit}>
            <DateTimePicker label={'Date'} defaultValue={dayjs().toDate()}
                            readOnly={readOnly} {...form.getInputProps('date')}/>
            <ValueSlider readOnly={readOnly} path={'grinderSetting'} label={'Grinder Setting'}/>
            <ValueSlider readOnly={readOnly} path={'grindSize'} label={'Grind Size'}/>
            <ValueSlider readOnly={readOnly} path={'doze_in'} label={'Doze Out'}/>
            <ValueSlider readOnly={readOnly} path={'doze_out'} label={'Doze In'}/>
            <TextInput label={'Coffee'} readOnly={readOnly}  {...form.getInputProps('coffee')} />
            <Checkbox label='Decaff' disabled={readOnly}  {...form.getInputProps('decaff')}  />
            <ValueSlider readOnly={readOnly} path={'brew_time'} label={'Brew Time'}/>
            <Checkbox label='Preinfuse' disabled={readOnly} {...form.getInputProps('preinfusion')}   />
            <ValueSlider readOnly={readOnly} path={'coffee_out'} label={'Coffee Out'}/>
            <Text>Basket Size</Text>
            <Group>
                <Radio disabled={readOnly} label={'Single'}/>
                <Radio disabled={readOnly} label={'Double'}/>
            </Group>
            <Checkbox label='Discarded' disabled={readOnly} {...form.getInputProps('discarded')} />
            <Select label='Drink Type' placeholder='Pick drink'
                    data={['Espresso', 'Latte', 'Cappuccino']}
                    readOnly={readOnly}
                    {...form.getInputProps('drinkType')}
            />
            <ValueSlider readOnly={readOnly} path={'sweetness'} label={'Sweetness Out'}/>
            <ValueSlider readOnly={readOnly} path={'body'} label={'Body'}/>
            <ValueSlider readOnly={readOnly} path={'acidity'} label={'Acidity'}/>
            <Textarea label='Comment' {...form.getInputProps('comment')} readOnly={readOnly}/>
        </form>
    </Box>
}
