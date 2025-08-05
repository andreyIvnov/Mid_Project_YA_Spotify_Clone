import { useEffect, useState } from 'react'
import { exchangeCodeForToken, getUserProfile, loginToSpotify, getUserPlaylists } from '../SpotifyUtils'
import LibraryDashboard from './LibraryDashboard'
import Header from './Header';
import PlaylistCard from './PlaylistCard';
import './Styles/MainLayout.css';



function MainLayout() {
    const [token, setToken] = useState('')
    const [profile, setProfile] = useState(null)
    const [playlists, setPlaylists] = useState([]);

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
            getUserPlaylists(token).then(data => setPlaylists(data.items));
        }
    }, [token])

    return (
        <div>
            {!profile && !token &&
                <>
                    <button onClick={loginToSpotify}>Login with Spotify</button>
                </>
            }
            {profile && playlists &&
                <div className="mainLayout">
                    <Header profile={profile} />
                    <div className="library">
                        {playlists.map(pl => (
                            <PlaylistCard key={pl.id} playlist={pl} />
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default MainLayout