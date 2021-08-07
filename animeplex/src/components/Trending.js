import { useEffect, useState } from "react";
import { Navbar } from "./Common/Navbar";
import ShowCard from "./Common/ShowCard";

const Trending = () => {
	const [trend, setTrend] = useState([]);
	useEffect(async () => {
		const response = await fetch("https://api.jikan.moe/v3/top/anime");
		const data = await response.json();
		setTrend(data.top);
		console.log(data.top);
	}, []);
	return (
		<>
			<Navbar />
			<div className="grid grid-cols-2 justify-center md:grid-cols-5 gap-4 mt-5 md:w-11/12 m-auto">
				{trend.map((show) => {
					return (
						<ShowCard
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

export default Trending;