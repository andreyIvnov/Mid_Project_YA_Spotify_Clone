import { useEffect, useState } from "react"
import { getUserPlaylists } from "../SpotifyUtils"

import "./Styles/HomePage.css"

import hardcodedProfile from "../Helpers/MyProfile.json"
import hardcodedPlaylists from "../Helpers/MyPlaylists.json"

function HomePage() {
    const [token, setToken] = useState('')
    // const [profile, setProfile] = useState(hardcodedProfile)
    // const [profilePlaylists, setProfilePlaylists] = useState(hardcodedPlaylists)
    const [profile, setProfile] = useState(null)
    const [profilePlaylists, setProfilePlaylists] = useState([])

    const setUserPlaylists = async () => {
        const response = await getUserPlaylists(token)
        if (response && response.items) {
            console.log(response.items)
            // localStorage.setItem("users{laylists", JSON.stringify(response.items));
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

    const playTheList = () => {

    }


    return (
        <>
            <div className="home-page-main-container">
                <div>HomePage</div>
                {profile &&
                    <>
                        <h2>Welcome, {profile.display_name}</h2>
                        <h3>Your Playlists</h3>
                        <div className="playlists-arie">
                            {profilePlaylists && profilePlaylists.map(pl => (
                                <div className="playlist-container" key={pl.id}>
                                    <div className="image-wrapper">
                                        <a href={`/playlist/${pl.id}`}>
                                            <img className="playlist-image" src={pl.images[0]?.url} alt={pl.name} />
                                        </a>
                                        <button
                                            className="play-button"
                                            onClick={playTheList}
                                        >
                                            <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-91000-icon e-91000-baseline" viewBox="0 0 24 24">
                                                <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p>{pl.name}</p>
                                </div>
                            ))}
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default HomePage