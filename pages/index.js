import Journal from "../components/Journal";
import userContext from "../components/UserContext";
import { useContext, useEffect } from "react";

const Home = ({ userId }) => {
  const { setUser, user } = useContext(userContext);
  useEffect(() => {
    // console.log("enter useeffect home");
    const updateProvider = async () => {
      if (userId && !user) {
        await setUser(userId);
        // console.log("set user effect");
      }
    };
    updateProvider();
  }, []);

  return <Journal />;
};

export default Home;

Home.getInitialProps = async ({ query }) => {
  // console.log("-----------------home query------------- =", query);
  // console.log("query =", query);
  return query;
};
