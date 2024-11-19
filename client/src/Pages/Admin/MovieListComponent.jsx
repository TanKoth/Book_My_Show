import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import MovieForm from "./MovieForm";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../../api/movie";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteMovieModal from "./DeleteMovieModal";
import moment from "moment";

const MovieList = () => {
  // const fakeMovies = [
  //   {
  //     key: "1",
  //     name: "Inside Out 2",
  //     description: "Inside out 2",
  //     poster: "Image 1",
  //     duration: 120,
  //     genre: "Animation",
  //     language: "English",
  //     releaseDate: "2024-10-20",
  //   },
  //   {
  //     key: "1",
  //     name: "Avata 2",
  //     description: "Avatar 2",
  //     poster: "Image 1",
  //     duration: 120,
  //     genre: "Animation",
  //     language: "English",
  //     releaseDate: "2024-12-20",
  //   },
  // ];

  const getData = async () => {
    dispatch(ShowLoading());
    const response = await getAllMovies();
    if (response && response.success) {
      const allMovies = response.data;
      setMovies(
        allMovies.map((movie) => {
          return { ...movie, key: `${movie._id}` };
        })
      );
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const tableHeader = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => {
        return (
          <img
            height={"100px"}
            width={"100px"}
            style={{ objectFit: "cover" }}
            src={data.poster}
          />
        );
      },
    },
    { title: "Name", dataIndex: "name" },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => {
        return <div style={{ maxWidth: "20rem" }}>{text}</div>;
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => `${text} mins`,
    },
    { title: "Genre", dataIndex: "genre" },
    { title: "Language", dataIndex: "language" },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, data) => {
        return moment(data.releaseDate).format("MM-DD-YYYY");
      },
    },
    {
      title: "",
      render: (text, data) => {
        return (
          <div>
            <Button
              title="Edit"
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              title="Delete"
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="d-flex justiy-content-end">
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
          setFormType("add");
        }}
      >
        Add Movie
      </Button>
      <Table dataSource={movies} columns={tableHeader} />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
    </div>
  );
};

export default MovieList;
