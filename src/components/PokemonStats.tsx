import { FC } from "react"
import { Stat } from "../interfaces/pokemonDetails"

interface PokemonStatsProps {
	pokemonStats: Stat[]
}

const PokemonStats: FC<PokemonStatsProps> = ({ pokemonStats }) => {
	const renderStats = () => {
		return pokemonStats.map((stat, index) => (
			<div key={index}>
				<div className="dark:bg-darkBg-lighter bg-gray-300 mb-1 rounded-md p-1 relative">
					<span className="uppercase absolute top-[18%] left-[2%] font-bold dark:text-customWhite">
						{stat.stat.name} = {stat.base_stat}
					</span>
					<div
						className="dark:bg-darkBg-darker-extreme bg-gray-500 bg-opacity-60 pl-2 h-7 flex items-center"
						style={{ width: `${stat.base_stat * 0.8}%` }}
					></div>
				</div>
			</div>
		))
	}

	return (
		<section className="xl:w-[1200px] lg:w-[1000px] sm:w-[600px] w-full">
			<h1 className="mb-2 text-3xl">Base stats</h1>
			{renderStats()}
		</section>
	)
}

export default PokemonStats
