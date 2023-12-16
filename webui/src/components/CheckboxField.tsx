import {Checkbox, createStyles, rem} from "@mantine/core";
import React, {ChangeEventHandler} from "react";
import {InputPropsTypeWithLabel} from "../types/brewlog.ts";

const useStyles = createStyles((theme) => ({
    field: {
        padding: theme.spacing.md,
        textAlign: 'left',
        maxWidth: rem(600)
    },
}))


export function CheckboxField(props: InputPropsTypeWithLabel<boolean,(checked:boolean) => void>) {
    const {label, readOnly, value, onChange} = props;

    const {classes} = useStyles();
    return <Checkbox className={classes.field} label={label}
                     onChange={({target}) => onChange(target.checked)}
                     readOnly={readOnly}
                     checked={value}
    />
}
