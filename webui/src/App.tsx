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
            <Route path='/brewlog/start' element={<BrewlogViewWData viewMode='new'/>}/>
            <Route path='/brewlog/new/:id' element={<BrewlogView viewMode='new'/>}/>
            <Route path='/brewlog/view/:id' element={<BrewlogView viewMode='view'/>}/>
            <Route path='/brewlog/edit/:id' element={<BrewlogView viewMode='edit'/>}/>
        </Route>
    </Routes>

}

export default App
