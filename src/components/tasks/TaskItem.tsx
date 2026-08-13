import { memo, useCallback, useState } from "react";
import { Check, GripVertical, Trash2 } from "lucide-react";
import type { Task } from "@/context/TaskContext";

type Props = {
  task: Task;
  dragHandleProps?: Record<string, unknown> | undefined;
  isDragging?: boolean | undefined;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TaskItem = memo(function TaskItem({
  task,
  dragHandleProps,
  isDragging,
  onToggle,
  onDelete,
}: Props) {
  const [leaving, setLeaving] = useState(false);

  const handleDelete = useCallback(() => {
    setLeaving(true);
    window.setTimeout(() => onDelete(task.id), 260);
  }, [onDelete, task.id]);

  return (
    <li
      className={`group ${leaving ? "animate-task-out" : "animate-task-in"} mb-3 list-none`}
    >
      <div
        className={`flex items-center gap-3 rounded-2xl border border-border bg-card/80 p-3 pr-2 transition-smooth hover:border-primary/40 hover:shadow-[var(--shadow-lift)] ${isDragging ? "scale-[1.01] shadow-[var(--shadow-lift)] ring-2 ring-primary/30" : ""
          }`}
      >
        <span
          {...dragHandleProps}
          aria-label="Drag to reorder"
          className="cursor-grab rounded-md p-1 text-muted-foreground opacity-50 transition-smooth hover:bg-accent hover:opacity-100 active:cursor-grabbing"
        >
          <GripVertical className="size-4" />
        </span>

        <button
          type="button"
          onClick={() => onToggle(task.id)}
          aria-pressed={task.completed}
          aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
          className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition-smooth  cursor-pointer ${task.completed
            ? "border-transparent bg-gradient-primary text-primary-foreground border-none"
            : "border-border text-transparent hover:border-primary"
            }`}
        >
          <Check className={`size-3.5 transition-smooth ${task.completed ? "scale-100" : "scale-0"}`} />
        </button>

        <p
          onClick={() => onToggle(task.id)}
          className={`min-w-0 flex-1 break-words text-[0.975rem] leading-snug transition-smooth ${task.completed ? "text-muted-foreground line-through" : "text-foreground"
            }`}
        >
          {task.title}
        </p>

        <button
          type="button"
          onClick={handleDelete}
          aria-label="Delete task"
          className="rounded-xl p-2 text-muted-foreground opacity-0 transition-smooth hover:bg-destructive/10 hover:text-destructive focus:opacity-100 group-hover:opacity-100 cursor-pointer"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </li>
  );
});
