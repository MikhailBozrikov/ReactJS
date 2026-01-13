/* Тестовый файл для MainPage: снапшотный тест */
import { render } from '@testing-library/react';
import { MainPage } from './MainPage';

describe('MainPage', () => {
  it('должен соответствовать снапшоту', () => {
    const { container } = render(<MainPage />);
    expect(container).toMatchSnapshot();
  });

  it('должен содержать заголовок MainPage', () => {
    const { getByText } = render(<MainPage />);
    expect(getByText('MainPage')).toBeInTheDocument();
  });
});