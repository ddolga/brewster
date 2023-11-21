import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {MantineProvider} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./services/store.ts";

const brewsterTheme: any = {
    colorScheme: 'dark',
    colors: {
        dark: [
            '#ecf2fe',
            '#d3d8e1',
            '#b7bec7',
            '#9ca5b0',
            '#818b98',
            '#67717e',
            '#4f5863',
            '#383f48',
            '#1f262d',
            '#000f15',
        ],
    },
    primaryColor: 'dark'

}

const Root = <React.StrictMode>
    <Provider store={store}>
        <MantineProvider theme={brewsterTheme} withGlobalStyles withNormalizeCSS>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </MantineProvider>
    </Provider>
</React.StrictMode>

const insertHere = document.getElementById('root')!
const container = ReactDOM.createRoot(insertHere);

container.render(Root)
