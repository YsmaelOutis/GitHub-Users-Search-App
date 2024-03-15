import './App.css'
import { Octokit } from 'octokit'
import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect } from 'react'
import interestingUsers from './utils/interestingUsers.js'

import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import UserCard from './components/UserCard.jsx'

// No auth needed for this app
const octokit = new Octokit({})

async function fetchUserData(username) {
	try {
		const response = await octokit.request('GET /users/{username}', {
			username: username
		})
		const userData = response.data
		return userData
	} catch (error) {
		if (error.status === 404) {
			console.log("User not found")
			return
		}
	}
}

function App() {
	const [userData, setUserData] = useState("torvalds")
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [theme, setTheme] = useState("dark")
	
	//Animation for the UserCard component
	const [animation, animationCall] = useSpring(() => ({
		from: { opacity: 0, x: 0, y:300 },
		to: { opacity: 1, x: 0, y: 0},
		config: { duration: 300 } // 300ms
	}))

	const AnimatedUserCard = animated(UserCard)

	async function handleSearch(username) {
		setLoading(true)
		const newData = await fetchUserData(username);
	
		// User not found
		if (!newData) {
			setError(true) // User not found
			console.log(`User ${username} not found`)
			
			// Return false to indicate that no user was found
			return false
		}

		// User found
		setError(false)
		setUserData(newData);
		setLoading(false)
		animationCall.start({from: { opacity: 0, x: 0, y:200 }, to: { opacity: 1, x: 0, y: 0}}) // Start the animation

		// Return true to indicate that a user was found 
		return true
	}

	async function getInterestingUser() {
		// Make sure a user is found, else try again. In case a user of the list deleted their account
		const user = interestingUsers[Math.floor(Math.random() * interestingUsers.length)]
		const userFound = await handleSearch(user)
		if (!userFound) {
			// Delete the user from the list of interesting users
			const index = interestingUsers.indexOf(user)
			interestingUsers.splice(index, 1)
			// Try again
			getInterestingUser()
		}
	}

	// On first render
	useEffect(() => {
		// Fetch the data for one of the interesting users
		getInterestingUser()

		// Set the theme based on the user's preference
		setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")
	}, [])

	return (
		<main>
			<Header theme={theme} setTheme={setTheme} />
			<SearchBar sendToParent={handleSearch} getInterestingUser={getInterestingUser} error={error} />
			{!loading && userData && <AnimatedUserCard userData={userData} animation={animation}/>}
		</main>
	)
}

export default App