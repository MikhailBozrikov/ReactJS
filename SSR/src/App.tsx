import { FC, Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

const LazyHomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LazyPostsPage = lazy(() => import('./pages/PostsPage/PostsPage'));
const LazyTodoPage = lazy(() => import('./pages/TodoPage/TodoPage'));
const LazyAlbumPage = lazy(() => import('./pages/AlbumsPage/AlbumsPage'));
const LazyCustomLayout = lazy(() => import('./components/Layout/Layout')); // Исправлено имя

const App: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<LazyCustomLayout />}> 
            <Route index element={<LazyHomePage />} />
            <Route path='posts' element={<LazyPostsPage />} />
            <Route path='albums' element={<LazyAlbumPage />} />
            <Route path='todos' element={<LazyTodoPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;