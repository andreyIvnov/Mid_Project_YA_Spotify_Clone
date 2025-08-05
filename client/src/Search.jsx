import { useState } from "react"
import { searchSpotify } from "../SpotifyUtils";

function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [searchType, setSearchType] = useState("global");

    const handleSearch = async () => {
        const token = localStorage.getItem("spotifyToken");
        if (!token || !query) return;

        const searchResults = await searchSpotify(token, query, 'artist');

        setResults(searchResults.artists.items);
    }

    return (
        <div>
            <h3>Search Spotify</h3>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for an artist..."
            />
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="global">Global</option>
                <option value="library">My Library</option>
            </select>
            <button onClick={handleSearch}>Search</button>

            <div>
                {results.map(artist => (
                    <div key={artist.id} style={{ marginTop: '10px' }}>
                        <strong>{artist.name}</strong><br />
                        {artist.images[0] && <img src={artist.images[0].url} alt={artist.name} width="100" />}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search