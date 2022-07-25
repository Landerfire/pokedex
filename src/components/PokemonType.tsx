import Image from "next/image"
import { FC } from "react"
import { PokemonTypes, typesPaths } from "../interfaces/pokemons"

interface PokemonTypeProps {
	type: PokemonTypes
}

const PokemonType: FC<PokemonTypeProps> = ({ type }) => {
	return (
		<div className="xl:w-40 lg:w-36 md:w-32 sm:w-28 w-24">
			{/* image maxWidth: 200px maxHeight: 45px */}
			<Image src={typesPaths[type]} width={160} height={40} alt={type} />
		</div>
	)
}

export default PokemonType
