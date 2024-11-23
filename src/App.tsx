import React, { useState, useMemo } from 'react';
import TodoList from './components/TodoList';
import Modal from './components/Modal';
import useDebounce from './hooks/useDebounce';
import './App.css';

// Определяем тип задачи
interface TodoItem {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([]); // Массив задач
  const [text, setText] = useState<string>(''); // Текст новой задачи
  const [modalOpen, setModalOpen] = useState<boolean>(false); // Состояние модального окна
  const [editingItem, setEditingItem] = useState<TodoItem | null>(null); // Задача для редактирования
  const [search, setSearch] = useState<string>(''); // Текст поиска

  const debouncedSearch = useDebounce(search, 500); // Задержка дебаунса в 500мс

  const addItem = () => {
    if (text.trim()) {
      const newItem: TodoItem = { id: Date.now(), text }; // Создаем новую задачу
      setItems((prevItems) => [...prevItems, newItem]);
      setText('');
    }
  };

  const deleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const openEditModal = (item: TodoItem) => {
    setEditingItem(item);
    setText(item.text);
    setModalOpen(true);
  };

  const saveEdit = () => {
    if (editingItem) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editingItem.id ? { ...item, text } : item
        )
      );
      setModalOpen(false);
      setEditingItem(null);
      setText('');
    }
  };

  // Фильтруем задачи на основе текста поиска с дебаунсом
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.text.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [items, debouncedSearch]);

  return (
    <div>
      <h1>Мои домашние дела</h1>
      
      <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Добавить новую задачу"
        />
        <button onClick={addItem}>Добавить</button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск задач"
        style={{ marginTop: '20px', padding: '8px', width: '100%', borderRadius: '8px' }}
      />

      <TodoList items={filteredItems} onDelete={deleteItem} onEdit={openEditModal} />
      
      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={saveEdit}
        text={text}
        setText={setText}
      />
    </div>
  );
};

export default App;
