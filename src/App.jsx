import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import ListingPage from './pages/ListingPage/ListingPage';

function App() {
  

  return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<HomePage />} />
				
					<Route path="list" element={<ListingPage />} />
					
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App
