// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App.jsx';

// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// );




//import { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
//import { BrowserRouter as Router} from 'react-router-dom';
import App from './App.jsx';
//import './index.css';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
       
            <App />
        
    </React.StrictMode>
);
