import { useEffect, useState } from "react";
import { Navbar } from "./Common/Navbar";
import ShowCard from "./Common/ShowCard";

const TopAnime = () => {
	const [topArr, setTopArr] = useState([]);
	useEffect(async () => {
		const response = await fetch("https://api.jikan.moe/v3/top/anime");
		const data = await response.json();
	}, []);
	return (
		<>
			<Navbar />
			<div className="grid grid-cols-2 justify-center md:grid-cols-5 gap-4 mt-5 md:w-11/12 m-auto">
				{topArr.map((show) => {
					return (
						<ShowCard
							mal_id={show.mal_id}
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

export default TopAnime;
