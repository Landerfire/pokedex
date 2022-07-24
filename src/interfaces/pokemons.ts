export type PokemonTypes =
	| "normal"
	| "fighting"
	| "flying"
	| "poison"
	| "ground"
	| "rock"
	| "bug"
	| "ghost"
	| "steel"
	| "fire"
	| "water"
	| "grass"
	| "electric"
	| "psychic"
	| "ice"
	| "dragon"
	| "dark"
	| "fairy"
	| "unknown"
	| "shadow"

export enum typesPaths {
	"normal" = "/type/normal.png",
	"fighting" = "/type/fighting.png",
	"flying" = "/type/flying.png",
	"poison" = "/type/poison.png",
	"ground" = "/type/ground.png",
	"rock" = "/type/rock.png",
	"bug" = "/type/bug.png",
	"ghost" = "/type/ghost.png",
	"steel" = "/type/steel.png",
	"fire" = "/type/fire.png",
	"water" = "/type/water.png",
	"grass" = "/type/grass.png",
	"electric" = "/type/electric.png",
	"psychic" = "/type/psychic.png",
	"ice" = "/type/ice.png",
	"dragon" = "/type/dragon.png",
	"dark" = "/type/dark.png",
	"fairy" = "/type/fairy.png",
	"unknown" = "/type/unknown.png",
	"shadow" = "/type/shadow.png",
}

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
