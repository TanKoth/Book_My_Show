import {
  Col,
  Modal,
  Row,
  Form,
  Input,
  Button,
  Select,
  Table,
  message,
} from "antd";

import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
// import { useSelector } from 'react-redux';
import { getAllMovies } from "../../api/movie";
import {
  addShow,
  deleteShow,
  getShowsByTheater,
  updateShow,
} from "../../api/show";
import moment from "moment";

const ShowModal = ({
  isShowModalOpen,
  setIsShowModalOpen,
  selectedTheater,
}) => {
  const [view, setView] = useState("table"); // vew can be table, add, edit
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [shows, setShows] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const movieResponse = await getAllMovies();
      if (movieResponse.success) {
        setMovies(movieResponse.data);
      } else {
        message.error(movieResponse.message);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  const fetchShows = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getShowsByTheater(selectedTheater._id);
      console.log("Showresponse", response);
      if (response.success) {
        setShows(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (selectedTheater) {
      fetchShows();
    }
  }, []);

  const onFinish = async (values) => {
    console.log("values", values);
    try {
      dispatch(ShowLoading());
      let response = null;
      if (view === "add") {
        response = await addShow({ ...values, theaterId: selectedTheater._id });
      } else {
        // console.log(view, selectedTheater, selectedTheater._id);
        console.log("selectedShow", selectedShow);
        response = await updateShow({
          ...values,
          showId: selectedShow._id,
          theaterId: selectedTheater._id,
        });
      }
      if (response.success) {
        getData();
        message.success(response.message);
        setView("table");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(HideLoading());
    }
  };

  const handleCancel = () => {
    setIsShowModalOpen(false);
  };

  const handleDelete = async (showId) => {
    console.log("showId", showId);
    try {
      dispatch(ShowLoading());
      const response = await deleteShow({ showId: showId });
      console.log("DeleteResponse", response);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(HideLoading());
    }
  };

  const columns = [
    {
      title: "Show Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Show Date",
      dataIndex: "date",
      render: (text) => {
        return moment(text).format("MMM Do YYYY");
      },
    },
    {
      title: "Show Time",
      dataIndex: "time",
      render: (text) => {
        return moment(text, "HH:mm").format("hh:mm A");
      },
    },
    {
      title: "Movie",
      dataIndex: "movie",
      render: (text, data) => {
        return data.movie ? data.movie.name : "N/A";
      },
    },
    {
      title: "Ticket Price",
      dataIndex: "price",
      key: "ticketPrice",
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
      key: "totalSeats",
    },
    {
      title: "Available Seats",
      dataIndex: "seats",
      render: (text, data) => {
        return data.totalSeats - data.bookedSeats.length;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            <Button
              onClick={() => {
                setView("edit");
                setSelectedMovie(data);
                setSelectedShow({
                  ...data,
                  date: moment(data.date).format("YYYY-MM-DD"),
                });
                console.log(selectedMovie && selectedMovie.title);
              }}
            >
              <EditOutlined />
            </Button>
            <Button onClick={() => handleDelete(data._id)}>
              <DeleteOutlined />
            </Button>
            {data.isActive && (
              <Button
                onClick={() => {
                  setIsShowModalOpen(true);
                }}
              >
                + Shows
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      centered
      title={selectedTheater ? selectedTheater.name : "Loading...."}
      open={isShowModalOpen}
      onCancel={handleCancel}
      width={1200}
      footer={null}
    >
      <div className="d-flex justify-content-between">
        <h3>
          {view === "table"
            ? "List of Shows"
            : view === "add"
            ? "Add Show"
            : "Edit Show"}
        </h3>
        {view === "table" && (
          <Button type="primary" onClick={() => setView("add")}>
            Add Show
          </Button>
        )}
      </div>
      {view === "table" && <Table dataSource={shows} columns={columns} />}

      {(view === "add" || view === "edit") && (
        <Form
          className=""
          layout="vertical"
          style={{ width: "100%" }}
          defaultValue={view === "edit" ? selectedShow : null}
          onFinish={onFinish}
        >
          <Row
            gutter={{
              xs: 6,
              sm: 10,
              md: 12,
              lg: 16,
            }}
          >
            <Col span={24}>
              <Row
                gutter={{
                  xs: 6,
                  sm: 10,
                  md: 12,
                  lg: 16,
                }}
              >
                <Col span={8}>
                  <Form.Item
                    label="Show Name"
                    htmlFor="name"
                    name="name"
                    className="d-block"
                    rules={[
                      { required: true, message: "Show name is required!" },
                    ]}
                  >
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter the show name"
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Show Date"
                    htmlFor="date"
                    name="date"
                    className="d-block"
                    rules={[
                      { required: true, message: "Show date is required!" },
                    ]}
                  >
                    <Input
                      id="date"
                      type="date"
                      placeholder="Enter the show date"
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Show Timing"
                    htmlFor="time"
                    name="time"
                    className="d-block"
                    rules={[
                      { required: true, message: "Show time is required!" },
                    ]}
                  >
                    <Input
                      id="time"
                      type="time"
                      placeholder="Enter the show date"
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row
                gutter={{
                  xs: 6,
                  sm: 10,
                  md: 12,
                  lg: 16,
                }}
              >
                <Col span={8}>
                  <Form.Item
                    label="Select the Movie"
                    htmlFor="movie"
                    name="movie"
                    className="d-block"
                    rules={[{ required: true, message: "Movie  is required!" }]}
                  >
                    <Select
                      id="movie"
                      placeholder="Select Movie"
                      defaultValue={selectedMovie && selectedMovie.name}
                      style={{ width: "100%", height: "45px" }}
                      options={movies.map((movie) => ({
                        key: movie._id,
                        value: movie.name,
                        label: movie.title,
                      }))}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Ticket Price"
                    htmlFor="price"
                    name="price"
                    className="d-block"
                    rules={[
                      { required: true, message: "Ticket price is required!" },
                    ]}
                  >
                    <Input
                      id="ticketPrice"
                      type="number"
                      placeholder="Enter the ticket price"
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Total Seats"
                    htmlFor="totalSeats"
                    name="totalSeats"
                    className="d-block"
                    rules={[
                      { required: true, message: "Total seats are required!" },
                    ]}
                  >
                    <Input
                      id="totalSeats"
                      type="number"
                      placeholder="Enter the number of total seats"
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="d-flex gap-10">
            <Button
              className=""
              block
              onClick={() => {
                setView("table");
              }}
              htmlType="button"
            >
              <ArrowLeftOutlined /> Go Back
            </Button>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              {view === "add" ? "Add the Show" : "Edit the Show"}
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default ShowModal;
