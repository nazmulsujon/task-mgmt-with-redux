import React from "react";
import { Card } from "@/components/ui/card";
import { ITask } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { TrashIcon } from "lucide-react";

interface TaskCardProps {
    task: ITask;

}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const { title, description, dueData, isCompleted, priority } = task;

    return (
        <Card className="relative overflow-hidden shadow-md transition-transform hover:shadow-lg border border-gray-200 rounded-md">

            <div
                className={`absolute top-0 left-0 h-full w-2 ${priority === "High"
                    ? "bg-red-500"
                    : priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
            />


            <div className="flex justify-between items-center p-4">

                <div className="flex items-start gap-4">
                    <div className="text-left">
                        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                        <p className="text-sm text-gray-500">Due: {dueData}</p>
                    </div>
                </div>


                <div>
                    <button className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-all"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                    <button>
                        <Checkbox
                            checked={isCompleted}
                            className="h-5 w-5 border-gray-300 focus:ring-2 focus:ring-green-500"
                        />
                    </button>
                </div>
            </div>




            <div className="p-4 space-y-2 text-left">
                <p className="text-sm text-gray-700">{description}</p>
                <p
                    className={`text-xs font-semibold inline-block px-2 py-1 rounded ${isCompleted ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                        }`}
                >
                    {isCompleted ? "Completed" : "Pending"}
                </p>
                <p
                    className={`ml-2 text-xs font-semibold inline-block px-2 py-1 rounded ${priority === "High"
                        ? "bg-red-100 text-red-500"
                        : priority === "Medium"
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
