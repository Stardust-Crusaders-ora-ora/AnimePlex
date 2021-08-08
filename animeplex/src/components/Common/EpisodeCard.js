import { useState } from "react";

const EpisodeCard = ({ episode_id, title, imgUrl, onUpdate }) => {
	const [status, setStatus] = useState("");
	const handleClick = () => {
		setStatus("WATCHING");
		onUpdate();
	};
	return (
		<>
			<div
				onClick={handleClick}
				className=" rounded cursor-pointer transform hover:scale-110 transition ease-in-out duration-300 text-white w-sm md:w-2/4 p-4 m-auto flex  bg-black"
			>
				<img src={imgUrl} className="w-20 mr-5" alt="ep-thumbnl" />
				<div className="flex flex-col">
					<h2 className="text-xl">Episode {episode_id}</h2>
					<h2>
						{"  "}
						{title}
					</h2>
					<p>{status}</p>
				</div>
			</div>
		</>
	);
};

export default EpisodeCard;
