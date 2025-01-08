
import { selectTasks } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hook";
import TaskCard from "./components/TaskCard";
import { AddTaskModal } from "./components/AddTaskModal";


const Tasks = () => {
    const tasks = useAppSelector(selectTasks);

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-left">Tasks</h2>
                <AddTaskModal />
            </div>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                    />
                ))
            ) : (
                <p className="text-gray-500">No tasks available.</p>
            )}
        </div>
    );
};

export default Tasks;
