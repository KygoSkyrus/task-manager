import { TaskProvider, useTasks } from "@/context/TaskContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { TaskForm } from "@/components/tasks/TaskForm";
import { FilterBar } from "@/components/tasks/FilterBar";
import { TaskList } from "@/components/tasks/TaskList";
import { ThemeToggle } from "@/components/tasks/ThemeToggle";

function Progress() {
  const { counts } = useTasks();
  const pct = counts.all === 0 ? 0 : Math.round((counts.completed / counts.all) * 100);
  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between text-sm text-muted-foreground">
        <span>
          {counts.pending} pending · {counts.completed} done
        </span>
        <span className="font-semibold text-foreground">{pct}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-primary transition-smooth"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
          <header className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                Focus, gently
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
                Serene Tasks
              </h1>
              <div className="-mt-1">
                <span className='text-[10px] text-muted-foreground'>by</span>&nbsp;
                <a href="https://dheerajgupta.web.app" target="_blank" rel="noopener noreferrer" className='text-[14px] text-muted-foreground underline text-transparent bg-clip-text bg-gradient-to-r from-[#7b4397] via-pink-500 to-[#dc2430]' >
                  Dheeraj Gupta
                </a>
              </div>
            </div>
            <ThemeToggle />
          </header>

          <section className="glass-panel mt-8 rounded-3xl border border-border p-4 sm:p-6">
            <TaskForm />
            <Progress />
          </section>

          <section className="mt-6">
            <FilterBar />
            <div className="mt-5">
              <TaskList />
            </div>
          </section>

          <footer className="mt-12 text-center text-xs text-muted-foreground">
            Saved locally on this device · drag the handle to reorder
          </footer>
        </main>
      </TaskProvider>
    </ThemeProvider>
  );
}
