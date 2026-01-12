import { ChangeEvent } from "react";
import { PLAYLISTS } from "../../data/playlists";
import "./PlaylistsPage.css";
import { Link, useSearchParams } from "react-router-dom";

export function PlaylistsPage() {
	const [searchParams, setSearchParams] = useSearchParams();

	const handleSearchTitle = (event: ChangeEvent<HTMLInputElement>): void => {
		const { value } = event.target;
		const newSearchParams = new URLSearchParams(searchParams);
		if (value) {
			newSearchParams.set("title", value.toLowerCase());
		} else {
			newSearchParams.delete("title");
		}
		setSearchParams(newSearchParams);
	};

	const handleSearchGenre = (event: ChangeEvent<HTMLInputElement>): void => {
		const { value } = event.target;
		const newSearchParams = new URLSearchParams(searchParams);
		if (value) {
			newSearchParams.set("genre", value.toLowerCase());
		} else {
			newSearchParams.delete("genre");
		}
		setSearchParams(newSearchParams);
	};

	const searchTitle = searchParams.get("title") || "";
	const searchGenre = searchParams.get("genre") || "";

	// Фильтруем плейлисты: исключаем "Non Music" и применяем фильтры по названию и жанру
	const filteredPlaylists = PLAYLISTS.filter((playlist) => {
		// Исключаем плейлисты с жанром "Non Music"
		if (playlist.genre === "Non Music") return false;
		
		// Применяем фильтр по названию
		if (searchTitle && !playlist.name.toLowerCase().includes(searchTitle)) {
			return false;
		}
		
		// Применяем фильтр по жанру
		if (searchGenre && !playlist.genre.toLowerCase().includes(searchGenre)) {
			return false;
		}
		
		return true;
	});

	return (
		<div className="playlistsPage">
			<h2>PlaylistsPage</h2>

			<div className="playlists">
				<label>
					введите жанр{" "}
					<input 
						type="text" 
						value={searchGenre} 
						onChange={handleSearchGenre} 
					/>
				</label>

				<label>
					введите название{" "}
					<input 
						type="text" 
						value={searchTitle} 
						onChange={handleSearchTitle} 
					/>
				</label>

				{filteredPlaylists.length === 0 ? (
					<p>Нет плейлистов, соответствующих фильтрам</p>
				) : (
					filteredPlaylists.map((playlist) => (
						<div key={playlist.id} className="playlist-item">
							<Link to={`/playlists/${playlist.id}`}>
								{playlist.name}
							</Link>
						</div>
					))
				)}
			</div>
		</div>
	);
}