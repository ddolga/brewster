import React, {ChangeEventHandler, useEffect, useState} from "react";
import {
    Accordion,
    AccordionItemProps,
    createStyles,
    Group,
    Radio,
    rem,
    Select,
    Text,
    Textarea,
    TextInput
} from "@mantine/core";
import {BrewlogSummaryDto, CreateBrewlogDto, createBrewlogSchema} from "../services/dto/brewlog.dto.ts";
import dayjs from "dayjs";
import {useNavigate, useParams} from "react-router-dom";
import {
    useCreateNewEntryMutation,
    useGetBrewlogEntryQuery,
    useGetBrewlogNewTemplateQuery,
    useUpdateEntryMutation
} from "../services/api/brewlogApi.ts";
import {set} from "lodash";
import {produce} from "immer";
import {Brewlog} from "./types.ts";
import {ValueSlider} from "../components/ValueSlider.tsx";
import {CheckboxField} from "../components/CheckboxField.tsx";
import {DateTimePickerString} from "../components/DateTimePickerString.tsx";
import {StyledNumberInput} from "../components/StyledNumberInput.tsx";
import {useForm} from "../form/Form.ts";
import {convertViewModeToEnum, DetailsContainer, ViewMode} from "../components/DetailsContainer.tsx";
import {ZodIssue} from "zod";
import {BasketTypeType} from "../common/types.ts";
import {drinkTypeSchema} from "brewster-types";

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
    highlite: {
        backgroundColor: theme.colors.dark[4],
        borderRadius: rem(10),
        boxShadow: theme.shadows.md,
        padding: rem(5),
        marginLeft: rem(15),
        marginTop: rem(10),
    }
}))

interface BrewlogViewProps {
}

type OnChangeType<T> = (v: T) => void;


interface BrewlogViewWDataProps extends BrewlogViewProps {
    viewMode: ViewMode,
    data: BrewlogSummaryDto | CreateBrewlogDto
}


const initialValue: BrewlogSummaryDto = {
    _id: '',
    date: dayjs().toISOString(),
    grinderSetting: 0,
    grindSize: 0,
    doze_in: 0,
    doze_out: 0,
    doze_used: 0,
    coffee: "Some Coffee",
    origin: "",
    comment: "",
    roaster: "",
    decaff: false,
    brew_time: 0,
    preinfusion: false,
    coffee_out: 0,
    basketType: 'Single',
    basketSize: 0,
    discarded: false,
    drinkType: "Espresso",
    sweetness: 0,
    body: 0,
    acidity: 0,
    flavors: [],
    finish: [],
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

    const {id, mode} = useParams();

    const viewMode: ViewMode = convertViewModeToEnum(mode || 'view');
    const data: BrewlogSummaryDto | undefined = useGetBrewlogEntryQuery({id: id!}).data;
    return data && <BrewlogViewWData viewMode={viewMode} data={data} {...props}/>
}

export function BrewlogNew(props: BrewlogViewProps) {

    const {id} = useParams();

    const data: CreateBrewlogDto | undefined = useGetBrewlogNewTemplateQuery({id: id!}).data;

    return data && <BrewlogViewWData viewMode={ViewMode.new} data={data} {...props}/>
}

export function BrewlogViewWData(props: BrewlogViewWDataProps) {

    const {data, viewMode} = props;

    const theId = data ? '_id' in data ? data._id! : null : null;
    const navigate = useNavigate();
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const [updateAction] = useUpdateEntryMutation();
    const [createAction] = useCreateNewEntryMutation();
    const [errors, setErrors] = useState<ZodIssue[]>([]);

    const {getInputProps, state} = useForm(data, initialValue, errors, readOnly);

    useEffect(() => {
        setReadOnly(!(viewMode === ViewMode.new || viewMode === ViewMode.edit))
    }, [viewMode]);

    function handleEditClick() {
        const id = (state as BrewlogSummaryDto)._id;
        navigate(`/brewlog/edit/${id}`)
    }

    function handleOnClose() {
        navigate('/brewlog')
    }

    const handleFormSubmit = (save: boolean) => {
        if (save) {
            const res = createBrewlogSchema.safeParse(state);
            if (!res.success) {
                setErrors(res.error.issues);
                return;
            } else {
                if (viewMode === ViewMode.new) {
                    createAction(res.data);
                } else {
                    updateAction({_id: theId!, ...res.data});
                }
            }
        }

        setErrors([]);
        const id = (state as BrewlogSummaryDto)._id;
        navigate('/brewlog' + (viewMode === ViewMode.new ? '' : '/view/' + id))
    }

    function StyledAccordionItem(props: AccordionItemProps) {

        const {value, children, ...rest} = props;

        return <Accordion.Item value={value} {...rest}>
            <Accordion.Control><Text fw={700} color={'#d4dc00'}>{value}</Text></Accordion.Control>
            <Accordion.Panel>
                {children}
            </Accordion.Panel>
        </Accordion.Item>
    }


    const {classes} = useStyles();

    return <DetailsContainer readOnly={readOnly} viewMode={viewMode} onEdit={handleEditClick}
                             onSubmit={handleFormSubmit} onClose={handleOnClose}>

        <form onSubmit={() => handleFormSubmit(true)}>
            <DateTimePickerString className={classes.field} label={'Date'} {...getInputProps<string>('date')} />
            <CheckboxField label='Discarded' {...getInputProps<boolean>('discarded')} readOnly={readOnly}/>
            <Accordion>
                <StyledAccordionItem value={'Doze'}>
                    <Select className={classes.field}
                            label='Drink Type'
                            placeholder='Pick drink'
                            data={drinkTypeSchema.options}
                            {...getInputProps<string>('drinkType')}
                    />
                    <ValueSlider  {...getInputProps<number>('grinderSetting')} label={'Grinder Setting'}/>
                    <Group className={classes.highlite}>
                        <StyledNumberInput  {...getInputProps<number>('doze_in')} label={'Doze In'}/>
                        <StyledNumberInput {...getInputProps<number>('doze_out')} label={'Doze Out'}/>
                        <StyledNumberInput  {...getInputProps<number>('doze_used')} label={'Doze Used'}/>
                    </Group>
                </StyledAccordionItem>
                <StyledAccordionItem value={'Brew'}>
                    <CheckboxField label='Preinfuse' {...getInputProps<boolean>('preinfusion')}
                                   readOnly={readOnly}/>


                    <Group className={classes.highlite}>
                        <StyledNumberInput {...getInputProps<number>('coffee_out')} label={'Coffee Out'}/>
                        <StyledNumberInput {...getInputProps<number>('brew_time')} label={'Brew Time'}/>
                    </Group>
                </StyledAccordionItem>
                <StyledAccordionItem value={'Basket'}>
                    <Select label='Basket'
                            placeholder='Select basket...'
                            data={[]}

                    />
                    <Radio.Group
                        className={classes.field}
                        name='basketType'
                        label='Basket Type'
                        {...getInputProps<BasketTypeType>('basketType')}
                    >
                        <Group>
                            <Radio value='Single' disabled={readOnly} label={'Single'}/>
                            <Radio value='Double' disabled={readOnly} label={'Double'}/>
                        </Group>
                    </Radio.Group>
                    <ValueSlider {...getInputProps<number>('basketSize')} label={'Basket Size'}/>
                </StyledAccordionItem>
                <StyledAccordionItem value={'Coffee'}>
                    <TextInput className={classes.field} label={'Coffee'}
                               {...getInputProps<string, ChangeEventHandler<HTMLInputElement>>('coffee')} />
                    <TextInput className={classes.field} label={'Roaster'}
                               {...getInputProps<string, ChangeEventHandler<HTMLInputElement>>('roaster')} />
                    <TextInput className={classes.field} label={'Origin'}
                               {...getInputProps<string, ChangeEventHandler<HTMLInputElement>>('origin')} />
                    <CheckboxField label='Decaff' {...getInputProps<boolean>('decaff')} readOnly={readOnly}/>
                </StyledAccordionItem>
                <StyledAccordionItem value={'Rating'}>
                    <ValueSlider {...getInputProps<number>('sweetness')} label={'Sweetness Out'}/>
                    <ValueSlider {...getInputProps<number>('body')} label={'Body'}/>
                    <ValueSlider {...getInputProps<number>('acidity')} label={'Acidity'}/>
                    <Textarea className={classes.field} label='Comment'
                              {...getInputProps<string, ChangeEventHandler<HTMLTextAreaElement>>('comment')}
                    />
                </StyledAccordionItem>
            </Accordion>
        </form>
    </DetailsContainer>
}
