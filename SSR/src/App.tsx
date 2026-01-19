import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import CusomLayout from "./components/Layout/Layout";
import AlbumsPage from "./pages/AlbumsPage/AlbumsPage";
import PostsPage from "./pages/PostsPage/PostsPage";
import TodoPage from "./pages/TodoPage/TodoPage";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CusomLayout />}>
					<Route index path="" element={<HomePage />} />
					<Route path="posts" element={<PostsPage />} />
					<Route path="albums" element={<AlbumsPage />} />
					<Route path="todos" element={<TodoPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
