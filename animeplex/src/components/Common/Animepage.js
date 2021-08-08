import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Navbar } from "./Navbar";
import ReactPlayer from "react-player";
const Animepage = () => {
	let { id } = useParams();
	const [animeDetails, setAnimeDetails] = useState([]);
	const [synopsis, setSynopsis] = useState("");
	useEffect(async () => {
		const response = await fetch("https://api.jikan.moe/v3/anime/" + id);
		const data = await response.json();
		setAnimeDetails(data);
		let synopsisFetched = animeDetails.synopsis;
		let synop = synopsisFetched.split(".");
		setSynopsis(synop[0]);
	}, []);
	return (
		<>
			<Navbar />
			<div
				style={{
					backgroundImage: `url(${animeDetails.image_url})`,
					backroundRepeat: "no-repeat",
				}}
			></div>
			<div className="w-9/12 mx-auto grid grid-cols-5 p-4 justify-center items-start">
				<div id="synopsisAndName" className=" gap-10 col-span-2">
					<h2 className="text-5xl">{animeDetails.title}</h2>
					<div className="w-full h-0">
						<p>{synopsis}</p>
					</div>
				</div>
				<div id="trailer" className=" col-span-3">
					<ReactPlayer url={animeDetails.trailer_url} controls={true} />
				</div>
			</div>
		</>
	);
};

export default Animepage;
