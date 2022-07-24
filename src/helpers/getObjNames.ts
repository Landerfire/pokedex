import { PokemonTypes } from "../interfaces/pokemons"
import { DoubleDamageFrom, HalfDamageFrom } from "../interfaces/pokemonTypes"

export function getObjNames(
	firstTypeData: DoubleDamageFrom[] | HalfDamageFrom[],
	secondTypeData?: DoubleDamageFrom[] | HalfDamageFrom[],
): PokemonTypes[] {
	const arr: PokemonTypes[] = []
	firstTypeData.map((item) => arr.push(item.name))

	if (secondTypeData && secondTypeData !== null) {
		secondTypeData?.map((item) => {
			if (!arr.includes(item.name)) {
				arr.push(item.name)
			}
		})
	}

	return arr
}
