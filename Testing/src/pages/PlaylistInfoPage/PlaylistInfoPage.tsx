import { useParams, Link, useNavigate } from "react-router-dom";
import { PLAYLISTS } from "../../data/playlists";
import "./PlaylistInfoPage.css";

export function PlaylistInfoPage() {
	const { playlistId } = useParams();
	const navigate = useNavigate();
	const playlist = PLAYLISTS.find(p => p.id === Number(playlistId));

	if (!playlist) {
		return (
			<div className="playlistInfoPage">
				<h2>PlaylistInfoPage</h2>
				<div className="playlist">
					<p>Плейлиста с таким ID не существует</p>
				</div>
			</div>
		);
	}

	// Проверяем, пустой ли плейлист (Non Music)
	if (playlist.genre === "Non Music" || playlist.songs.length === 0) {
		return (
			<div className="playlistInfoPage">
				<h2>PlaylistInfoPage</h2>
				<div className="playlist">
					<p>Такого плейлиста нет или он пустой</p>
				</div>
			</div>
		);
	}

	const handleGenreClick = () => {
		navigate(`/playlists?genre=${encodeURIComponent(playlist.genre.toLowerCase())}`);
	};

	return (
		<div className="playlistInfoPage">
			<h2>PlaylistInfoPage</h2>

			<div className="playlist">
				<p>
					<strong>Жанр: </strong>
					<span 
						className="genre-link" 
						onClick={handleGenreClick}
						title="Найти плейлисты этого жанра"
					>
						{playlist.genre}
					</span>
				</p>
				<p><strong>Название: </strong>{playlist.name}</p>
				
				<h3>Список песен:</h3>
				<ul className="songs-list">
					{playlist.songs.map((song, index) => (
						<li key={index}>{song}</li>
					))}
				</ul>
			</div>
		</div>
	);
}