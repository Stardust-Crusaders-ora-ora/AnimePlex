import { useEffect } from "react";

const ShowCard = ({ showImg, title, rank, rating }) => {
	return (
		<>
			<div className="relative col-span-1 m-auto ">
				<div className="w-12/12 h-9/12">
					{rank && (
						<span className="z-index-20 absolute p-2 font-medium">#{rank}</span>
					)}
					{showImg ? (
						<img className="object-contain" src={showImg} alt="show-card" />
					) : (
						<img
							src="https://cdn.myanimelist.net/images/anime/4/19644.jpg"
							alt="show-card"
						/>
					)}
				</div>

				<h2 className="text-center">{title}</h2>
			</div>
		</>
	);
};

export default ShowCard;
