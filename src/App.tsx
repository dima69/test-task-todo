import { Chip, Stack } from '@mui/material';
import { useState } from 'react';
import TaskList from './components/TaskList';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { addTask, deleteAllTasks } from './features/tasks/tasksSlice';
import TaskTitleInputField from './components/TaskTitleInputField';
import './App.css';

export type Filter = 'all' | 'active' | 'done' | 'archived';

function App() {
  const [filterBy, setFilterBy] = useState<Filter>('active');
  const tasks = useAppSelector((state) => state.tasks.items);
  const dispatch = useAppDispatch();

  const handleAddTask = (taskTitle: string) => {
    if (taskTitle.trim().length <= 0) return;
    dispatch(
      addTask({
        title: taskTitle,
        isDone: false,
        isArchived: false,
        id: crypto.randomUUID(),
      }),
    );
  };

  const FilterChip = ({ label, filter }: { label: string; filter: Filter }) => (
    <Chip
      clickable
      disabled={tasks.length === 0}
      label={label}
      sx={{ padding: '10px 5px', fontWeight: 'bold' }}
      variant={filterBy === filter ? 'filled' : 'outlined'}
      onClick={() => setFilterBy(filter)}
    />
  );

  return (
    <>
      <TaskTitleInputField onAddTask={handleAddTask} />
      <Stack
        direction="row"
        overflow="auto"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2,
        }}
      >
        <Stack direction="row" spacing={2}>
          <FilterChip label="💡 Активные" filter="active" />
          <FilterChip label="✅ Выполненные" filter="done" />
          <FilterChip label="🗑️ Архивные" filter="archived" />
          <FilterChip label="💯 Все" filter="all" />
        </Stack>
        <Chip
          clickable
          label="🚨 Удалить всё"
          disabled={tasks.length === 0}
          sx={{ padding: '10px 5px', fontWeight: 'bold', marginLeft: '2rem' }}
          variant={'outlined'}
          onClick={() => dispatch(deleteAllTasks())}
        />
      </Stack>
      <TaskList tasks={tasks} filterBy={filterBy} />
    </>
  );
}

export default App;
