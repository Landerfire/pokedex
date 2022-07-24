import { FC, useEffect, useState } from "react"
import { getObjNames } from "../helpers/getObjNames"
import { IPokemonDetails } from "../interfaces/pokemonDetails"
import { PokemonTypes } from "../interfaces/pokemons"
import { IPokemonTypeDetails } from "../interfaces/pokemonTypes"
import PokemonType from "./PokemonType"

interface PokemonInfoProps {
	pokemonDetails: IPokemonDetails
	firstTypeDetails: IPokemonTypeDetails
	secondTypeDetails?: IPokemonTypeDetails
}

const PokemonInfo: FC<PokemonInfoProps> = ({ pokemonDetails, firstTypeDetails, secondTypeDetails }) => {
	const [weaknesses, setWeaknesses] = useState(Array<PokemonTypes>)
	const [firstTypeDoubleDamage, secondTypeDoubleDamage] = [firstTypeDetails.damage_relations.double_damage_from, secondTypeDetails?.damage_relations.double_damage_from]
	const [firstTypeHalfDamage, secondTypeHalfDamage] = [firstTypeDetails.damage_relations.half_damage_from, secondTypeDetails?.damage_relations.half_damage_from]

	const renderTypes = () =>
		pokemonDetails.types.map((type) => <PokemonType key={type.slot} type={type.type.name} />)

	const renderWeaknesses = () => (
		weaknesses.map((weakness) => <PokemonType key={weakness} type={weakness} />)
	)

	const renderStats = () => {
		return pokemonDetails.stats.map((stat, index) => (
			<div key={index}>
				<div className="dark:bg-darkBg-lighter bg-gray-300 mb-1 rounded-md p-1 relative">
					<span className="uppercase absolute top-[18%] left-[2%] font-bold dark:text-customWhite">{stat.stat.name} = {stat.base_stat}</span>
					<div className="dark:bg-darkBg-darker-extreme bg-gray-500 bg-opacity-60 pl-2 h-7 flex items-center" style={{width: `${stat.base_stat - 40}%`}}>
						<span></span>
					</div>
				</div>
			</div>
		))
	}

	useEffect(() => {
		const temporaryWeaknesses = getObjNames(firstTypeDoubleDamage, secondTypeDoubleDamage)
		const temporarystrengths = getObjNames(firstTypeHalfDamage, secondTypeHalfDamage)

		setWeaknesses(temporaryWeaknesses.filter(weakness => !temporarystrengths.includes(weakness)))
	}, [firstTypeDoubleDamage, secondTypeDoubleDamage, firstTypeHalfDamage, secondTypeHalfDamage])

	return (
		<section className="w-[600px] h-[600px] py-4 px-6 flex flex-col bg-neutral-50 dark:bg-darkBg rounded-xl shadow-md">
			<div className="flex flex-col items-start justify-start mb-4">
				<h1 className="mb-3 text-3xl">Type</h1>
				<ul className="flex gap-4">{renderTypes()}</ul>
			</div>
			<div className="flex flex-col items-start justify-start mb-4">
				<h1 className="mb-3 text-3xl">Weaknesses</h1>
				<ul className="flex gap-4 flex-wrap">{renderWeaknesses()}</ul>
			</div>
			<div>
			<h1 className="mb-3 text-3xl">Base stats</h1>
				{renderStats()}
			</div>
		</section>
	)
}

export default PokemonInfo
