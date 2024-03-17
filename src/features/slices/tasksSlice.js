import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiService from "../../services/ApiService";
import { toast } from "react-toastify";

const api = new ApiService();

// Async Thunk to fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await api.getWithOutToken("/tasks/all");
    return response;
  } catch (error) {
    toast.error("error while getting tasks");
    throw error;
  }
});

// Async Thunk to fetch user tasks
export const fetchUserTasks = createAsyncThunk(
  "tasks/fetchUserTasks",
  async () => {
    try {
      const response = await api.getWithToken("/tasks");
      return response;
    } catch (error) {
      toast.error("couldn't fetch tasks");
      throw error;
    }
  }
);

// // Async Thunk to fetch a single task
export const fetchSingleTask = createAsyncThunk(
  "tasks/fetchSingleTask",
  async (taskId) => {
    try {
      const response = await api.getWithOutToken(`/tasks/get/${taskId}`);
      return response;
    } catch (error) {
      toast.error("couldn't fetch single task");
      throw error;
    }
  }
);

// Async Thunk to add a new task
export const addTask = createAsyncThunk("tasks/addTask", async (taskData) => {
  try {
    const response = await api.postWithToken("/tasks/add", taskData);
    toast.success(response.message);
    return response;
  } catch (error) {
    toast.error("couldn't add task");
    throw error;
  }
});

// Async Thunk to delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    try {
      await api.deleteWithToken(`/tasks/delete/${taskId}`);
      return taskId;
    } catch (error) {
      toast.error("couldn't delete task");
      throw error;
    }
  }
);

// Async Thunk to update a task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData) => {
    const { taskId, updatedData } = taskData;
    try {
      const response = await api.putWithToken(
        `/tasks/edit/${taskId}`,
        updatedData
      );
      return response;
    } catch (error) {
      toast.error("couldn't update task");
      throw error;
    }
  }
);

// Create a slice for tasks
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    singleTask: null,
  },
  reducers: {
    // Reducer to handle adding a new task locally
    addTaskLocally: (state, action) => {
      state.tasks.push(action.payload.task); // Assuming payload contains the new task data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        // Handle the error if necessary
      })
      .addCase(fetchUserTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
        state.loading = false;
      })
      .addCase(fetchUserTasks.rejected, (state) => {
        state.loading = false;
        // Handle the error if necessary
      })
      .addCase(fetchSingleTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleTask.fulfilled, (state, action) => {
        state.singleTask = action.payload;
        state.loading = false;
      })
      .addCase(fetchSingleTask.rejected, (state) => {
        state.loading = false;
        // Handle the error if necessary
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload.task); // Add the new task to the state
      })
      .addCase(addTask.rejected, (state) => {
        state.loading = false;
        // Handle the error if necessary
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state) => {
        state.loading = false;
        // Handle the error if necessary
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTaskIndex = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (updatedTaskIndex !== -1) {
          state.tasks[updatedTaskIndex] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state) => {
        state.loading = false;
        // Handle the error if necessary
      });
  },
});

export const { addTaskLocally } = tasksSlice.actions;

export default tasksSlice.reducer;
