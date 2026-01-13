/* Тестовый файл для PlaylistsPage*/
import { render, screen, fireEvent } from '@testing-library/react';
import { PlaylistsPage } from './PlaylistsPage';
import { MemoryRouter } from 'react-router-dom';

// Мокаем useSearchParams
const mockSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => {
    const params = new URLSearchParams();
    return [params, mockSetSearchParams];
  },
}));

// Мокаем данные плейлистов
jest.mock('../../data/playlists', () => {
  const playlistsArray = new Array(3).fill(null);
  playlistsArray[0] = {
    id: 0,
    genre: 'Rock',
    name: 'Rock Hits',
    songs: []
  };
  playlistsArray[1] = {
    id: 1,
    genre: 'Pop',
    name: 'Pop Hits',
    songs: []
  };
  playlistsArray[2] = {
    id: 2,
    genre: 'Non Music',
    name: '',
    songs: []
  };
  
  return {
    PLAYLISTS: playlistsArray
  };
});

describe('PlaylistsPage', () => {
  beforeEach(() => {
    mockSetSearchParams.mockClear();
    // Подавляем предупреждения React Router
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Тест проверяем вызов setSearchParams при вводе жанра
  it('должен вызывать setSearchParams при изменении поля жанра', () => {
    render(
      <MemoryRouter>
        <PlaylistsPage />
      </MemoryRouter>
    );

    // Находим поле ввода жанра по тексту метки
    const genreInput = screen.getByLabelText(/введите жанр/i);
    
    // Вводим текст
    fireEvent.change(genreInput, { target: { value: 'rock' } });
    
    // Проверяем, что setSearchParams был вызван
    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  // Тест проверяем вызов setSearchParams при вводе названия
  it('должен вызывать setSearchParams при изменении поля названия', () => {
    render(
      <MemoryRouter>
        <PlaylistsPage />
      </MemoryRouter>
    );

    // Находим поле ввода названия по тексту метки
    const titleInput = screen.getByLabelText(/введите название/i);
    
    // Вводим текст
    fireEvent.change(titleInput, { target: { value: 'hits' } });
    
    // Проверяем, что setSearchParams был вызван
    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it('должен отображать заголовок PlaylistsPage', () => {
    render(
      <MemoryRouter>
        <PlaylistsPage />
      </MemoryRouter>
    );

    expect(screen.getByText('PlaylistsPage')).toBeInTheDocument();
  });

  // Тест для отображения списка плейлистов (исключая Non Music)
  it('должен отображать список плейлистов, исключая Non Music', () => {
    render(
      <MemoryRouter>
        <PlaylistsPage />
      </MemoryRouter>
    );

    // Должны отображаться только плейлисты с жанром не "Non Music"
    expect(screen.getByText('Rock Hits')).toBeInTheDocument();
    expect(screen.getByText('Pop Hits')).toBeInTheDocument();
    // Non Music плейлист не должен отображаться
    // Используем getAllByRole чтобы проверить количество ссылок
    const playlistLinks = screen.getAllByRole('link');
    expect(playlistLinks).toHaveLength(2);
  });
});