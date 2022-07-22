enum pokemonTypes {
	"normal",
	"fighting",
	"flying",
	"poison",
	"ground",
	"rock",
	"bug",
	"ghost",
	"steel",
	"fire",
	"water",
	"grass",
	"electric",
	"psychic",
	"ice",
	"dragon",
	"dark",
	"fairy",
	"unknown",
	"shadow",
}

export interface DoubleDamageFrom {
	name:
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
	url: string
}

export interface DoubleDamageTo {
	name: string
	url: string
}

export interface HalfDamageFrom {
	name: string
	url: string
}

export interface HalfDamageTo {
	name: string
	url: string
}

export interface NoDamageTo {
	name: string
	url: string
}

export interface DamageRelations {
	double_damage_from: DoubleDamageFrom[]
	double_damage_to: DoubleDamageTo[]
	half_damage_from: HalfDamageFrom[]
	half_damage_to: HalfDamageTo[]
	no_damage_from: any[]
	no_damage_to: NoDamageTo[]
}

export interface Generation {
	name: string
	url: string
}

export interface GameIndice {
	game_index: number
	generation: Generation
}

export interface Generation2 {
	name: string
	url: string
}

export interface MoveDamageClass {
	name: string
	url: string
}

export interface Move {
	name: string
	url: string
}

export interface Language {
	name: string
	url: string
}

export interface Name {
	language: Language
	name: string
}

export interface Pokemon2 {
	name: string
	url: string
}

export interface Pokemon {
	pokemon: Pokemon2
	slot: number
}

export interface IPokemonTypeDetails {
	damage_relations: DamageRelations
	game_indices: GameIndice[]
	generation: Generation2
	id: number
	move_damage_class: MoveDamageClass
	moves: Move[]
	name: string
	names: Name[]
	past_damage_relations: any[]
	pokemon: Pokemon[]
}