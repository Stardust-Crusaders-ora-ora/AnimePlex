import { useState, useEffect } from "react";
import ShowCard from "./Common/ShowCard";
import SwiperCore, {
	Navigation,
	Autoplay,
	Pagination,
	Scrollbar,
	A11y,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

const SliderShow = ({ recom }) => {
	const [obj, setObj] = useState([]);
	let ids = [];

	useEffect(async () => {
		let y = 0;
		if (recom.length > 15) y = 15;
		else y = recom.length;
		let x = 0;
		while (x < y) {
			let response = await fetch("https://api.jikan.moe/v3/anime/" + recom[x]);
			if (response.status === 200) {
				let data = await response.json();
				// console.log(data);
				ids.push(data);
			}
			x++;
		}
		setObj(ids);
		// console.log(typeof obj[0].title);
		// console.log(typeof ids[0].title);
	}, []);

	return (
		<>
			<div className="grid grid-cols-2 justify-center md:grid-cols-5 gap-4 mt-5 md:w-11/12 m-auto">
				{obj.map((show) => {
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

export default SliderShow;
