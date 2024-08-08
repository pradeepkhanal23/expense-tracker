import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [user, setUser] = useState({});
  //fetching the user data
  const { loading, data } = useQuery(GET_ME);

  // fetch the user details on component render
  useEffect(() => {
    if (data && data.me) {
      setUser(data.me);
    }
  }, [data]);

  if (loading) {
    return (
      <>
        <h1>Loading..</h1>
      </>
    );
  }

  return (
    <>
      {user && (
        <>
          <p>Welcome, {user.username}!!</p>
        </>
      )}
    </>
  );
};
export default Dashboard;
