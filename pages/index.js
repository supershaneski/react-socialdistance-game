import React from 'react';
import App from '../components/App';

export default function Index() {
    return (
        <>
        <div className="main-container">
            <App />
        </div>
        <style jsx>
        {`
        .main-container {
            position: absolute;
            left: 10px;
            top: 10px;
            width: calc(100% - 20px);
            height: calc(100% - 20px);
            overflow: hidden;
        }
        `}
        </style>
        </>
    )
}