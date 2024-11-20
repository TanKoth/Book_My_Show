import { useEffect, useState } from "react";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Table, message, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TheaterFormModal from "./TheaterFormModal";
import DeleteTheaterModal from "./DeleteTheaterModal";
import { getAllTheatres } from "../../api/theater";
import ShowModal from "./ShowModal";

const TheaterList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [formType, setFormType] = useState("add");
  const [theaters, setTheaters] = useState([]);

  const getData = async () => {
    dispatch(ShowLoading());
    try {
      const response = await getAllTheatres(user._id);
      if (response.success) {
        const allTheatres = response.data;
        setTheaters(
          allTheatres.map(function (item) {
            return { ...item, key: `theatre-${item._id}` };
          })
        );
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      dispatch(HideLoading());
      message.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      render: (text, data) => {
        if (data.isActive) {
          return "Approved";
        } else {
          return "Pending/Blocked";
        }
      },
    },
    {
      title: "",
      render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedTheater(data);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedTheater(data);
              }}
            >
              <DeleteOutlined />
            </Button>
            {data.isActive && (
              <Button
                style={{ marginLeft: "20px" }}
                type="primary"
                onClick={() => {
                  setIsShowModalOpen(true);
                  setSelectedTheater(data);
                }}
              >
                Add Shows
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="d-flex justify-content-end">
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
          setFormType("add");
        }}
      >
        Add Theaters
      </Button>
      <Table dataSource={theaters} columns={columns} />
      {isModalOpen && (
        <TheaterFormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedTheater={selectedTheater}
          setSelectedTheater={setSelectedTheater}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteTheaterModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedTheater={selectedTheater}
          setSelectedTheater={setSelectedTheater}
          getData={getData}
        />
      )}
      {isShowModalOpen && (
        <ShowModal
          isShowModalOpen={isShowModalOpen}
          setIsShowModalOpen={setIsShowModalOpen}
          selectedTheater={selectedTheater}
        />
      )}
    </div>
  );
};

export default TheaterList;
