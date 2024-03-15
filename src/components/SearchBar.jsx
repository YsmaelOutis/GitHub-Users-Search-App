import { useState } from 'react'
import iconSearch from '../assets/icon-search.svg'

const SearchBar = ({ sendToParent, getInterestingUser, error }) => {
    const [username, setUsername] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        if (username !== "") {
            sendToParent(username)
            setUsername('') // Clear the input
        } else {
            getInterestingUser()
        }
    }

    return (
        <div className='search-bar'>
            <form onSubmit={handleSubmit}>
                <img src={iconSearch} alt="Decorative search icon" onClick={getInterestingUser}/>
                <input 
                    type="text" 
                    placeholder="Search GitHub username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {error && <p className="error">No results</p>}
                <button>Search</button>
            </form>
        </div>
    )
}

export default SearchBar