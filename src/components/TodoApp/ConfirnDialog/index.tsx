import { Button, Modal } from "react-bootstrap";

type DataProps = {
    updateNewTaskList: any;
    open: boolean;
    handleCloseDialog: any;
    typeDialog: string;
    handeConfirmDialog: any;
};

const ConfirmDialog = ({ open, handleCloseDialog, handeConfirmDialog }: DataProps) => {
    return (
        <Modal show={open} onHide={handleCloseDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center gap-1">
                    <Button variant="danger" onClick={handleCloseDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handeConfirmDialog}>
                        Yes
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmDialog;
