import Image from "next/image"
import { FC } from "react"
import { PokemonTypes, typesPaths } from "../interfaces/pokemons"

interface PokemonTypeProps {
	type: PokemonTypes
}

const PokemonType: FC<PokemonTypeProps> = ({ type }) => {
	return (
		<li>
			{/* image maxWidth: 200px maxHeight: 45px */}
			<Image src={typesPaths[type]} width={160} height={40} alt={type} />
		</li>
	)
}

export default PokemonType
