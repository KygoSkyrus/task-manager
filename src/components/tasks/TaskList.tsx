import { memo, useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";
import { ListChecks } from "lucide-react";
import { useTasks } from "@/context/TaskContext";
import { TaskItem } from "./TaskItem";

function EmptyState({ filter }: { filter: string }) {
  const copy =
    filter === "completed"
      ? "Nothing completed yet — small steps count."
      : filter === "pending"
        ? "All clear. Nothing pending right now."
        : "Your list is quiet. Add your first task above.";
  return (
    <div className="animate-task-in rounded-2xl border border-dashed border-border bg-card/40 px-6 py-14 text-center">
      <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
        <ListChecks className="size-6" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{copy}</p>
    </div>
  );
}

export const TaskList = memo(function TaskList() {
  const { tasks, visibleTasks, filter, hydrated, toggleTask, deleteTask, reorderTasks } = useTasks();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;
      if (!destination || destination.index === source.index) return;
      const target = visibleTasks[destination.index];
      const targetIndex = target ? tasks.findIndex((t) => t.id === target.id) : tasks.length - 1;
      reorderTasks(draggableId, targetIndex);
    },
    [visibleTasks, tasks, reorderTasks],
  );

  if (!hydrated || !mounted) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-14 animate-pulse rounded-2xl bg-card/50" />
        ))}
      </div>
    );
  }

  if (visibleTasks.length === 0) return <EmptyState filter={filter} />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps} className="m-0 p-0">
            {visibleTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(dragProvided, snapshot) => (
                  <div ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
                    <TaskItem
                      task={task}
                      isDragging={snapshot.isDragging}
                      dragHandleProps={
                        (dragProvided.dragHandleProps as unknown as Record<string, unknown>) ??
                        undefined
                      }
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
});
