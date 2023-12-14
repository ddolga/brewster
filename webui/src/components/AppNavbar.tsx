import {createStyles, Navbar, UnstyledButton} from "@mantine/core";
import {useNavigate} from "react-router-dom";


const useStyles = createStyles((theme) => ({
   button:{
       display:'block',
       width:'100%',
       padding:theme.spacing.xs
   }
}))

interface AppNavbarProps {
    opened: boolean;
}

interface MainLinkProps {
    label: string;
    path:string;
}

function MainLink(props: MainLinkProps) {

    const {path,label} = props;
    const {classes} = useStyles();

    const navigate = useNavigate();

    function handleClick(){
       navigate(path)
    }

    return <UnstyledButton className={classes.button}
        onClick={handleClick}
    >
        {label}
    </UnstyledButton>
}

function MainLinks() {
    return <div>
        <MainLink path={'/brewlog'} label='Brew Log'/>
        <MainLink path={'/stuffs'} label='Sundries'/>
    </div>
}


export function AppNavbar(props: AppNavbarProps) {

    const {opened} = props;

    return opened && <Navbar width={{base: 125}} height={'100%'}><MainLinks/></Navbar>
}
