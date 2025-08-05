import Search from "./Search"
import "./Styles/Header.css"

function Header({ profile }) {

    return (
        <>
            <div className="header">
                <div className="header__logo">Spotify</div>
            </div>
            <div className="header__search">
                <Search />
            </div>
            <div className="header__profile">
                {profile.images.length > 0 ? (
                    <img src={profile.images[0].url} alt="Profile" className="profile__image" />
                ) : (
                    <div className="profile__placeholder">U</div>
                )}
            </div>
        </>
    )
}

export default Header