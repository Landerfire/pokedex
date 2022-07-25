import Link from "next/link"
import React, { FC } from "react"
import { IPokemons } from "../interfaces/pokemons"
import PokemonCard from "./PokemonCard"

interface PokemonListProps {
	pokemons: IPokemons
	offset: number
}

const PokemonList: FC<PokemonListProps> = ({ pokemons, offset }) => {
	return (
		<ul className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
			{pokemons.results.map((monster, index) => (
				<PokemonCard key={index} monster={monster} index={index + offset} />
			))}
		</ul>
	)
}

export default PokemonList
