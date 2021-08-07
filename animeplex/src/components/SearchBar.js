import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
export const SearchBar = () => {
	const [results, setResults] = useState(false);

	const [searchValue, setSearchValue] = useState("");

	const handleChange = (event) => {
		// setResults(true);
		setSearchValue(event.target.value);
		if (searchValue.length >= 3) {
			///fetch cal
		}
	};
	const handleSubmit = () => {};
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
							{results && <DropDownResults />}
						</div>
						<div>
							<button
								className="bg-white-500 text-white rounded-full p-2 hover:bg-purple-500 focus:outline-none w-12 h-12 flex items-center justify-center"
								type="submit"
								onSubmit={handleSubmit}
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

const DropDownResults = () => {
	return (
		<div className=" divide-y   mx-auto w-full  justify-center items-center text-center mt-1 rounded-b-lg">
			{/* {props.result.map((item) => {
				<ResultItem item />;
			})} */}
			<ResultItem />
			<ResultItem />
			<ResultItem />
			<ResultItem />
			<ResultItem />
			<ResultItem />
		</div>
	);
};

const ResultItem = () => {
	// return;
	return <div className="text-black bg-violet-400  h-10 ">search Results</div>;
};
