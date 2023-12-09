import {useGetBrewlogsQuery} from "../services/api/brewlogApi.ts";
import {MantineReactTable, MRT_ColumnDef, useMantineReactTable} from "mantine-react-table";
import {BrewlogSummaryDto} from "../services/dto/brewlog.dto.ts";
import {Button, Container} from "@mantine/core";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import {useNavigate} from "react-router-dom";

const columns: MRT_ColumnDef<BrewlogSummaryDto>[] = [
    {
        accessorKey: 'date',
        header: 'Date',
        Cell: ({cell}) => dayjs(cell.getValue<Date>()).format('L LT')
    },
    {
        accessorKey: 'grinderSetting',
        header: 'Grind'
    },
    {
        accessorKey: 'doze_in',
        header: 'Doze In'
    },
    {
        accessorKey: 'coffee',
        header: 'Coffee'
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
        mantineTableBodyRowProps: ({row}) => ({
            onClick: () => handleView(row.original._id)
        }),
        renderTopToolbarCustomActions: () => <Button color={'green'} onClick={handleNew}>New</Button>
    })

    return <Container>
        <MantineReactTable table={table}/>
    </Container>

}
