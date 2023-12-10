import {DateTimePicker, DateTimePickerProps} from "@mantine/dates";
import React from "react";

export function DateTimePickerString(props: Omit<DateTimePickerProps, "value" | "onChange"> & { value: string } & {
    onChange: (val: string) => void
}) {

    const {value, onChange, ...rest} = props;

    return <DateTimePicker value={new Date(value)} onChange={(date) => onChange(date!.toISOString())}   {...rest}/>
}
