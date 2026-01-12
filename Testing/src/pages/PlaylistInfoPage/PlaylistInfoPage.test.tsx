/* Тестовый файл для PlaylistInfoPage*/
import { render, screen } from '@testing-library/react';
import { PlaylistInfoPage } from './PlaylistInfoPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Мокаем данные из папки data
jest.mock('../../data/playlists', () => ({
  PLAYLISTS: [
    {
      id: 1,
      genre: 'Rock',
      name: 'Great Rock Hits',
      songs: ['Song 1', 'Song 2', 'Song 3']
    },
    {
      id: 2,
      genre: 'Non Music',
      name: '',
      songs: []
    }
  ]
}));

describe('PlaylistInfoPage', () => {
  beforeEach(() => {
    // Подавляем предупреждения React Router
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Тест проверяем текст по умолчанию, если нет доступного плейлиста
  it('должен показывать сообщение, если плейлист не найден', () => {
    render(
      <MemoryRouter initialEntries={['/playlists/999']}>
        <Routes>
          <Route path="/playlists/:playlistId" element={<PlaylistInfoPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Плейлиста с таким ID не существует/i)).toBeInTheDocument();
  });

  // Тест проверяем текст для пустого плейлиста (Non Music)
  it('должен показывать сообщение для пустого плейлиста', () => {
    render(
      <MemoryRouter initialEntries={['/playlists/2']}>
        <Routes>
          <Route path="/playlists/:playlistId" element={<PlaylistInfoPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Такого плейлиста нет или он пустой/i)).toBeInTheDocument();
  });

  // Тест проверяем данные о плейлисте, если он доступен
  it('должен отображать данные плейлиста, когда он существует', () => {
    render(
      <MemoryRouter initialEntries={['/playlists/1']}>
        <Routes>
          <Route path="/playlists/:playlistId" element={<PlaylistInfoPage />} />
        </Routes>
      </MemoryRouter>
    );

    const rockElements = screen.getAllByText(/Rock/i);
    expect(rockElements.length).toBeGreaterThan(0);
    
    // Проверяем название
    expect(screen.getByText(/Great Rock Hits/i)).toBeInTheDocument();
    
    // Проверяем список песен
    expect(screen.getByText(/Song 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Song 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Song 3/i)).toBeInTheDocument();
  });
});