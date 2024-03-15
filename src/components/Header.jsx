import IconSun from './icons/IconSun.jsx'
import IconMoon from './icons/IconMoon.jsx'
import { useEffect } from 'react'

const Header = ({ theme, setTheme }) => {
	function changeTheme() {
		if (theme === "dark") {
			setTheme("light")
		} else {
			setTheme("dark")
		}
	}

	useEffect(() => {
		document.body.dataset.theme = theme;
	}, [theme])

	return (
		<header>
			<h1>devfinder</h1>
			<button onClick={changeTheme}>
				{theme === "dark"
					? (
						<>
							LIGHT
							<IconSun />
						</>
					)
					: (
						<>
							DARK
							<IconMoon />
						</>
					)
				}
			</button>
		</header>
	);
}

export default Header
