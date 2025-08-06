import { useEffect, useState } from "react"
import { getUserPlaylists } from "../SpotifyUtils"

import "./Styles/HomePage.css"

function HomePage() {
    const [token, setToken] = useState('')
    const [profile, setProfile] = useState(null)
    const [profilePlaylists, setProfilePlaylists] = useState([])

    const setUserPlaylists = async () => {
        const response = await getUserPlaylists(token)
        if (response && response.items) {
            console.log(response.items)
            setProfilePlaylists(response.items)
        }
    }


    useEffect(() => {
        const profileDataFromStorage = JSON.parse(localStorage.getItem("profileData"));
        const spotifyToken = localStorage.getItem("spotifyToken");

        if (profileDataFromStorage) {
            setProfile(profileDataFromStorage)
        }
        if (spotifyToken) {
            setToken(spotifyToken);
        }

    }, [])

    useEffect(() => {
        if (token) {
            setUserPlaylists();
        }
    }, [token])



    return (
        <>
            <div className="home-page-main-container">
                <div>HomePage</div>
                {profile &&
                    <>
                        <h2>Welcome, {profile.display_name}</h2>
                        <div className="playlists-arie">
                            <h3>Your Playlists</h3>
                            {profilePlaylists && profilePlaylists.map(pl => {
                                return (
                                    <div key={pl.id}>
                                        <a href={`/playlist/${pl.id}`}>
                                            <img className="playlist-image" src={pl.images[0]?.url} alt="No" />
                                            <p>{pl.name}</p>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                }
            </div>

        </>
    )
}

export default HomePage