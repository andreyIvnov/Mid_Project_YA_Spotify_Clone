import { useEffect } from "react";
import { useState } from "react"
import { getUserPlaylists, getUserProfile, getUserTopArtists } from "../SpotifyUtils";
import Search from "./Search";

function LibraryDashboard() {
    const [profile, setProfile] = useState(null);
    const [playLists, setPlayLists] = useState([])
    const [topArtists, setTopArtists] = useState([])


    useEffect(() => {
        const token = localStorage.getItem("spotifyToken");
        if (token) {
            getUserProfile(token).then(setProfile);
            getUserPlaylists(token).then(data => setPlayLists(data.items));
            getUserTopArtists(token).then(data => setTopArtists(data.items));
        }
    }, [])

    if (!profile) return <div>Loading...</div>;

    return (
        <>
            <div>LibraryDashboard</div>
            <div>
                {profile &&
                    <h2>Welcome, {profile.display_name}</h2>
                }
                {playLists && playLists.length > 0 &&
                    <div>
                        <h3>Your Playlists</h3>
                        <ul>
                            {playLists.map(pl => <li key={pl.id}>{pl.name}</li>)}
                        </ul>
                    </div>
                }
                {topArtists && topArtists.length > 0 &&
                    <div>
                        <h3>Your Top Artists</h3>
                        <ul>
                            {topArtists.map(artist => <li key={artist.id}>{artist.name}</li>)}
                        </ul>
                    </div>
                }
            </div>
            <div>
                <Search />
            </div>

        </>
    )
}

export default LibraryDashboard