import { useEffect, useState } from "react";
import { getAllMovies } from "../../api/movie";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { message, Input, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllMovies();
      if (response && response.success) {
        const allMovies = response.data;
        console.log("allMovies", allMovies);
        setMovies(allMovies);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <Row className="justify-content-center w-100">
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input
            placeholder="Search Movies"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          ></Input>
          <br />
          <br />
          <br />
          <br />
        </Col>
      </Row>
      <Row
        className="justify-content-center"
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        {movies &&
          movies.length > 0 &&
          movies
            .filter((movie) =>
              movie.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((movie) => (
              <Col
                className="m-5"
                key={movie._id}
                span={{ xs: 24, sm: 24, md: 12, lg: 10 }}
              >
                <div className="text-center  cursor-pointer">
                  <img
                    src={movie.poster}
                    alt={movie.name}
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                    width={200}
                    height={300}
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                  />
                  <h3
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                  >
                    {movie.name}
                  </h3>
                </div>
              </Col>
            ))}
      </Row>
    </div>
  );
};

export default Home;
