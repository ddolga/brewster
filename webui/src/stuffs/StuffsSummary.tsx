import {StuffsSummaryDto} from "../services/dto/stuffs.dto.ts";
import {useGetStuffsQuery} from "../services/api/stuffsApi.ts";
import {Badge, Card, createStyles, Group, rem, Text} from "@mantine/core";
import {useNavigate} from "react-router-dom";

const useStyles = createStyles(() => ({
    card: {
        width: rem(300),
        height: rem(100),
    }
}))


interface StuffsItemProps {
    stuff: StuffsSummaryDto;
}

function StuffsCard(props: StuffsItemProps) {

    const {stuff} = props;
    const navigate = useNavigate();

    function handleClick(id: string) {
        navigate(`/stuffs/view/${id}`);
    }

    const {classes} = useStyles();
    return <Card className={classes.card} onClick={() => handleClick(stuff._id)}>
        <Group position='apart' mt='md' align='center'>
            <Text>{stuff.model}</Text>
            <Badge>{stuff.type}</Badge>
        </Group>
    </Card>
}


export function StuffsSummary() {

    const data: StuffsSummaryDto[] = useGetStuffsQuery({}).data || []

    return <Group sx={{maxWidth: rem(950)}}>
        {data.map(s => <StuffsCard stuff={s}/>)}
    </Group>
}
