import { useEffect, useState } from "react";
import EpisodeCard from "./Common/EpisodeCard";
import ReactPaginate from "react-paginate";
const WatchArea = ({ episodes, imgUrl, onWatch }) => {
	const [pageNumber, setPageNumber] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const episodesPerPage = 5;

	const episodesWatched = pageNumber * episodesPerPage;
	const displayEpisodes = episodes.slice(
		episodesWatched,
		episodesWatched + episodesPerPage
	);

	const changePage = ({ selected }) => {
		console.log("selected", selected);
		setPageNumber(selected);
	};
	useEffect(async () => {
		const count = Math.ceil(episodes.length / episodesPerPage);
		setPageCount(count);
		// fetchNewComments();
	}, []);
	return (
		<>
			<div className="w-full flex flex-col gap-10 mt-5">
				{displayEpisodes.map((episode) => {
					return (
						<EpisodeCard
							title={episode.title}
							imgUrl={imgUrl}
							episode_id={episode.episode_id}
							onUpdate={() => {
								onWatch();
							}}
						/>
					);
				})}
			</div>
			{episodes.length >= episodesPerPage && (
				<ReactPaginate
					pageCount={pageCount}
					onPageChange={changePage}
					breakLabel={"..."}
					breakClassName={"break-me"}
					previousLabel={"Prev"}
					nextLabel={"Next"}
					containerClassName={"flex gap-4 justify-center items-center p-10"}
					previousLinkClassName={"border-2 p-2 rounded bg-gray-800 text-white "}
					nextLinkClassName={"border-2 p-2 rounded bg-gray-800 text-white "}
					disabledClassName={"paginationDisabled"}
					activeClassName={"border-2 px-4 py-2 rounded bg-gray-700 text-white "}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
				></ReactPaginate>
			)}
		</>
	);
};

export default WatchArea;
