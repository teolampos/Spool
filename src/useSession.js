import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*IT IS CALLED WHEN A USER VISITS THE HOME/LOGIN OR REGISTER PAGE. THIS HOOK CHECKS IF THE
  USER HAS AUTHENTICATED BEFORE AND IF SO REDIRECT HIM TO TEH DASHBOARD
*/
export const useSession = () => {
  const navigator = useNavigate();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/auth`, {
      credentials: "include",
    })
      .then((resp) => {
        if (resp.ok) {
          resp.json().then((data) => {
            navigator(`/dashboard/${data.username}`);
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);
};
