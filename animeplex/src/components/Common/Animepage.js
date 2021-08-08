import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Navbar } from "./Navbar";
import ReactPlayer from "react-player";
import WatchArea from "../WatchArea";

const Animepage = () => {
	let { id } = useParams();
	const [animeDetails, setAnimeDetails] = useState([]);
	const [synopsis, setSynopsis] = useState("Synopsis not available.");
	const [episodes, setEpisodes] = useState([]);
	const [imgUrl, setImgUrl] = useState("");
	const [vidUrl, setVidUrl] = useState("");
	const onWatch = () => {
		setVidUrl(
			"https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
		);
	};

	useEffect(async () => {
		const response = await fetch("https://api.jikan.moe/v3/anime/" + id);
		const data = await response.json();
		setAnimeDetails(data);
		console.log(data);

		const response2 = await fetch(
			"https://api.jikan.moe/v3/anime/" + id + "/episodes"
		);
		const data2 = await response2.json();
		setEpisodes(data2.episodes);
	}, []);
	useEffect(() => {
		if (
			animeDetails &&
			animeDetails.synopsis &&
			animeDetails.synopsis.length > 0
		) {
			let synopsisFetched = animeDetails.synopsis;
			let synop = synopsisFetched.split(".");
			setSynopsis(synop[0] + ".");
		}
		setImgUrl(animeDetails.image_url);
		setVidUrl(animeDetails.trailer_url);
	}, [animeDetails]);
	useEffect(() => {
		console.log("animepage ep", episodes);
		setEpisodes(episodes);
	}, [episodes]);
	return (
		<>
			<Navbar />

			<div className="bg-gradient-to-r from-black via-gray-900 to-gray-900 w-full mx-auto grid grid-cols-1 lg:grid-cols-5 p-4 gap-8 justify-center items-start ">
				<div
					id="synopsisAndName"
					className="p-8 gap-8 col-span-1 lg:col-span-2 "
				>
					<h2 className="text-5xl font-medium">{animeDetails.title}</h2>
					<div className="w-full mt-5 ">
						<p className="text-justify">{synopsis}</p>
					</div>
				</div>
				<div
					id="trailer"
					className="mx-auto  lg:mx-3 col-span-1 lg:col-span-3 "
				>
					<div
						style={{
							width: "100%",
						}}
					>
						<ReactPlayer
							width="100%"
							url={vidUrl}
							controls={true}
							playing={true}
						/>
					</div>
				</div>
			</div>
			{episodes.length && (
				<WatchArea imgUrl={imgUrl} episodes={episodes} onWatch={onWatch} />
			)}
		</>
	);
};

export default Animepage;
