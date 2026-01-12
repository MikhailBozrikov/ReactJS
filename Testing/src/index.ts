/**
 * ФАЙЛ РЕЭКСПОРТА КОМПОНЕНТОВ СТРАНИЦ
 * 
 * Центральная точка экспорта всех компонентов страниц.
 * Упрощает импорт в App.tsx и других местах.
 * 
 * Экспортирует:
 * - MainPage - главная страница
 * - UsersPage - страница пользователей
 * - UserInfoPage - страница информации о пользователе
 * - PlaylistsPage - страница плейлистов
 * - PlaylistInfoPage - страница информации о плейлисте
 * 
 * Структура импорта:
 * Каждый экспорт делегируется соответствующему index-файлу в папке компонента
 * Это позволяет легко добавлять новые страницы
 */
export { MainPage } from "./pages/MainPage";
export { UsersPage } from "./pages/UsersPage";
export { UserInfoPage } from "./pages/UserInfoPage";
export { PlaylistsPage } from "./pages/PlaylistsPage";
export { PlaylistInfoPage } from "./pages/PlaylistInfoPage";