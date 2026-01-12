/* Тестовый файл для UsersPage*/
import { render, screen, fireEvent } from '@testing-library/react';
import { UsersPage } from './UsersPage';
import { MemoryRouter } from 'react-router-dom';

// Мокаем useSearchParams
const mockSetSearchParam = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => {
    const params = new URLSearchParams();
    return [params, mockSetSearchParam];
  },
}));

// Мокаем данные пользователей
jest.mock('../../data/users', () => {
  const usersArray = new Array(2).fill(null);
  usersArray[0] = { id: 0, fullName: 'John Doe' };
  usersArray[1] = { id: 1, fullName: 'Jane Smith' };
  
  return {
    USERS: usersArray
  };
});

describe('UsersPage', () => {
  beforeEach(() => {
    mockSetSearchParam.mockClear();
    // Подавляем предупреждения React Router
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Тест проверяем вызов setSearchParam при вводе имени пользователя
  it('должен вызывать setSearchParam при изменении поля ввода', () => {
    render(
      <MemoryRouter>
        <UsersPage />
      </MemoryRouter>
    );

    // Находим поле ввода по тексту метки
    const input = screen.getByLabelText(/введите имя/i);
    
    // Вводим текст
    fireEvent.change(input, { target: { value: 'John' } });
    
    // Проверяем, что setSearchParam был вызван с правильными аргументами
    expect(mockSetSearchParam).toHaveBeenCalledWith({ searchName: 'john' });
  });

  it('должен отображать заголовок UsersPage', () => {
    render(
      <MemoryRouter>
        <UsersPage />
      </MemoryRouter>
    );

    expect(screen.getByText('UsersPage')).toBeInTheDocument();
  });

  // Тест для отображения списка пользователей
  it('должен отображать список пользователей', () => {
    render(
      <MemoryRouter>
        <UsersPage />
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
});