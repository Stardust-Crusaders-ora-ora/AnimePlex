import { useEffect, useState } from "react";
import { Navbar } from "./Common/Navbar";
import ShowCard from "./Common/ShowCard";
const Airing = () => {
	const [curAir, setCurAir] = useState([]);
	useEffect(async () => {
		const response = await fetch("https://api.jikan.moe/v3/top/anime/1/airing");
		const data = await response.json();
		console.log(data.top);
		setCurAir(data.top);
	}, []);
	return (
		<>
			<Navbar />
			<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-5  p-4 pt-3 md:w-11/12 m-auto">
				{curAir.map((show) => {
					return (
						<ShowCard
							malID={show.mal_id}
							showImg={show.image_url}
							title={show.title}
							rank={show.rank}
							rating={show.score}
						/>
					);
				})}
			</div>
		</>
	);
};

export default Airing;
