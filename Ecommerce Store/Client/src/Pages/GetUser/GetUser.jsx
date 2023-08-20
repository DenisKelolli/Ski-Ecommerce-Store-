import React, { useEffect, useState } from "react";
import axios from "axios";

const GetUser = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Fetch user details
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/getuser`,
          {
            withCredentials: true,
          }
        );

        console.log("Response:", response.data);

        if (response.data && response.data.username) {
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {username ? (
        <div>
          <h1>Username: {username}</h1>
        </div>
      ) : (
        <h1>Loading user...</h1>
      )}
    </div>
  );
};

export default GetUser;
