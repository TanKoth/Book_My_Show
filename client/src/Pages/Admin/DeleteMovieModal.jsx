import { Modal, message } from "antd";
import { deleteMovie } from "../../api/movie";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const DeleteMovieModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedMovie,
  setSelectedMovie,
  getData,
}) => {
  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      dispatch(ShowLoading());
      const movieId = selectedMovie._id;
      const response = await deleteMovie({ movieId });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      setSelectedMovie(null);
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
    setSelectedMovie(null);
  };

  return (
    <Modal
      title="Delete Movie?"
      open={isDeleteModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="pt-3 fs-18">Are you sure you want to delete this movie?</p>
      <p className="pb-3 fs-18">
        This action cant be undone and you will lose this movie data.
      </p>
    </Modal>
  );
};

export default DeleteMovieModal;
