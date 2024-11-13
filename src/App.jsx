import React from 'react';
import CreateAcc from "./pages/createacc"
import Tracker from "./pages/tracker"
import { Routes, Route, useLocation } from "react-router-dom"; 

const App = () => {
	const location = useLocation();
	return (
	<>
		<Routes>
        	<Route path="/" element={<CreateAcc />} />
        	<Route path="/tracker" element={<Tracker />} />
        	<Route path="/*" element={<h1>Not Found</h1>} />
		</Routes>
	</>)
}

export default App