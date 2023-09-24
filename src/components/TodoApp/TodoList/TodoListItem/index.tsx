import { forwardRef, useImperativeHandle, useState } from "react";
import { ITask } from "../../../../utils/Task.type";

type DataProps = {
    task: ITask;
    onChangeStatus: any;
    onDeleteTask: any;
    onSaveEdit: any;
};

const TodoListItem = forwardRef(
    ({ task, onChangeStatus, onDeleteTask, onSaveEdit }: DataProps, ref) => {
        const [editable, setEditable] = useState(false);
        const [itemText, setItemText] = useState(task.text);

        useImperativeHandle(ref, () => ({
            handleEdit,
        }));

        const styleTodoItem = {
            color: task.status === true ? "red" : "black",
            textDecoration: task.status === true ? "line-through" : "unset",
        };

        const handleEdit = () => {
            // task.status === STATUS_TASK.ACTIVE && setEditable(!editable);
            setEditable(!editable);
        };

        const onChange = (e: any) => {
            setItemText(e.target.value);
        };

        return (
            <li className="rounded-3 border border-2 border-gray mt-4 p-3 bg-white d-flex justify-content-between align-items-center">
                {!editable ? (
                    <>
                        <div className="d-flex align-items-center">
                            <label
                                className="form-check-label"
                                id="todo-item"
                                style={styleTodoItem}
                            >
                                {task.text}
                            </label>
                        </div>
                        <div className="d-flex align-items-center">
                            <input
                                type="checkbox"
                                className="form-check-input me-3"
                                checked={!!task.status}
                                onChange={() => onChangeStatus(task)}
                            />
                            <i
                                className="form-check-input border-0 fa fa-pen fa-xl h-100 me-3 text-warning"
                                onClick={handleEdit}
                            />
                            <i
                                className="form-check-input border-0 fa fa-trash fa-xl h-100 text-danger"
                                onClick={() => onDeleteTask(task.id)}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <form
                            className="d-flex justify-content-between align-items-center w-100"
                            onSubmit={(e) => onSaveEdit(e, task)}
                        >
                            <div className="d-flex align-items-center">
                                <input
                                    className="form-check-label"
                                    type="text"
                                    name="text"
                                    value={itemText}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <i
                                    className="form-check-input border-0 fa fa-xmark fa-xl me-3 h-100 text-danger"
                                    onClick={handleEdit}
                                />
                                <button
                                    type="submit"
                                    className="form-check-input border-0 fa fa-check fa-xl h-100 text-danger"
                                />
                            </div>
                        </form>
                    </>
                )}
            </li>
        );
    }
);

export default TodoListItem;
