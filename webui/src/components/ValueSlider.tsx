import React, {useEffect, useState} from "react";
import {createStyles, Flex, rem, Slider, TextInput} from "@mantine/core";
import {InputPropsTypeWithLabel} from "../brewlog/types.ts";
import {ZodTypeAny} from "zod";

const DEFAULT_SLIDER_MAX = 100;

interface ChecksType {
    min: number,
    max: number
}

const useStyles = createStyles((theme) => ({
    field: {
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


function digForChecksInDef(def: any) {

    switch (def.typeName) {
        case 'ZodEffects':
            return digForChecksInDef((def as any).schema._def)
        case 'ZodOptional':
            return digForChecksInDef(def.innerType._def);
        case 'ZodNumber':
            return def.checks;
        default:
            throw new Error('Could not find checks in schema def')
    }
}

function getChecksFromZodSchema(shape: ZodTypeAny): ChecksType {
    const checks = digForChecksInDef(shape._def);
    return checks.reduce((c: any, v: any) => {
        c[v.kind] = v.value
        return c;
    }, {});
}

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
    return <Flex className={classes.field}>
        <TextInput sx={{width: rem(150)}} onChange={({target}) => setValue(Number.parseInt(target.value))} value={value}
                   label={label}/>
        <Slider className={classes.slider}
                onChange={setValue}
                onChangeEnd={(v) => onChange(v)}
                disabled={readOnly}
                value={value}
                min={checks.min || 0}
                max={checks.max || DEFAULT_SLIDER_MAX}
        />
    </Flex>
}
