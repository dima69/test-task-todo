import { Button, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

interface Props {
  onAddTask: (taskTitle: string) => void;
}

function TaskTitleInputField({ onAddTask }: Props) {
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      onAddTask(taskTitle);
      setTaskTitle('');
    }
  };

  return (
    <Stack direction="column" sx={{ alignItems: 'flex-end', gap: 1 }}>
      <TextField
        label="...выучить php и стать 300к/наносек"
        multiline
        fullWidth
        value={taskTitle}
        variant="standard"
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <Button
        disabled={taskTitle.trim().length <= 0}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddTask}
      >
        Добавить
      </Button>
    </Stack>
  );
}

export default TaskTitleInputField;
