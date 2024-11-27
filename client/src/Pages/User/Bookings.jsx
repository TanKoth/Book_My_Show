import { Button, Card, Col, Row, message } from "antd";
import { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { getAllBookings } from "../../api/booking";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.loader);

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllBookings({ userId: user._id });
      console.log("Booking Response:", response);
      if (response.success) {
        setBookings(response.data);
        console.log(response.data);
      } else {
        message.error(response.message);
      }

      dispatch(HideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {bookings && (
        <Row gutter={24}>
          {bookings.map((booking) => {
            return (
              <Col key={booking._id} xs={{ span: 24 }} lg={{ span: 12 }}>
                <Card className="mb-3">
                  <div className="d-flex flex-column-mob">
                    <div className="flex-shrink-0">
                      <img
                        src={booking.show.movie.poster}
                        width={100}
                        alt="Movie Poster"
                      />
                    </div>
                    <div className="show-details flex-1">
                      <h3 className="mt-0 mb-0">{booking.show.movie.name}</h3>
                      <p>
                        Theater: <b>{booking.show.theater.name}</b>
                      </p>
                      <p>
                        Seats: <b>{booking.seats.join(", ")}</b>
                      </p>
                      <p>
                        Date & Time:{" "}
                        <b>
                          {moment(booking.show.date).format("MMM Do YYYY")}{" "}
                          {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                        </b>{" "}
                      </p>
                      <p>
                        Amount:{" "}
                        <b>Rs.{booking.seats.length * booking.show.price} </b>
                      </p>
                      <p>
                        Booking ID: <b>{booking.transactionId} </b>
                      </p>
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {loading ? (
        <div style={{ textAlign: "center" }}>
          <FadeLoader height={40} radius={20} width={10} />
        </div>
      ) : (
        !bookings.length && (
          <div className="text-center pt-3">
            <h1>You have not booked any show yet!</h1>
            <Link to="/">
              <Button type="primary">Start Booking</Button>
            </Link>
          </div>
        )
      )}
    </>
  );
};
export default Bookings;
