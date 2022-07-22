import { GetServerSideProps, NextPage } from "next"
import Image from "next/image"
import Layout from "../../components/Layout"
import PokemonInfo from "../../components/PokemonInfo"
import { IPokemonDetails } from "../../interfaces/pokemonDetails"
import { IPokemonTypeDetails } from "../../interfaces/pokemonTypes"

interface PokemonPageProps {
	pokemonDetails: IPokemonDetails
	firstTypeDetails: IPokemonTypeDetails
	secondTypeDetails?: IPokemonTypeDetails
}

const Pokemon: NextPage<PokemonPageProps> = ({ pokemonDetails, firstTypeDetails, secondTypeDetails }) => {
	const pokemonNumber = ("000" + pokemonDetails.id).slice(-3)

	return (
		<Layout>
			<div className="mx-20 flex items-center lg:justify-around">
				<section className="w-[600px] h-[600px] relative px-4 pb-4 flex flex-col items-center justify-center bg-neutral-50 dark:bg-darkBg-lighter rounded-xl drop-shadow-md shadow-md">
					<span className="absolute text-8xl opacity-30 font-semibold bottom-0 right-2">{`${pokemonNumber}`}</span>
					<div className="text-5xl uppercase mt-2 dark:text-amber-400">{pokemonDetails.name}</div>
					<Image
						src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonNumber}.png`}
						width={475}
						height={475}
						alt={pokemonDetails.name}
						priority
					/>
				</section>
				<PokemonInfo
					pokemonDetails={pokemonDetails}
					firstTypeDetails={firstTypeDetails}
					secondTypeDetails={secondTypeDetails}
				/>
			</div>
		</Layout>
	)
}

export default Pokemon

export const getServerSideProps: GetServerSideProps = async (context) => {
	const baseUrl = "https://pokeapi.co/api/v2/"

	const response = await fetch(baseUrl + `pokemon/${context.query.number}`)
	const pokemonDetails: Promise<IPokemonDetails> = await response.json()

	const pokemonTypes = (await pokemonDetails).types
	const numberOfTypes = (await pokemonDetails).types.length

	const firstTypeResponse = await fetch(baseUrl + `type/${pokemonTypes[0].type.name}`)
	const firstTypeDetails: Promise<IPokemonTypeDetails> = await firstTypeResponse.json()

	const secondTypeResponse =
		numberOfTypes === 2 ? await fetch(baseUrl + `type/${pokemonTypes[1]?.type.name}`) : undefined
	const secondTypeDetails: Promise<IPokemonTypeDetails | null> = secondTypeResponse
		? await secondTypeResponse?.json()
		: null

	return {
		props: {
			pokemonDetails,
			firstTypeDetails,
			secondTypeDetails,
		},
	}
}
