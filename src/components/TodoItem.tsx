import React from 'react';
import styles from './TodoItem.module.css'; // Импорт CSS-модуля

// Типизация пропсов для TodoItem
interface TodoItemProps {
  task: string; // Текст задачи
  onDelete: () => void; // Функция для удаления задачи
  onEdit: () => void; // Функция для редактирования задачи
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onDelete, onEdit }) => {
  return (
    <li className={styles.item}>
      <span>{task}</span>
      <div>
        <button onClick={onEdit} className={styles.editButton}>Редактировать</button>
        <button onClick={onDelete} className={styles.deleteButton}>Удалить</button>
      </div>
    </li>
  );
};

export default TodoItem;
