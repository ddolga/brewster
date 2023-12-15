import React, {Fragment, useEffect, useState} from "react";
import {Group, Radio, Select, Stack, Textarea, TextInput} from "@mantine/core";
import {useCreateStuffsMutation, useGetStuffsDetailQuery, useUpdateStuffsMutation} from "../services/api/stuffsApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import {CreateStuffsDto, StuffsSummaryDto, UpdateSuffsDto} from "../services/dto/stuffs.dto.ts";
import {useForm} from "../form/Form.ts";
import {convertViewModeToEnum, DetailsContainer, ViewMode} from "../components/DetailsContainer.tsx";
import {createStuffsSchema, typeOfStuffSchema} from "brewster-types";
import {ZodIssue} from "zod";
import {ValueSlider} from "../components/ValueSlider.tsx";
import {BasketTypeType} from "../common/types.ts";

const initialValue: CreateStuffsDto = {
    model: '',
    make: '',
    origin: '',
    type: 'Coffee',
    basketSize: 0,
    basketType: 'Double',
    description: ''
}

interface StuffsWDataProps {
    data: UpdateSuffsDto | CreateStuffsDto;
    viewMode: ViewMode;
}

export function StuffsViewNew() {
    return <StuffsViewWData viewMode={ViewMode.new} data={initialValue}/>
}

export function StuffsView() {

    const {id, mode} = useParams();
    const data: StuffsSummaryDto = useGetStuffsDetailQuery({id: id!}).data;

    const viewMode: ViewMode = convertViewModeToEnum(mode || 'view');
    return <StuffsViewWData viewMode={viewMode} data={data}/>
}


function StuffsViewWData(props: StuffsWDataProps) {

    const {data, viewMode} = props;

    const theId = data ? '_id' in data ? data._id! : null : null;
    const navigate = useNavigate();
    const [updateAction] = useUpdateStuffsMutation();
    const [createAction] = useCreateStuffsMutation();
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const [errors, setErrors] = useState<ZodIssue[]>([]);

    const {getInputProps, state} = useForm<CreateStuffsDto | UpdateSuffsDto>(data, initialValue, errors, readOnly);

    useEffect(() => {
        setReadOnly(!(viewMode === ViewMode.new || viewMode === ViewMode.edit))
    }, [viewMode]);

    function handleEditClick() {
        const id = (state as StuffsSummaryDto)._id;
        navigate(`/stuffs/edit/${id}`)
    }

    function handleOnClose() {
        navigate('/stuffs')
    }

    const handleFormSubmit = (save: boolean) => {
        if (save) {
            const res = createStuffsSchema.safeParse(state);
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
        const id = (state as StuffsSummaryDto)._id;
        navigate('/stuffs' + (viewMode === ViewMode.new ? '' : '/view/' + id))
    }


    const typeOfStuffsOptions: string[] = typeOfStuffSchema.options;

    return <DetailsContainer readOnly={readOnly} viewMode={viewMode} onEdit={handleEditClick}
                             onSubmit={handleFormSubmit} onClose={handleOnClose}>
        <form>
            <Stack>
                <Select label={"Type"}
                        data={typeOfStuffsOptions}
                        {...getInputProps<string>('type')}
                />
                <TextInput label='Brand' {...getInputProps('make')}/>
                <TextInput label='Name' {...getInputProps('model')}  />
                <TextInput label="Origin" {...getInputProps('origin')}  />

                {state.type === 'Basket' && <Fragment>
                    <Radio.Group
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
                </Fragment>}
                <Textarea label='Description' {...getInputProps('description')}  />
            </Stack>
        </form>
    </DetailsContainer>
}
