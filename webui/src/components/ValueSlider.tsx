import React, {useEffect, useState} from "react";
import {Box, createStyles, NumberInput, rem, Slider, Text} from "@mantine/core";
import {InputPropsTypeWithLabel} from "../brewlog/types.ts";
import {StyledNumberInput} from "./StyledNumberInput.tsx";
import {getChecksFromZodSchema} from "./util.ts";

const DEFAULT_SLIDER_MAX = 100;


const useStyles = createStyles((theme) => ({
    readOnly:{
        textAlign:'left',
        marginLeft:rem(15),
        width:rem(150)
    },
    container:{
        width:'80%',
        marginLeft:rem(15)
    },
    label: {
        padding: theme.spacing.md,
        textAlign: 'left',
        maxWidth: rem(600)
    },
    slider: {
        width: rem(500),
        position: 'relative',
        top: rem(45),
        left: rem(10)
    }
}))


export function ValueSlider(props: InputPropsTypeWithLabel<number, (v: number) => void>) {

    const {label, readOnly, value: initValue, onChange, shape} = props;

    const [value, setValue] = useState(initValue);

    const checks = getChecksFromZodSchema(shape);

    useEffect(() => {
        if (initValue) {
            setValue(initValue)
        }
    }, [initValue]);

    const {classes} = useStyles();

    if (readOnly) {
        return <NumberInput className={classes.readOnly}  disabled={readOnly} label={label} value={value}/>
    } else {
        return <Box className={classes.container}>
            <Text className={classes.label}>{label}</Text>
            <Slider
                onChange={setValue}
                labelAlwaysOn
                thumbSize={14}
                onChangeEnd={(v) => onChange(v)}
                disabled={readOnly}
                value={value}
                min={checks.min || 0}
                max={checks.max || DEFAULT_SLIDER_MAX}
            />
        </Box>
    }

}
