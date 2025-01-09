import { RootState } from "@/redux/store";
import { ITask } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface IInitialState {
  tasks: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

const initialState: IInitialState = {
  tasks: [
    {
      id: uuidv4(),
      title: "Task 1",
      description: "This is task 1",
      priority: "high",
      isCompleted: false,
      dueDate: "12-15",
    },
    {
      id: uuidv4(),
      title: "Task 2",
      description: "This is task 1",
      priority: "high",
      isCompleted: false,
      dueDate: "12-18",
    },
    {
      id: uuidv4(),
      title: "Task 3",
      description: "This is task 1",
      priority: "high",
      isCompleted: false,
      dueDate: "12-19",
    },
  ],
  filter: "all",
};

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;

const createTask = (taskData: DraftTask): ITask => {
  return {
    id: uuidv4(),
    isCompleted: false,
    ...taskData,
  };
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      const taskData = createTask(action.payload);
      state.tasks.push(taskData);
    },
    toggoleCompleteState: (state, action: PayloadAction<string>) => {
      state.tasks.forEach(
        (task) =>
          task.id === action.payload && (task.isCompleted = !task.isCompleted)
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<ITask>) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload);
      }
    },
    updateFilter: (
      state,
      action: PayloadAction<"all" | "high" | "medium" | "low">
    ) => {
      state.filter = action.payload;
    },
  },
});

export const selectTasks = (state: RootState) => {
  const filter = state.todo.filter;

  if (filter === "low") {
    return state.todo.tasks.filter((task) => task.priority === "low");
  } else if (filter === "medium") {
    return state.todo.tasks.filter((task) => task.priority === "medium");
  } else if (filter === "high") {
    return state.todo.tasks.filter((task) => task.priority === "high");
  } else {
    return state.todo.tasks;
  }
};

export const selectFilter = (state: RootState) => {
  return state.todo.filter;
};

export const {
  addTask,
  toggoleCompleteState,
  deleteTask,
  editTask,
  updateFilter,
} = taskSlice.actions;

export default taskSlice.reducer;
