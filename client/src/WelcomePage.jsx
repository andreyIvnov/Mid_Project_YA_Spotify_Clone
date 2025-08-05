import { useEffect, useState } from 'react'
import { exchangeCodeForToken, loginToSpotify } from '../SpotifyUtils';

import './Styles/WelcomePage.css'


function WelcomePage() {
    const [token, setToken] = useState('')
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code && !token) {
            exchangeCodeForToken(code)
                .then(data => {
                    setToken(data.access_token);
                    localStorage.setItem("spotifyToken", data.access_token);
                    window.history.pushState({}, null, '/');
                });
        }
    }, [])

    useEffect(() => {
        if (token && !profile) {
            getUserProfile(token).then(data => { setProfile(data) });
            // getUserPlaylists(token).then(data => setPlaylists(data.items));
        }
    }, [token])


    return (
        <>
            <div className='mainContainer'>
                <h3>Welcome to Spotify Clone</h3>
                <button onClick={loginToSpotify}>Sign In</button>
            </div>
        </>
    )
}

export default WelcomePage