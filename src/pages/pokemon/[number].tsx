import { GetServerSideProps, NextPage } from "next"
import Layout from "../../components/Layout"
import { IPokemonDetails } from "../../interfaces/pokemonDetails"
import Image from "next/image"

interface PokemonPageProps {
	pokemonDetails: IPokemonDetails
}

const Pokemon: NextPage<PokemonPageProps> = ({ pokemonDetails }) => {
	const pokemonNumber = ("000" + pokemonDetails.id).slice(-3)

	return (
		<Layout>
			<div className="flex flex-col items-center ">
				<div className="relative px-4 pb-4 flex flex-col items-center justify-center bg-neutral-50 dark:bg-darkBg-lighter border-darkBg-darker dark:border-customWhite border-2 rounded-xl drop-shadow-md shadow-md w-[600px]">
					<span className="absolute text-8xl opacity-30 font-semibold bottom-0 right-2">
						{`${pokemonNumber}`}
					</span>
					<div className="text-5xl uppercase mt-2 dark:text-amber-400">{pokemonDetails.name}</div>
					<Image
						src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonNumber}.png`}
						width={475}
						height={475}
						alt={pokemonDetails.name}
					/>
				</div>
			</div>
		</Layout>
	)
}

export default Pokemon

export const getServerSideProps: GetServerSideProps = async (context) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${context.query.number}`)
	const pokemonDetails: Promise<IPokemonDetails> = await response.json()

	return {
		props: {
			pokemonDetails,
		},
	}
}
