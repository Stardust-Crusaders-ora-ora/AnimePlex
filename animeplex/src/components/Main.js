import { Navbar } from "./Common/Navbar";
import { SearchBar } from "./SearchBar";
import { ShowsArea } from "./ShowsArea";
import { Carousel } from "./Carousel";
import { useState, useEffect } from "react";

const Main = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() => {}, [loggedIn]);
	return (
		<>
			<div>
				<Navbar
					onLog={(val) => {
						setLoggedIn(val);
					}}
				/>
				<SearchBar />
				<Carousel />
				{loggedIn && <ShowsArea />}
			</div>
		</>
	);
};

export default Main;
