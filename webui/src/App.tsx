import './App.css'
import {BrewlogSummary} from "./brewlog/BrewlogSummary.tsx";
import {AppShell} from "@mantine/core";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {BrewlogView, BrewlogViewWData} from "./brewlog/BrewlogView.tsx";

function App() {

    return <Routes>
        <Route path='/'
               element={<AppShell>
                   <Outlet/>
               </AppShell>}
        >
            <Route path="/" element={<Navigate to="/brewlog"/>}/>
            <Route index path='/brewlog' element={<BrewlogSummary/>}/>
            <Route path='/brewlog/new/:id' element={<BrewlogView viewMode={false} isNew={true}/>}/>
            <Route path='/brewlog/start' element={<BrewlogViewWData viewMode={false} isNew={true}/>}/>
            <Route path='/brewlog/view/:id' element={<BrewlogView viewMode={true} isNew={false}/>}/>
        </Route>
    </Routes>

}

export default App
