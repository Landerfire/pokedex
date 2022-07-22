import { FC } from "react"

interface PokemonTypeProps {
	type: string
}

const PokemonType: FC<PokemonTypeProps> = ({ type }) => {
	return <li>{type}</li>
}

export default PokemonType
