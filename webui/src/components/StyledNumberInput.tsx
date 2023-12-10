import {createStyles, NumberInput, NumberInputProps, rem} from "@mantine/core";

const useStyles = createStyles(() => ({
     numberInput:{
         width:rem(150),
     }
}))
export function StyledNumberInput(props:NumberInputProps){

    const {classes} = useStyles();

    return <NumberInput  {...props}/>
}
