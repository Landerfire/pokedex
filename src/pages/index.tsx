import type { GetStaticProps, NextPage } from "next"
import { useState } from "react"
import Layout from "../components/Layout"
import PokemonCard from "../components/PokemonCard"
import { IPokemons } from "../interfaces/pokemons"

interface HomePageProps {
	initialPokemons: IPokemons
}

const Home: NextPage<HomePageProps> = ({ initialPokemons }) => {
	const [pokemons, setPokemons] = useState(initialPokemons)
	const [offset, setOffset] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	const fetchPokemons = async (url: string, next: boolean): Promise<void> => {
		setIsLoading(true)
		const response = await fetch(url)
		const nextPokemon = await response.json()

		setOffset(next ? offset + 20 : offset - 20)
		setPokemons(await nextPokemon)
		setIsLoading(false)
	}

	return (
		<Layout>
			<ul className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
				{pokemons.results.map((monster, index) => (
					<PokemonCard key={index} monster={monster} index={index + offset} />
				))}
			</ul>

			<div className="flex justify-center gap-5 m-5 ">
				<button
					className="px-3 py-2 bg-gray-400 dark:bg-darkBg-darker-extreme w-24 uppercase rounded-md"
					onClick={() => fetchPokemons(pokemons.previous!, false)}
					disabled={!pokemons.previous}
				>
					Previous
				</button>
				<button
					className="px-3 py-2 bg-gray-400 dark:bg-darkBg-darker-extreme w-24 uppercase rounded-md"
					onClick={() => fetchPokemons(pokemons.next!, true)}
					disabled={!pokemons.next}
				>
					Next
				</button>
			</div>

			{isLoading && <div>Loading...</div>}
		</Layout>
	)
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon")
	const initialPokemons: Promise<IPokemons> = await response.json()

	return {
		props: {
			initialPokemons,
		},
	}
}
