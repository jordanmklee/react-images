import './App.css';
import '@fontsource/roboto';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Imagesjs from "./components/Images";

function App() {
	return (
		<>
			<Router>
				<Switch>
					<Route path="/" component={Imagesjs}/>
				</Switch>
			</Router>
		</>
	);
}

export default App;
