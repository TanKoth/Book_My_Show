import { Modal, message } from "antd";
import { deleteTheater } from "../../api/theater";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const DeleteTheaterModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedTheater,
  setSelectedTheater,
  getData,
}) => {
  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      dispatch(ShowLoading());
      const theaterId = selectedTheater._id;
      const response = await deleteTheater({ theaterId });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      setSelectedTheater(null);
      setIsDeleteModalOpen(false);
      dispatch(HideLoading());
    } catch (err) {
      dispatch(HideLoading());
      setIsDeleteModalOpen(false);
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTheater(null);
  };

  return (
    <Modal
      title="Delete Theater?"
      open={isDeleteModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="pt-3 fs-18">
        Are you sure you want to delete this theater?
      </p>
      <p className="pb-3 fs-18">
        This action cant be undone and you will lose this theater data.
      </p>
    </Modal>
  );
};

export default DeleteTheaterModal;
