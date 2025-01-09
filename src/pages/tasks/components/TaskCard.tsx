import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ITask } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, TrashIcon } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { deleteTask, toggoleCompleteState } from "@/redux/features/task/taskSlice";
import { cn } from "@/lib/utils";
import { EditTaskModal } from "./EditTaskModal";
import { format } from "date-fns";


interface TaskCardProps {
    task: ITask;

}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const { id, title, description, dueDate, isCompleted, priority } = task;

    console.log("dueDate", typeof (dueDate))

    const dispatch = useAppDispatch();
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState<boolean>(false);

    return (
        <Card className="relative overflow-hidden shadow-md transition-transform hover:shadow-lg border border-gray-200 rounded-md">

            <div
                className={`absolute top-0 left-0 h-full w-2 ${priority === "high"
                    ? "bg-red-500"
                    : priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
            />


            <div className="flex justify-between items-center p-4">

                <div className="flex items-start gap-4">
                    <div className="text-left">
                        <h3
                            className={cn("text-lg font-semibold", isCompleted && "line-through")}
                        >{title}</h3>
                        Due: {dueDate ? format(new Date(dueDate), "MMM d, yyyy") : "Not set"}
                    </div>
                </div>


                <div className="flex items-center justify-center space-x-3">
                    <button
                        onClick={() => dispatch(deleteTask(id))}
                        className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-all"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                    <button>
                        <div className="flex items-center justify-center">
                            <Checkbox
                                onClick={() => dispatch(toggoleCompleteState(id))}
                                checked={isCompleted}
                                className="mr-2 h-5 w-5 border-gray-300 focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </button>
                    <button
                        onClick={() => setIsEditTaskModalOpen(true)}
                    >
                        <Edit className="h-5 w-5" />
                    </button>
                    <EditTaskModal task={task}
                        open={isEditTaskModalOpen}
                        onOpenChange={setIsEditTaskModalOpen}
                    />
                </div>

            </div>




            <div className="p-4 space-y-2 text-left">
                <p className="text-sm">{description}</p>
                <p
                    className={`text-xs font-semibold inline-block px-2 py-1 rounded ${isCompleted ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                        }`}
                >
                    {isCompleted ? "Completed" : "Pending"}
                </p>
                <p
                    className={`ml-2 text-xs font-semibold inline-block px-2 py-1 rounded ${priority === "high"
                        ? "bg-red-100 text-red-500"
                        : priority === "medium"
                            ? "bg-yellow-100 text-yellow-500"
                            : "bg-blue-100 text-blue-500"
                        }`}
                >
                    Priority: {priority}
                </p>
            </div>
        </Card>
    );
};

export default TaskCard;
