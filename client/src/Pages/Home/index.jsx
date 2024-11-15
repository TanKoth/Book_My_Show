import { useEffect } from "react";
import { GetCurrentUser } from "../../api/User";

const Home = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const response = await GetCurrentUser();
      console.log("response", response);
    };
    fetchUser();
  }, []);

  return <div>Home</div>;
};

export default Home;
