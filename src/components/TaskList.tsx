import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import { useAppDispatch } from '../app/hooks';
import type { Task } from '../features/tasks/tasksSlice';
import { toggleIsArchived, toggleIsDone } from '../features/tasks/tasksSlice';

export type Filter = 'all' | 'active' | 'done' | 'archived';

const getFilteredTasks = (tasks: Task[], filterBy: string) => {
  switch (filterBy) {
    case 'all':
      return tasks;
    case 'active':
      return tasks.filter((task) => !task.isDone && !task.isArchived);
    case 'done':
      return tasks.filter((task) => task.isDone && !task.isArchived);
    case 'archived':
      return tasks.filter((task) => task.isArchived);
    default:
      return tasks;
  }
};

function TaskList({ tasks, filterBy }: { tasks: Task[]; filterBy: Filter }) {
  const filteredTasks = getFilteredTasks(tasks, filterBy);
  const dispatch = useAppDispatch();

  if (filteredTasks.length === 0) {
    return <div style={{ textAlign: 'center' }}>Пусто</div>;
  }

  return (
    <List>
      {filteredTasks.map((task) => {
        const labelId = `checkbox-list-label-${task.title}`;

        return (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton
                onClick={() => dispatch(toggleIsArchived(task.id))}
                edge="end"
              >
                {task.isArchived ? <RestoreIcon /> : <DeleteIcon />}
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              onClick={() => dispatch(toggleIsDone(task.id))}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  checked={task.isDone}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={task.title}
                style={{
                  textDecoration: task.isDone ? 'line-through' : 'none',
                  color: task.isDone ? 'gray' : 'inherit',
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default TaskList;
