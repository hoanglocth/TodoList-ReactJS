import { useRef, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../../utils/Common";
import { ITask } from "../../utils/Task.type";
import { NAME_LOCAL_STORAGE, STATUS_TASK, TYPE_DIALOG } from "../../utils/Constants";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

const TodoApp = () => {
    const [taskList, setTaskList] = useState<ITask[]>(getLocalStorage(NAME_LOCAL_STORAGE) || []);
    const [newTaskString, setNewTaskString] = useState("");
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [typeDialog, setTypeDialog] = useState("");

    const todoListItemRef = useRef<any>();

    /**
     * Update list Task in local storage and taskList
     * @param newTaskList
     */
    const updateNewTaskList = (newTaskList: ITask[]) => {
        setLocalStorage(NAME_LOCAL_STORAGE, newTaskList);
        setTaskList(getLocalStorage(NAME_LOCAL_STORAGE));
    };

    const onChangeNewTask = (e: any) => {
        setNewTaskString(e.target.value);
    };

    const clearInput = () => {
        setNewTaskString("");
    };

    /**
     * Add object task with props id, text, status from input to task list array
     * Clear input after submit
     * @param e
     */
    const handleSubmitAddTask = (e: any) => {
        e.preventDefault();

        const dataSubmit = {
            id: uuidv4(),
            text: e.target.text.value,
            status: STATUS_TASK.ACTIVE,
        };

        updateNewTaskList([...(taskList || []), dataSubmit]);

        clearInput();
    };

    /**
     * Delete task by id
     * Update new task list
     * @param id
     * @returns
     */
    const handleDeleteTask = (id: string | undefined) => {
        if (!id) return;

        const newList = taskList.filter((task) => task.id !== id);

        updateNewTaskList(newList);
    };

    /**
     * Toggle task status to done/active then replace task in list
     * Update new task list
     * @param task
     * @returns
     */
    const handleChangeStatus = (task: ITask) => {
        if (!task) return;

        const index = taskList.findIndex((ele) => ele.id === task.id);

        task.status = !task.status;

        taskList.splice(index, 1, task);

        updateNewTaskList(taskList);
    };

    /**
     * Set text value from edit field to task them replace task in list
     * Update new task list
     * @param e
     * @param task
     * @returns
     */
    const handleSaveEdit = (e: any, task: ITask) => {
        e.preventDefault();
        if (!task.id) return;

        const index = taskList.findIndex((ele) => ele.id === task.id);

        task.text = e.target.text.value;

        taskList.splice(index, 1, task);

        updateNewTaskList(taskList);

        todoListItemRef.current.handleEdit();
    };

    //Handle todolist component
    const handleOpenDeleteDone = () => {
        setTypeDialog(TYPE_DIALOG.DELETE_DONE_TASK);
        setIsOpenDialog(true);
    };

    const handleOpenDeleteAll = () => {
        setTypeDialog(TYPE_DIALOG.DELETE_ALL_TASK);
        setIsOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setIsOpenDialog(false);
    };

    const handeConfirmDialog = () => {
        if (typeDialog === TYPE_DIALOG.DELETE_DONE_TASK) {
            removeTaskDone(STATUS_TASK.DONE);
        } else if (typeDialog === TYPE_DIALOG.DELETE_ALL_TASK) {
            removeAllTask();
        }
        handleCloseDialog();
    };

    const removeAllTask = () => {
        const newTask: ITask[] = [];
        updateNewTaskList(newTask);
    };

    const removeTaskDone = (statusDone: boolean) => {
        const newTask: ITask[] = getLocalStorage(NAME_LOCAL_STORAGE).filter(
            (task: ITask) => task.status !== statusDone
        );
        updateNewTaskList(newTask);
    };

    return (
        <section className="container-fluid">
            <TodoForm
                onSubmit={handleSubmitAddTask}
                newTaskString={newTaskString}
                onChange={onChangeNewTask}
            />
            <TodoList
                updateNewTaskList={updateNewTaskList}
                taskList={taskList}
                onChangeStatus={handleChangeStatus}
                onDeleteTask={handleDeleteTask}
                onSaveEdit={handleSaveEdit}
                ref={todoListItemRef}
                handleOpenDeleteAll={handleOpenDeleteAll}
                handleOpenDeleteDone={handleOpenDeleteDone}
                open={isOpenDialog}
                typeDialog={typeDialog}
                handleCloseDialog={handleCloseDialog}
                handeConfirmDialog={handeConfirmDialog}
            />
        </section>
    );
};

export default TodoApp;
