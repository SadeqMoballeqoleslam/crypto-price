import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import Home from './components/pages/home/Home';

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<App />}>
					<Route index element={<Home />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
