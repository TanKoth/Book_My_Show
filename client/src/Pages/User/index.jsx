import React from "react";
import Bookings from "./Bookings";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";

const Profile = () => {
  const { loading } = useSelector((state) => state.loader);
  return (
    <div>
      <Bookings />
    </div>
  );
};

export default Profile;
