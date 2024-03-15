import { animated } from '@react-spring/web'
import Links from './Links.jsx'

const UserCard = ({ userData, animation }) => {
    const { avatar_url, bio, blog, company, html_url, created_at, followers, following, location, login, name, public_repos, twitter_username } = userData
    const links = [blog, twitter_username, company, location]

    // Format the date
    const joinedDate = new Date(created_at).toLocaleDateString(undefined, { year: 'numeric', day: 'numeric', month: 'short' }).replace(/,/g, '');

    return (
        <animated.div className="user-card" style={animation}>
            <div className="avatar-container-desktop">
                <img src={avatar_url} alt="Avatar" />
            </div>

            <div>

                <div className="avatar-mobile-and-username-with-date">
                    <div className="avatar-container-mobile">
                        <img src={avatar_url} alt="Avatar" />
                    </div>

                    <div className="user-and-date">
                        <div className="user">
                            <h2>{name ? name : login}</h2>
                            <a href={html_url} target="_blank" rel="noopener noreferrer">@{login}</a>
                        </div>
                        <div className="date">
                            <p>Joined {joinedDate}</p>
                        </div>
                    </div>
                </div>

                <div className="user-info">

                    <div className="bio">
                        {bio
                            ? (
                                <p>{bio}</p>
                            )
                            : (
                                <p className='no-available-info'>This profile has no bio</p>
                            )
                        }
                    </div>

                    <div className="stats">
                        <div className="repos">
                            <h4>Repos</h4>
                            <p>{public_repos}</p>
                        </div>

                        <div className="followers">
                            <h4>Followers</h4>
                            <p>{followers}</p>
                        </div>

                        <div className="following">
                            <h4>Following</h4>
                            <p>{following}</p>
                        </div>
                    </div>

                    <Links links={links} />
                </div>

            </div>
        </animated.div>
    );
};

export default UserCard;
