export interface IPokemons {
	count: number
	next?: string | null
	previous?: string | null
	results: IPokemonNameAndLink[]
}

export interface IPokemonNameAndLink {
	name: string
	url: string
}
