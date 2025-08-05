import { useNavigate } from "react-router-dom";
import './Styles/PlaylistCard.css';

function PlaylistCard({ playlist }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/playlist/${playlist.id}`);
    };

    return (
        <div className="playlistCard" onClick={handleClick}>
            <img src={playlist.images[0]?.url || 'default_playlist_image_url'} alt={playlist.name} />
            <div>{playlist.name}</div>
        </div>
    );
}

export default PlaylistCard;
