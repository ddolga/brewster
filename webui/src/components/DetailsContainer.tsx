import {Box, Button, Container, Flex, Group, rem} from "@mantine/core";
import React, {PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";

export enum ViewMode {
    new, view, edit
}

interface DetailsContainerProps extends PropsWithChildren {
    readOnly: boolean;
    viewMode: ViewMode;
    onEdit: () => void;
    onSubmit: (save: boolean) => void;
    onClose: () => void;
}

export function convertViewModeToEnum(mode: string): ViewMode {
    type ViewModeString = keyof typeof ViewMode;
    const viewModeAsString: ViewModeString = mode as ViewModeString;
    return ViewMode[viewModeAsString];
}

export function DetailsContainer(props: DetailsContainerProps) {

    const {children, readOnly, viewMode, onEdit, onSubmit, onClose} = props;

    const canEdit = viewMode === ViewMode.edit || viewMode === ViewMode.new;


    return <Container>
        <Flex justify={'flex-end'} sx={{maxWidth:rem(500)}}>
            <Group sx={{paddingBottom: rem(30)}}>
                {readOnly && <Button onClick={onClose}>Back</Button>}
                {viewMode !== ViewMode.new && readOnly &&
                    <Button onClick={onEdit}>Edit</Button>}
                {canEdit && <Button color={'green'} onClick={() => onSubmit(true)} type='submit'>Save</Button>}
                {canEdit && <Button color={'red'} onClick={() => onSubmit(false)}>Cancel</Button>}
            </Group>
        </Flex>
        <Box  sx={{maxWidth:rem(500)}}>
            {children}
        </Box>
    </Container>

}
