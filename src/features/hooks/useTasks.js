import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  fetchUserTasks,
  fetchSingleTask,
  addTask,
  deleteTask,
  updateTask,
  addTaskLocally,
} from "../slices/tasksSlice";

export const useTasks = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const singleTask = useSelector((state) => state.tasks.singleTask);
  const dispatch = useDispatch();

  return {
    tasks,
    loading,
    singleTask,
    fetchTasks: () => dispatch(fetchTasks()),
    fetchUserTasks: () => dispatch(fetchUserTasks()),
    fetchSingleTask: (taskId) => dispatch(fetchSingleTask(taskId)),
    addTask: (taskData) => dispatch(addTask(taskData)),
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    updateTask: (taskData) => dispatch(updateTask(taskData)),
    addTaskLocally: (taskData) => dispatch(addTaskLocally(taskData)),
  };
};
