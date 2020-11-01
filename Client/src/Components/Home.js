import React, { useContext } from 'react'
import BackgroundBox from './BackgroundBox'
import LandingPage from './LandingPage'
import { UserContext } from '../Store/Store'
function Home() {
    const [initialState, setState] = useContext(UserContext);
    return (
        <div>
            {console.log('Home page for checking state',initialState)}
            <BackgroundBox/>
            <LandingPage/>
        </div>
    )
}

export default Home
