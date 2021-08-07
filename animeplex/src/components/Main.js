import { Navbar } from "./Common/Navbar";
import { SearchBar } from "./SearchBar";
import { ShowsArea } from "./ShowsArea";
import { Carousel } from "./Carousel";
const Main = () => {
	return (
		<>
			<div>
				<Navbar />
				<SearchBar />
				<Carousel />
				<ShowsArea />
			</div>
		</>
	);
};

export default Main;
