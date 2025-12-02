import { Card } from './Card';
import './CardList.css';

export const CardList = ({
  list,
  onItemTitleChange,
  onItemToggle,
  onItemDelete,
  getNewlyCreatedId,
  resetNewlyCreatedId,
}) => {
  const newlyCreatedId = getNewlyCreatedId();

  return (
    <ul className="card-list">
      {list.map(({ id, title, done }) => {
        const isNew = id === newlyCreatedId;
        
        if (isNew) {
          // Сбрасываем ID после использования
          setTimeout(() => resetNewlyCreatedId(), 0);
        }
        
        return (
          <li key={id} className="card-list__item">
            <Card
              id={id}
              title={title}
              done={done}
              isNew={isNew}
              onTitleChange={onItemTitleChange}
              onToggle={onItemToggle}
              onDelete={onItemDelete}
            />
          </li>
        );
      })}
    </ul>
  );
};