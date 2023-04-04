// Import utilities
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import components
import LoginForm from './components/LoginForm';
import Protected from './components/Protected';
import Search from './components/Search';

// Import styling
import './App.css';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<BrowserRouter>
		<Routes>
			<Route path="/" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
			<Route
				path="/search"
				element={
					<Protected isLoggedIn={isLoggedIn}>
						<Search />
					</Protected>
			}/>
		</Routes>
		</BrowserRouter>
	)
};

export default App;