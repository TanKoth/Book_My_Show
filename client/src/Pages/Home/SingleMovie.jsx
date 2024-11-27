import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../api/movie";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { message, Input, Divider, Row, Col } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import { getAlltheatersByMovie } from "../../api/show";

const SingleMovie = () => {
  const params = useParams();
  const [movie, setMovie] = useState();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [theaters, settheaters] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDate = (e) => {
    setDate(moment(e.target.value).format("YYYY-MM-DD"));
    navigate(`/movie/${params.id}?date=${e.target.value}`);
  };

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getMovieById(params.id);
      console.log("MovieById", response);

      if (response && response.success) {
        setMovie(response.data);
        console.log("movie", movie);
      } else {
        message.error(response?.message || "Failed to fetch movie data");
      }
      dispatch(HideLoading());
    } catch (error) {
      console.log(error);
      message.error("An error occurred while fetching movie data");
      dispatch(HideLoading());
    }
  };

  const getAlltheaters = async () => {
    console.log("fetching theaters");
    try {
      dispatch(ShowLoading());
      const response = await getAlltheatersByMovie(params.id, date);
      console.log("AllTheatersByMovie", response);
      if (response && response.success) {
        settheaters(response.data);
      } else {
        message.error(response?.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      console.log(err);
      message.error("An error occurred while fetching theaters");
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, [params.id]);

  useEffect(() => {
    getAlltheaters();
  }, [date]);

  return (
    <>
      <div className="inner-container">
        {movie && (
          <div
            className="d-flex single-movie-div"
            style={{ marginTop: "2rem" }}
          >
            <div className="flex-Shrink-0 me-3 single-movie-img">
              <img width={150} alt="Movie Poster" src={movie.poster} />
            </div>
            <div className="w-100">
              <h1 className="mt-0">{movie.name}</h1>
              <p className="movie-data">
                Language: <span>{movie.language}</span>
              </p>
              <p className="movie-data">
                Genre: <span>{movie.genre}</span>
              </p>
              <p className="movie-data">
                Release Date:{" "}
                <span>{moment(movie.date).format("YYYY-MM-DD")}</span>
              </p>
              <p className="movie-data">
                Duration: <span>{movie.duration} Minutes</span>
              </p>
              <hr />
              <div className="d-flex flex-column-mob align-items-center mt-3">
                <label className="me-3 flex-shrink-0">Choose the date:</label>
                <Input
                  type="date"
                  className="max-width-300 mt-8px-mob"
                  placeholder="default size"
                  prefix={<CalendarOutlined />}
                  onChange={handleDate}
                  value={date}
                />
              </div>
            </div>
          </div>
        )}
        {theaters.length == 0 && (
          <div className="pt-3">
            <h2 className="blue-clr">
              Currently, no theaters available for this movie!
            </h2>
          </div>
        )}

        {theaters.length > 0 && (
          <div className="theater-wrapper mt-3 pt-3">
            <h2>theaters</h2>
            {theaters.map((theater) => {
              return (
                <div key={theater._id}>
                  <Row gutter={24}>
                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                      <h3>{theater.name}</h3>
                      <p>{theater.address}</p>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                      <ul className="show-ul">
                        {theater.shows
                          .sort(
                            (a, b) =>
                              moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                          )
                          .map((singleShow) => {
                            return (
                              <li
                                key={singleShow._id}
                                onClick={() => {
                                  navigate(`/bookShow/${singleShow._id}`);
                                }}
                              >
                                {moment(singleShow.time, "HH:mm").format(
                                  "hh:mm A"
                                )}
                              </li>
                            );
                          })}
                      </ul>
                    </Col>
                  </Row>
                  <Divider />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
export default SingleMovie;
