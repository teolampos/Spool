import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useSession = () => {
  const navigator = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/auth", {
      credentials: "include",
    })
      .then((resp) => {
        if (resp.ok) {
          resp.json().then((data) => {
            navigator(`/dashboard/${data.user.username}`);
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);
};
