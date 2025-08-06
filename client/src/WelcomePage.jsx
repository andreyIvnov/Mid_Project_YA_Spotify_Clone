import { useEffect, useState } from 'react'
import { exchangeCodeForToken, loginToSpotify, getUserProfile } from '../SpotifyUtils';
import { useNavigate } from 'react-router-dom';

import './Styles/WelcomePage.css'


function WelcomePage() {
    // const [token, setToken] = useState('BQCKVaNxPkB1p-9RZmIqEMUMfKcObgF0Euj76GsfZSQYOIAAZwDnFtLQy0IaGBNaeSiuE9m2fnPgppmw0laIoMA1DDnLQor7Y-VeHZZUNZiaYZlsIqKzEpBWVE1278MIGPEzc-EYc-Dh9k4z28EtgMuFsQ8KKHiSq6rF7mY3ghCtzloCt7PjrFUDnXMGT39JizewObMCCmRzjO2hLvm2JwKiZnvt5j7Pmhhfazp6HPxJz-rfI9NY8TJWBDAoRM-Q69v5sQKjfLJAAw')
    const [token, setToken] = useState('');
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate();

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
            getUserProfile(token).then(data => setProfile(data));
            // getUserPlaylists(token).then(data => setPlaylists(data.items));
        }
    }, [token])

    useEffect(() => {
        if (profile) {
            localStorage.setItem("profileData", JSON.stringify(profile))
            navigate("/home")
        }
    }, [profile])
    


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