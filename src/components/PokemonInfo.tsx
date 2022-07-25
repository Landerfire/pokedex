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

	

	useEffect(() => {
		const temporaryWeaknesses = getObjNames(firstTypeDoubleDamage, secondTypeDoubleDamage)
		const temporarystrengths = getObjNames(firstTypeHalfDamage, secondTypeHalfDamage)

		setWeaknesses(temporaryWeaknesses.filter(weakness => !temporarystrengths.includes(weakness)))
	}, [firstTypeDoubleDamage, secondTypeDoubleDamage, firstTypeHalfDamage, secondTypeHalfDamage])

	return (
		<section className="xl:w-[600px] lg:w-[500px] sm:w-[600px] sm:h-[600px] min-w-[380px] w-full py-4 px-6 flex flex-col bg-neutral-50 dark:bg-darkBg rounded-xl shadow-md">
			<div className="flex flex-col items-start justify-start mb-4">
				<h1 className="mb-3 text-3xl">Type</h1>
				<div className="flex gap-4">{renderTypes()}</div>
			</div>
			<div className="flex flex-col items-start justify-start mb-4">
				<h1 className="mb-3 text-3xl">Weaknesses</h1>
				<div className="flex gap-4 flex-wrap">{renderWeaknesses()}</div>
			</div>

		</section>
	)
}

export default PokemonInfo
