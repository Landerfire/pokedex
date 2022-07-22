import Head from "next/head"
import Link from "next/link"
import React, { FC, useCallback, useEffect, useState } from "react"

interface LayoutProps {
	children: React.ReactNode
}

const placeholders = ["Gotta Find 'Em All", "name or number"]

const Layout: FC<LayoutProps> = ({ children }) => {
	const [selectedTheme, setSelectedTheme] = useState("dark")
	const [isSearchActive, setIsSearchActive] = useState(false)
	const [searchString, setSearchString] = useState("")
	const [searchPlaceholder, setSearchPlaceholder] = useState(placeholders[0])

	useEffect(() => {
		document.body.classList.add(selectedTheme)
	}, [selectedTheme])

	const changeTheme = useCallback(
		(newTheme: "dark" | "light"): void => {
			if (selectedTheme === newTheme) return
			const bodyClassList = document.body.classList

			if (newTheme === "dark") {
				setSelectedTheme("dark")
				bodyClassList.add("dark")
				console.log(selectedTheme)
			}

			if (newTheme === "light") {
				bodyClassList.remove("dark")
				setSelectedTheme("light")
				console.log(selectedTheme)
			}
		},
		[selectedTheme],
	)

	const changePlaceholder = useCallback(() => {
		setSearchPlaceholder(placeholders[1])
	}, [])

	return (
		<>
			<Head>
				<meta name="description" content="Pokemon pokedex app" />
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
				<title>Pokedex</title>
			</Head>

			<header className="bg-gray-300 dark:bg-slate-900 sticky top-0 z-50 h-14">
				<div className="shadow-lg h-full">
					<div className="container max-w-[1440px] mx-auto h-full flex flex-col ">
						<div className="relative flex items-center justify-between mx-4 h-full py-1">
							<nav className="flex min-w-[120px]">
								<Link href="/">Home</Link>
							</nav>
							<Link href="/">
								<h1 className="cursor-pointer text-5xl drop-shadow-md mx-auto text-slate-900 dark:text-red-600">
									PokeDex
								</h1>
							</Link>
							<div className="flex justify-around items-center min-w-[120px]">
								<button
									className="bg-white text-black border-solid border-black border-[1px] p-1 rounded-md"
									onClick={() => changeTheme("light")}
								>
									Light
								</button>
								<button
									className="bg-slate-700 text-white border-solid border-black border-[1px] p-1 rounded-md ml-2"
									onClick={() => changeTheme("dark")}
								>
									Dark
								</button>
							</div>
						</div>
						<div className="mx-auto shadow-lg dark:bg-slate-900 bg-gray-300 pt-1 pb-2 w-80 rounded-b-full text-center">
							<input
								value={searchString}
								onChange={(e) => setSearchString(e.target.value)}
								type="text"
								className="w-60 px-2 bg-gray-100 dark:bg-slate-300 dark:text-black rounded-md border-none outline-none text-slate-900 placeholder:text-slate-900 placeholder:opacity-80 placeholder:text-center"
								placeholder={searchPlaceholder}
								onFocus={changePlaceholder}
								onBlur={() => setSearchPlaceholder(placeholders[0])}
							/>
						</div>
					</div>
				</div>
			</header>

			<main className="container max-w-[1440px] mx-auto relative pt-6">
				<div className="mx-4 my-6">{children}</div>
			</main>

			<footer></footer>
		</>
	)
}

export default Layout
