import type { GetStaticProps, NextPage } from "next"
import { useState } from "react"
import Layout from "../components/Layout"
import PokemonCard from "../components/PokemonCard"
import { IPokemons } from "../interfaces/pokemonsList"

interface HomePageProps {
	initialPokemons: IPokemons
}

const Home: NextPage<HomePageProps> = ({ initialPokemons }) => {
	const [pokemons, setPokemons] = useState(initialPokemons)
	const [isLoading, setIsLoading] = useState(false)

	const fetchMorePokemons = async (): Promise<void> => {
		setIsLoading(true)
		const url = encodeURI(initialPokemons.next!)
		const response = await fetch(url)
		const nextPage: IPokemons = await response.json()
		setPokemons(
			(prevState) =>
				(prevState = {
					...prevState,
					next: nextPage.next,
					previous: nextPage.previous,
					results: [...prevState.results, ...nextPage.results],
				}),
		)
		setIsLoading(false)
	}

	return (
		<Layout>
			<ul className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
				{pokemons.results.map((monster, index) => (
					<PokemonCard key={index} monster={monster} index={index} />
				))}
			</ul>

			<div>
				<button onClick={fetchMorePokemons} disabled={!initialPokemons.next}>
					More
				</button>
			</div>

			{isLoading && <div>Loading...</div>}
		</Layout>
	)
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30")
	const initialPokemons: Promise<IPokemons> = await response.json()

	return {
		props: {
			initialPokemons,
		},
	}
}
