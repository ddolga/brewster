import {useGetStuffsQuery} from "../services/api/stuffsApi.ts";
import {Badge, Box, Card, createStyles, Flex, Group, rem, Text} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {SummaryContainer} from "../components/SummaryContainer.tsx";
import {StuffsSummaryDto} from "../types/dto/stuffs.dto.ts";

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
        <Card.Section sx={{textAlign:'right'}}>
            <Badge color={'blue'}>{stuff.type}</Badge>
        </Card.Section>
        <Text>{stuff.make}</Text>
        <Text>{stuff.model}</Text>
    </Card>
}


export function StuffsSummary() {

    const data: StuffsSummaryDto[] = useGetStuffsQuery({}).data || []
    const navigate = useNavigate();

    function handleNew() {
        navigate('/stuffs/new')
    }

    return <SummaryContainer onNew={handleNew}>
        <Group sx={{maxWidth: rem(950)}}>
            {data.map(s => <StuffsCard key={s._id}  stuff={s}/>)}
        </Group>
    </SummaryContainer>

}
