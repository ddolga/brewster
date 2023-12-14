import {Box, Button, createStyles, Flex, rem} from "@mantine/core";
import {PropsWithChildren} from "react";


const useStyles = createStyles((theme) => ({
    controls:{
        paddingBottom:theme.spacing.sm
    }
}))

interface DetailContainerProps extends PropsWithChildren{
   onNew:() => void
}

export function SummaryContainer(props: DetailContainerProps) {

    const {onNew,children} = props;

    const {classes} = useStyles();
    return <Box>
        <Flex className={classes.controls}>
            <Button color={'green'} onClick={onNew}>New</Button>
        </Flex>
        <Box>
            {children}
        </Box>
    </Box>
}
