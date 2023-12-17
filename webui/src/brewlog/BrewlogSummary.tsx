import React from "react";
import {useGetBrewlogsQuery} from "../services/api/brewlogApi.ts";
import {MantineReactTable, MRT_ColumnDef, useMantineReactTable} from "mantine-react-table";
import {createStyles} from "@mantine/core";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import {useNavigate} from "react-router-dom";
import {SummaryContainer} from "../components/SummaryContainer.tsx";
import {BrewlogSummaryDto} from "../types/dto/brewlog.dto.ts";

const useStyles = createStyles(() => ({
    table: {
        width: '100%'
    }
}));


const columns: MRT_ColumnDef<BrewlogSummaryDto>[] = [
    {
        accessorKey: 'date',
        header: 'Date',
        Cell: ({cell}) => dayjs(cell.getValue<Date>()).format('L LT')
    },
    {
        accessorKey: 'drinkType',
        header: 'Drink Type'
    },
    {
        accessorKey: 'coffee',
        header: 'Coffee'
    },
    {
        accessorKey: 'doze_used',
        header: 'Doze'
    },
    {
        accessorKey: 'brew_time',
        header: 'Brew Time'
    },

]

dayjs.extend(LocalizedFormat);

export function BrewlogSummary() {

    const data: BrewlogSummaryDto[] = useGetBrewlogsQuery({}).data || [];
    const navigate = useNavigate();


    function handleNew() {
        const last = data.length > 0 ? data[0]._id : null;

        navigate(last ? `/brewlog/new/${last}` : '/brewlog/new/start');
    }

    function handleView(id: string) {
        navigate(`/brewlog/view/${id}`)
    }

    const table = useMantineReactTable({
        data: data,
        columns: columns,
        enableFullScreenToggle: false,
        mantinePaperProps: {sx: {width: '100%', margin: 'auto'}},
        mantineTableBodyRowProps: ({row}) => ({
            onClick: () => handleView(row.original._id)
        }),
    })

    const {classes} = useStyles();
    return <SummaryContainer onNew={handleNew}>
        <MantineReactTable table={table}/>
    </SummaryContainer>

}
