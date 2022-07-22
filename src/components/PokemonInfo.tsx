import { FC, useEffect, useState } from "react"
import { IPokemonDetails, Type2 } from "../interfaces/pokemonDetails"
import { IPokemonTypeDetails } from "../interfaces/pokemonTypes"
import PokemonType from "./PokemonType"

interface PokemonInfoProps {
	pokemonDetails: IPokemonDetails
	firstTypeDetails: IPokemonTypeDetails
	secondTypeDetails?: IPokemonTypeDetails
}

const PokemonInfo: FC<PokemonInfoProps> = ({ pokemonDetails, firstTypeDetails, secondTypeDetails }) => {
	const [weaknesses, setWeaknesses] = useState(Array<string>)

	const renderTypes = () =>
		pokemonDetails.types.map((type) => <PokemonType key={type.slot} type={type.type.name} />)

	const renderWeaknesses = () => (
        weaknesses.map((weakness) => <PokemonType key={weakness}  type={weakness}/>)
    )

	useEffect(() => {
		const arr: string[] = []
		firstTypeDetails.damage_relations.double_damage_from.map((item) => arr.push(item.name))

		if (secondTypeDetails && secondTypeDetails !== null) {
			secondTypeDetails.damage_relations.double_damage_from.map((item) => {
				if (!arr.includes(item.name)) {
					arr.push(item.name)
				}
			})
		}

		setWeaknesses(arr)
	}, [secondTypeDetails, firstTypeDetails])

	return (
		<section className="w-[600px] h-[600px] p-4 flex flex-col bg-neutral-50 dark:bg-darkBg rounded-xl shadow-md">
			<div className="flex flex-col items-start justify-start">
				<h1>Type:</h1>
				<ul className="flex">{renderTypes()}</ul>
			</div>
			<div className="flex flex-col items-start justify-start">
				<h1>Weaknesses:</h1>
				<ul className="flex">{renderWeaknesses()}</ul>
			</div>
		</section>
	)
}

export default PokemonInfo
