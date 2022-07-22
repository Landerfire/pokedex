import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import { IPokemonNameAndLink } from "../interfaces/pokemonsList"

interface PokemonCardProps {
	monster: IPokemonNameAndLink
	index: number
}

const PokemonCard: FC<PokemonCardProps> = ({ monster, index }) => {
	const pokemonNumber = ("000" + (index + 1)).slice(-3)
	const pokemonName = monster.name[0].toUpperCase() + monster.name.slice(1)

	// function getPokemonNumber(index: number): string {
	// 	function addZeros(array: string[]): string[] {
	// 		array.unshift("0")
	// 		if (array.length < 3) {
	// 			addZeros(array)
	// 		}
	// 		return array
	// 	}

	// 	const stringifyedIndex = index.toString()
	// 	if (stringifyedIndex.length < 3) {
	// 		return addZeros(stringifyedIndex.split("")).join("")
	// 	}
	// 	return stringifyedIndex
	// }

	return (
		<Link href={`/pokemon/${index + 1}`}>
			<li className="bg-neutral-50 dark:bg-darkBg cursor-pointer list-none flex flex-col items-center border-y-2 border-x-2 border-darkBg-darker dark:border-darkBg-lighter-extreme rounded-md relative">
				<span className="absolute text-5xl opacity-50 font-semibold top-0 right-2">
					{`${pokemonNumber}`}
				</span>
				<Image
					src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonNumber}.png`}
					alt={`${pokemonNumber}.${pokemonName}`}
					width={200}
					height={200}
				/>
				<p className="bg-inherit dark:bg-inherit w-full text-center dark:text-customWhite pb-1">
					<span className="font-semibold text-xl dark:text-amber-400 uppercase">{pokemonName}</span>
				</p>
			</li>
		</Link>
	)
}

export default PokemonCard
