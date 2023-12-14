import './App.css'
import {BrewlogSummary} from "./brewlog/BrewlogSummary.tsx";
import {AppShell} from "@mantine/core";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {BrewlogNew, BrewlogView} from "./brewlog/BrewlogView.tsx";
import {AppHeader} from "./components/AppHeader.tsx";
import {AppNavbar} from "./components/AppNavbar.tsx";
import {useDisclosure} from "@mantine/hooks";
import {StuffsSummary} from "./stuffs/StuffsSummary.tsx";
import {StuffsView, StuffsViewNew} from "./stuffs/StuffsView.tsx";

function App() {

    const [opened, {toggle}] = useDisclosure(false);


    return <Routes>
        <Route path='/'
               element={<AppShell sx={{
                   width:'100%'
               }}
                   header={<AppHeader onClick={toggle}/>}
                   navbar={<AppNavbar opened={opened}/>}
               >
                   <Outlet/>
               </AppShell>
               }
        >
            <Route path="/" element={<Navigate to="/brewlog"/>}/>
            <Route index path='/brewlog' element={<BrewlogSummary/>}/>
            <Route path='/brewlog/new/:id' element={<BrewlogNew/>}/>
            <Route path='/brewlog/:mode/:id' element={<BrewlogView/>}/>
            <Route path='/stuffs' element={<StuffsSummary/>}/>
            <Route path='/stuffs/new' element={<StuffsViewNew/>}/>
            <Route path='/stuffs/:mode/:id' element={<StuffsView/>}/>
        </Route>
    </Routes>

}

export default App
