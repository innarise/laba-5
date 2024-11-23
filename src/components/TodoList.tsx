import React, { memo } from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css'; // Импорт CSS-модуля

// Определяем тип для задачи
interface TodoItem {
  id: number;
  text: string;
}

// Типы для пропсов компонента TodoList
interface TodoListProps {
  items: TodoItem[]; // Массив задач
  onDelete: (id: number) => void; // Функция для удаления задачи
  onEdit: (item: TodoItem) => void; // Функция для редактирования задачи
}

const TodoList: React.FC<TodoListProps> = ({ items, onDelete, onEdit }) => {
  console.log('Render');
  
  return (
    <div className={styles.todoList}>
      <h2 className={styles.title}>Список дел</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <TodoItem
            key={item.id}
            task={item.text}
            onDelete={() => onDelete(item.id)}
            onEdit={() => onEdit(item)}
          />
        ))}
      </ul>
    </div>
  );
};

export default memo(TodoList);
