import React from "react";
import { Tabs } from "antd";
import TheatersTable from "./TheatersTable";
import MovieList from "./MovieListComponent";

const Admin = () => {
  const tabItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Theaters",
      children: <TheatersTable />,
    },
  ];

  return (
    <div>
      <h1>Admin Page</h1>
      <Tabs items={tabItems} />
    </div>
  );
};

export default Admin;
