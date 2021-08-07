import { useEffect } from "react";

const ShowCard = ({ showImg, title, rank, rating }) => {
	return (
		<>
			<div className="col-span-1 ">
				{rank && (
				<span className="z-index-20 absolute p-2 font-medium ml-10">#{rank}</span>
				)}
				{showImg ? (
					<img  style={{height:'247px' , margin:'0 auto'}} src={showImg} alt="show-card" />
				) : (
					<img
						style={{height:'247px', margin:'0 auto'}}
						src="https://cdn.myanimelist.net/images/anime/4/19644.jpg"
						alt="show-card"
					/>
				)}
				<h2 className="text-center">{title}</h2>
			</div>
		</>
	);
};

export default ShowCard;
