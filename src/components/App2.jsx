import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import Files from './Files';
import ErrorPage from './ErrorPage';
import EditFile from './EditFile';
import TimedComp from './TimedComp';


const KEY = 'take999Note589APP321API';

function App2() {

    const [authorized, setAuthorized] = useState({
        val: false,
        username: ""
    });

    const [messageForNotifi, setMessageForNotifi] = useState({
        message: null,
        bgColor: null,
    });

    const location = useLocation();

    return (<>

        <TimedComp obj={messageForNotifi} setter={setMessageForNotifi} key={location.pathname} />
        
        <AnimatePresence>
        <Routes key={location.pathname} location={location}>

            <Route path='/' element={<LandingPage />} />

            <Route path='/loginUser' element={
                <LoginPage
                    authorized={authorized}
                    setAuthorized={setAuthorized}
                    APIkey={KEY}
                    setMessage={setMessageForNotifi}
                />
            } />

            <Route path='/files/:user' element={
                <Files
                    authorized={authorized}
                    APIkey={KEY}
                    setMessage={setMessageForNotifi}
                />
            } />

            <Route path='/EditFile/:FileId' element={
                <EditFile
                    authorized={authorized}
                    APIkey={KEY}
                    setMessage={setMessageForNotifi}
                />
            } />


            <Route path='*' element={<ErrorPage />} />

        </Routes>
        </AnimatePresence>
        
    </>)
}

export default App2
