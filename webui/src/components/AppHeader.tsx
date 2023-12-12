import {Burger, Group, Header, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";


interface AppHeaderProps {
    onClick: () => void
}

export function AppHeader(props: AppHeaderProps) {

    const {onClick} = props;

    const [opened, {toggle}] = useDisclosure(false);

    function handleClick() {
        toggle();
        onClick();
    }

    return <Header height={40}>
        <Group>
            <Burger opened={opened} onClick={handleClick}/>
            <Text>BREWSTER</Text>
        </Group>
    </Header>
}
