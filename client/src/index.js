import React from 'react';
import ReactDOM from 'react-dom';

import { UserProvider } from "./contexts/User"
import App from './App.jsx';

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
