import { GetServerSideProps, NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import PokemonInfo from "../../components/PokemonInfo"
import PokemonStats from "../../components/PokemonStats"
import { IPokemonDetails } from "../../interfaces/pokemonDetails"
import { IPokemonTypeDetails } from "../../interfaces/pokemonTypes"

interface PokemonPageProps {
	pokemonDetails: IPokemonDetails
	firstTypeDetails: IPokemonTypeDetails
	secondTypeDetails?: IPokemonTypeDetails
}

const Pokemon: NextPage<PokemonPageProps> = ({ pokemonDetails, firstTypeDetails, secondTypeDetails }) => {
	const router = useRouter()
	const pokemonNumber = ("000" + pokemonDetails.id).slice(-3)

	return (
		<Layout>
			<div className="flex flex-col gap-4 sm:items-center sm:mx-20">
				<div className="flex items-center justify-around flex-col gap-4 lg:flex-row">
					<section className="xl:w-[600px] lg:w-[500px] sm:h-[600px] sm:w-[600px] w-full relative px-4 pb-4 flex flex-col items-center justify-center bg-neutral-50 dark:bg-darkBg-lighter rounded-xl drop-shadow-md shadow-md">
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
				<PokemonStats pokemonStats={pokemonDetails.stats} />
				<div className="flex gap-5 justify-center">
					<Link href={`/pokemon/${pokemonDetails.id - 1}`}>
						<a className="px-3 py-2 bg-gray-400 dark:bg-darkBg-darker-extreme w-24 uppercase rounded-md text-center">
							prev
						</a>
					</Link>

					<Link href={`/pokemon/${pokemonDetails.id + 1}`}>
						<a className="px-3 py-2 bg-gray-400 dark:bg-darkBg-darker-extreme w-24 uppercase rounded-md text-center">
							next
						</a>
					</Link>
				</div>
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
