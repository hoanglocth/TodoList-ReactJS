type DataProps = {
    newTaskString: string;
    onChange: any;
    onSubmit: any;
};

const TodoForm = ({ newTaskString, onChange, onSubmit }: DataProps) => {
    return (
        <div className="rounded-3 border border-2 border-gray mt-5 p-4 bg-white">
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text py-4 bg-primary">
                                <i className="fa-solid fa-book fa-xl text-white"></i>
                            </span>
                        </div>
                        <input
                            className="border-gray form-control"
                            placeholder="New Todo"
                            type="text"
                            name="text"
                            value={newTaskString}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button type="submit" className="btn btn-primary btn-lg w-100">
                            Add New Task
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;
