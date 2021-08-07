import Main from "./components/Main";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopAnime from "./components/TopAnime";
import Airing from "./components/Airing";
function App() {
	return (
		<Switch>
			<div className="App bg-gray-900 min-h-screen text-white">
				<Route exact path="/" component={Main}></Route>
				<Route exact path="/top" component={TopAnime}></Route>
				<Route exact path="/now-airing" component={Airing}></Route>
			</div>
		</Switch>
	);
}

export default App;
