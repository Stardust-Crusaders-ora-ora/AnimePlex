import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../icons/search.svg";

export const SearchBar = () => {
	const [results, setResults] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const database = require("../staticAnimeData.json");
	const handleChange = async (event) => {
		// setResults(true);
		setSearchValue(event.target.value);
		if (searchValue.length >= 5) {
			let res = await fetch(
				"https://api.jikan.moe/v3/search/anime?q=" + searchValue
			);
			let data = await res.json();
			let rec = data.results;
			let dummyArr = [];
			rec.forEach((el) => {
				dummyArr.push({
					name: el.title,
					id: el.mal_id,
				});
			});
			let newDum = dummyArr.slice(0, 5);
			setResults(newDum);
		} else setResults([]);
	};

	useEffect(() => {}, [results]);

	return (
		<>
			<div className="my-8 mx-auto w-3/4 md:w-2/3">
				<div className="ml-3 -mr-3 flex flex-col ">
					<div className="w-full grid grid-cols-6 items-start ">
						<div
							className="col-span-5 bg-purple-200 focus:outline-none
                        		focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-t-xl rounded-b-xl"
						>
							<input
								className="bg-purple-200 focus:outline-none
                        		focus:bg-purple-300 focus:ring-1 focus:ring-purple-600 rounded-t-xl w-full py-4 px-6 text-gray-700 leading-tight "
								id="search-bar"
								type="text"
								placeholder="Search"
								value={searchValue}
								onChange={handleChange}
							/>
							{results && <DropDownResults resultArr={results} />}
						</div>
						<div>
							<button
								className="bg-white-500 text-white rounded-full p-2 hover:bg-purple-500 focus:outline-none w-12 h-12 flex items-center justify-center"
								type="submit"
								// onSubmit={handleSubmit}
							>
								<SearchIcon />
							</button>
						</div>
					</div>
					<div className="p-4 flex"></div>
				</div>
			</div>
		</>
	);
};

const DropDownResults = ({ resultArr }) => {
	console.log(resultArr);
	return (
		<div className=" divide-y   mx-auto w-full  justify-center items-center text-center mt-1 rounded-b-lg">
			{resultArr.map((item) => {
				return <ResultItem name={item.name} id={item.id} />;
			})}
			{/* <ResultItem />
			<ResultItem />
			<ResultItem />
			<ResultItem />
			<ResultItem />
			<ResultItem /> */}
		</div>
	);
};

const ResultItem = ({ name, id }) => {
	// return;
	const history = useHistory();

	return (
		<div
			onClick={() => {
				history.push(`/anime/${id}`);
			}}
			className="text-black bg-violet-400  h-10 "
		>
			{name}
		</div>
		// </Link>
	);
};
