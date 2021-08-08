import { useHistory } from "react-router-dom";

const ShowCard = ({ mal_id, showImg, title, rank, rating }) => {
	const history = useHistory();
	const animeCardShow = (mal_id) => {
		history.push(`/anime/${mal_id}`);
	};
	return (
		<>
			<div
				className=" cursor-pointer col-span-1 transform hover:scale-110 transition ease-in-out duration-300"
				onClick={() => {
					animeCardShow(mal_id);
				}}
			>
				{rank && (
					<span className=" z-index-20 absolute p-2 font-medium ml-10">
						#{rank}
					</span>
				)}
				{showImg ? (
					<img
						style={{ height: "247px", margin: "0 auto" }}
						src={showImg}
						alt="show-card"
					/>
				) : (
					<img
						style={{ height: "247px", margin: "0 auto" }}
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
