import { useState, useEffect } from "react";
import SliderShow from "./SliderShow";
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

export const ShowsArea = () => {
	const [recom, setRecom] = useState([]);
	useEffect(async () => {
		let username = localStorage.getItem("username");
		const response = await fetch("http://localhost:8000/recommend/" + username);
		const data = await response.json();
		const arra = data.recommendations;
		let arr = [];

		if (arra.length > 0) {
			let i = 0;

			while (i < arra.length) {
				arr.push(arra[i]);
				i++;
			}
		}

		setRecom(arr);
	}, []);

	return (
		<>
			<br id="down" />
			<div className="flex">
				<div className="mt-3 ml-5 text-bold text-lg italic bg-blue-0 bg-red-500 text-black p-2 rounded-tl-lg rounded-br-lg">
					Recommendations
				</div>
			</div>
			<br />
			{recom.length > 0 && <SliderShow recom={recom} />}
		</>
	);
};
