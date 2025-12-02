import { useState, useRef} from 'react';

export function useList() {
  const [list, setList] = useState([]);
  const newlyCreatedIdRef = useRef(null);

  // Создать новый элемент.
  const createItem = () => {
    const newItem = {
      id: Date.now(),
      title: '',
      done: false,
    };
    
    setList(prevList => [newItem, ...prevList]);
    newlyCreatedIdRef.current = newItem.id;
  };

  /**
   * Установить заголовок элемента.
   *
   * @param id - ID элемента.
   * @param title - Заголовок элемента.
   */
  const setItemTitle = (id, title) => {
    setList(prevList =>
      prevList.map(item =>
        item.id === id ? { ...item, title } : item
      )
    );
  };

  /**
   * Переключить выполненность элемента.
   *
   * @param id - ID элемента.
   */
  const toggleItem = (id) => {
    setList(prevList =>
      prevList.map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  /**
   * Удалить элемент.
   *
   * @param id - ID элемента.
   */
  const deleteItem = (id) => {
    setList(prevList => prevList.filter(item => item.id !== id));
  };

  // Хук для получения ID только что созданного элемента
  const getNewlyCreatedId = () => {
    return newlyCreatedIdRef.current;
  };

  // Хук для сброса ID только что созданного элемента
  const resetNewlyCreatedId = () => {
    newlyCreatedIdRef.current = null;
  };

  return {
    list,
    createItem,
    setItemTitle,
    toggleItem,
    deleteItem,
    getNewlyCreatedId,
    resetNewlyCreatedId,
  };
}