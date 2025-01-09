
import { selectTasks, updateFilter } from "@/redux/features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import TaskCard from "./components/TaskCard";
import { AddTaskModal } from "./components/AddTaskModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";


const Tasks = () => {
    const tasks = useAppSelector(selectTasks);
    const dispatch = useAppDispatch()

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-left">Tasks</h2>
                <div className="flex space-x-4 items-center">
                    <Tabs defaultValue="all" className="">
                        <TabsList>
                            <TabsTrigger onClick={() => dispatch(updateFilter("all"))} value="all">All</TabsTrigger>
                            <TabsTrigger onClick={() => dispatch(updateFilter("low"))} value="low">Low</TabsTrigger>
                            <TabsTrigger onClick={() => dispatch(updateFilter("medium"))} value="medium">Medium</TabsTrigger>
                            <TabsTrigger onClick={() => dispatch(updateFilter("high"))} value="high">High</TabsTrigger>
                        </TabsList>

                    </Tabs>
                    <AddTaskModal />
                </div>
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
