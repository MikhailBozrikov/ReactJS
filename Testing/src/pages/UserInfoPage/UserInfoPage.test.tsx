/* Тестовый файл для UserInfoPage*/
import { render, screen } from '@testing-library/react';
import { UserInfoPage } from './UserInfoPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Мокаем данные пользователей - создаем правильную структуру массива
jest.mock('../../data/users', () => {
  const usersArray = new Array(20).fill(null);
  
  // Первый пользователь (индекс 0)
  usersArray[0] = {
    id: 0,
    email: 'Sophia3@gmail.com',
    fullName: 'Abraham Walsh',
    jobTitle: 'Investor Optimization Executive',
    avatar: 'https://avatars.githubusercontent.com/u/14016129',
    bio: 'Mollitia eos ducimus porro. Dolore nobis quas illum aliquam animi cumque vel adipisci atque. Dolores cupiditate nulla atque atque. Sunt odit veniam perspiciatis id error. Aliquam expedita esse nisi atque sint possimus quasi.',
    playlist: {
      id: 0,
      genre: 'Rock',
      name: 'Great Rock Hits',
      songs: []
    }
  };
  
  // Второй пользователь (индекс 1) - без плейлиста
  usersArray[1] = {
    id: 1,
    email: 'test@example.com',
    fullName: 'Test User',
    jobTitle: 'Test Developer',
    avatar: 'test.jpg',
    bio: 'Test bio'
  };
  
  return {
    USERS: usersArray
  };
});

describe('UserInfoPage', () => {
  beforeEach(() => {
    // Подавляем предупреждения React Router
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Тест проверяем текст по умолчанию, если нет пользователя
  it('должен показывать сообщение, если пользователь не найден', () => {
    render(
      <MemoryRouter initialEntries={['/users/999']}>
        <Routes>
          <Route path="/users/:userId" element={<UserInfoPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/пользователя таким userId нет/i)).toBeInTheDocument();
  });

  // Тест проверяем данные о пользователе, если он существует
  it('должен отображать данные пользователя, когда он существует с плейлистом', () => {
    render(
      <MemoryRouter initialEntries={['/users/0']}>
        <Routes>
          <Route path="/users/:userId" element={<UserInfoPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Проверяем заголовок
    expect(screen.getByText('UserInfoPage')).toBeInTheDocument();
    
    // Проверяем email
    expect(screen.getByText(/Sophia3@gmail.com/i)).toBeInTheDocument();
    
    // Проверяем имя
    expect(screen.getByText(/Abraham Walsh/i)).toBeInTheDocument();
    
    // Проверяем должность
    expect(screen.getByText(/Investor Optimization Executive/i)).toBeInTheDocument();
    
    // Проверяем ссылку на плейлист
    const playlistLink = screen.getByText(/Great Rock Hits/i);
    expect(playlistLink).toBeInTheDocument();
    expect(playlistLink.closest('a')).toHaveAttribute('href', '/playlists/0');
  });

  // Тест для пользователя без плейлиста
  it('должен отображать данные пользователя без плейлиста', () => {
    render(
      <MemoryRouter initialEntries={['/users/1']}>
        <Routes>
          <Route path="/users/:userId" element={<UserInfoPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Test User/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });
});