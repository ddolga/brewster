import './App.css'
import {BrewlogSummary} from "./brewlog/BrewlogSummary.tsx";
import {AppShell} from "@mantine/core";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {BrewlogNew, BrewlogView} from "./brewlog/BrewlogView.tsx";

function App() {

    return <Routes>
        <Route path='/'
               element={<AppShell>
                   <Outlet/>
               </AppShell>}
        >
            <Route path="/" element={<Navigate to="/brewlog"/>}/>
            <Route index path='/brewlog' element={<BrewlogSummary/>}/>
            <Route path='/brewlog/new/:id' element={<BrewlogNew />}/>
            <Route path='/brewlog/:mode/:id' element={<BrewlogView />}/>
        </Route>
    </Routes>

}

export default App
