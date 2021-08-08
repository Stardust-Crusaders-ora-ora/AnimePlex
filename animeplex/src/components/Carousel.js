import React, { useEffect } from "react";
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
import { Link, useHistory } from "react-router-dom";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
export const Carousel = () => {
	const history = useHistory();
	const fetchTop50 = async () => {
		history.push("/top");
	};
	const curAiring = async () => {
		history.push("/airing");
	};
	const trending = async () => {
		history.push("/trending");
	};
	const upcoming = async () => {
		history.push("/upcoming");
	};
	return (
		<div className="mix-blend-normal text-5xl  h-48 md:h-xl md:text-8xl flex">
			<Swiper
				spaceBetween={0}
				slidesPerView={1}
				autoplay={{ delay: 3000 }}
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
				onSwiper={(swiper) => console.log(swiper)}
				onSlideChange={() => console.log("slide change")}
			>
				<SwiperSlide
					className="flex cursor-pointer justify-center items-center"
					onClick={fetchTop50}
				>
					<img
						className="w-full absolute opacity-40"
						src="https://media.giphy.com/media/zwPRprvrP4Lm0/giphy.gif"
						alt="aot"
					/>
					<h2 className="z-20">Top 50 Animes</h2>
				</SwiperSlide>

				<SwiperSlide
					className="flex cursor-pointer justify-center items-center"
					onClick={upcoming}
				>
					<img
						className="z-10 w-full absolute opacity-40"
						src="https://media.giphy.com/media/dyjrpqaUVqCELGuQVr/giphy.gif"
						alt="aot"
					/>
					<h2 className="z-20">Upcoming Animes</h2>
				</SwiperSlide>
				<SwiperSlide
					className="flex cursor-pointer justify-center items-center"
					onClick={trending}
				>
					<img
						className="z-10 w-full absolute opacity-40"
						src="https://media.giphy.com/media/vRc2V5ixLGh0OU02zp/giphy.gif"
						alt="aot"
					/>
					<h2 className="z-20">Trending</h2>
				</SwiperSlide>
				<SwiperSlide
					className="flex cursor-pointer justify-center items-center"
					onClick={curAiring}
				>
					<img
						className="z-10 w-full absolute opacity-40"
						src="https://media.giphy.com/media/QyDHI3LJx8I9hA51Qs/giphy.gif"
						alt="aot"
					/>
					<h2 className="z-20">Current Airing</h2>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};
