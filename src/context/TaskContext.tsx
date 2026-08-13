import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

export type Filter = "all" | "completed" | "pending";

type TaskContextValue = {
  tasks: Task[];
  visibleTasks: Task[];
  filter: Filter;
  hydrated: boolean;
  counts: { all: number; completed: number; pending: number };
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (f: Filter) => void;
  reorderTasks: (fromId: string, toIndex: number) => void;
};

const TaskContext = createContext<TaskContextValue | null>(null);

const STORAGE_KEY = "atm.tasks.v1";
const FILTER_KEY = "atm.filter.v1";

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks, hydrated] = useLocalStorage<Task[]>(STORAGE_KEY, []);
  const [filter, setFilterState] = useLocalStorage<Filter>(FILTER_KEY, "all");

  const addTask = useCallback(
    (title: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;
      setTasks((prev) => [
        {
          id:
            typeof crypto !== "undefined" && "randomUUID" in crypto
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random()}`,
          title: trimmed,
          completed: false,
          createdAt: Date.now(),
        },
        ...prev,
      ]);
    },
    [setTasks],
  );

  const toggleTask = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id)),
    [setTasks],
  );

  const clearCompleted = useCallback(
    () => setTasks((prev) => prev.filter((t) => !t.completed)),
    [setTasks],
  );

  const setFilter = useCallback((f: Filter) => setFilterState(f), [setFilterState]);

  const reorderTasks = useCallback(
    (fromId: string, toIndex: number) => {
      setTasks((prev) => {
        const from = prev.findIndex((t) => t.id === fromId);
        if (from === -1) return prev;
        const next = prev.slice();
        const moved = next.splice(from, 1)[0];
        if (!moved) return prev;
        next.splice(Math.max(0, Math.min(toIndex, next.length)), 0, moved);
        return next;
      });
    },
    [setTasks],
  );

  const visibleTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  const counts = useMemo(() => {
    const completed = tasks.reduce((n, t) => n + (t.completed ? 1 : 0), 0);
    return { all: tasks.length, completed, pending: tasks.length - completed };
  }, [tasks]);

  const value = useMemo<TaskContextValue>(
    () => ({
      tasks,
      visibleTasks,
      filter,
      hydrated,
      counts,
      addTask,
      toggleTask,
      deleteTask,
      clearCompleted,
      setFilter,
      reorderTasks,
    }),
    [
      tasks,
      visibleTasks,
      filter,
      hydrated,
      counts,
      addTask,
      toggleTask,
      deleteTask,
      clearCompleted,
      setFilter,
      reorderTasks,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within a TaskProvider");
  return ctx;
}
