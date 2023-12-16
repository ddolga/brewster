import {createStyles, NumberInput, rem} from "@mantine/core";
import {getChecksFromZodSchema} from "./util.ts";
import {InputPropsTypeWithLabel} from "../types/brewlog.ts";

const useStyles = createStyles(() => ({
    numberInput: {
        width: rem(150),
    },
}))

export function StyledNumberInput(props: InputPropsTypeWithLabel<number, (v: number) => void>) {

    const {shape, ...rest} = props;
    const checks = getChecksFromZodSchema(shape);

    const {classes} = useStyles();
    return <NumberInput className={classes.numberInput}
                        min={checks.min || 0}
                        max={checks.max || undefined}
                        {...props}/>
}
