import { forwardRef, useState } from "react";
import { ITask } from "../../../utils/Task.type";
import { STATUS_TASK } from "../../../utils/Constants";
import TodoListItem from "./TodoListItem";
import ConfirmDialog from "../ConfirnDialog";

type DataProps = {
    updateNewTaskList: any;
    taskList: ITask[];
    onChangeStatus: any;
    onDeleteTask: any;
    onSaveEdit: any;
    handleOpenDeleteAll: any;
    handleOpenDeleteDone: any;
    open: any;
    typeDialog: any;
    handleCloseDialog: any;
    handeConfirmDialog: any;
};

const TodoList = forwardRef(
    (
        {
            taskList,
            onChangeStatus,
            onDeleteTask,
            onSaveEdit,
            updateNewTaskList,
            handleOpenDeleteAll,
            handleOpenDeleteDone,
            open,
            typeDialog,
            handleCloseDialog,
            handeConfirmDialog,
        }: DataProps,
        todoListItemRef
    ) => {
        const isHidden = taskList.length ? true : false;
        const isExistDone = taskList.some((task) => task.status === STATUS_TASK.DONE);

        return (
            <>
                <ul className="list-group mb-0" id="list">
                    {taskList &&
                        taskList
                            .map((task) => (
                                <TodoListItem
                                    key={task.id}
                                    task={task}
                                    onChangeStatus={onChangeStatus}
                                    onDeleteTask={onDeleteTask}
                                    onSaveEdit={onSaveEdit}
                                    ref={todoListItemRef}
                                />
                            ))
                            .reverse()}
                </ul>

                {isHidden ? (
                    <div className="row mt-4">
                        <div className="col-6">
                            <button
                                className="btn btn-danger btn-lg w-100"
                                onClick={handleOpenDeleteAll}
                            >
                                Delete all tasks
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                                className="btn btn-danger btn-lg w-100"
                                disabled={!isExistDone}
                                onClick={handleOpenDeleteDone}
                            >
                                Delete done tasks
                            </button>
                        </div>
                        <ConfirmDialog
                            open={open}
                            typeDialog={typeDialog}
                            handleCloseDialog={handleCloseDialog}
                            handeConfirmDialog={handeConfirmDialog}
                            updateNewTaskList={updateNewTaskList}
                        />
                    </div>
                ) : null}
            </>
        );
    }
);

export default TodoList;
