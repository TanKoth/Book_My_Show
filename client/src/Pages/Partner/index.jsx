import TheaterList from "./TheaterList";
import { Tabs } from "antd";

const Partner = () => {
  const items = [
    {
      key: 1,
      label: "Theater",
      children: <TheaterList />,
    },
  ];

  return (
    <div>
      <h1>Partner Page</h1>
      <Tabs items={items} />
    </div>
  );
};

export default Partner;
