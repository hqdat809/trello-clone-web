export const initStateBoard = {
  tasks: {
    "task-1": { taskId: "task-1", taskName: "Task 1" },
    "task-2": { taskId: "task-2", taskName: "Task 2" },
    "task-3": { taskId: "task-3", taskName: "Task 3" },
    "task-4": { taskId: "task-4", taskName: "Task 4" },
    "task-5": { taskId: "task-5", taskName: "Task 5" },
    "task-6": { taskId: "task-6", taskName: "Task 6" },
    "task-7": { taskId: "task-7", taskName: "Task 7" },
    "task-8": { taskId: "task-8", taskName: "Task 8" },
    "task-9": { taskId: "task-9", taskName: "Task 9" },
    "task-10": { taskId: "task-10", taskName: "Task 10" },
    "task-11": { taskId: "task-11", taskName: "Task 11" },
    "task-12": { taskId: "task-12", taskName: "Task 12" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      columnName: "Column 1",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      columnName: "Column 2",
      taskIds: ["task-5", "task-6", "task-7", "task-8"],
    },
    "column-3": {
      id: "column-3",
      columnName: "Column 3",
      taskIds: ["task-9", "task-10", "task-11", "task-12"],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};
