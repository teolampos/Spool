import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*IT IS CALLED WHEN A USER VISITS THE HOME/LOGIN OR REGISTER PAGE. THIS HOOK CHECKS IF THE
  USER HAS AUTHENTICATED BEFORE AND IF SO REDIRECT HIM TO TEH DASHBOARD
*/
export const useSession = () => {
  const navigator = useNavigate();
  const auth = async () => {
    try {
      const resp = await fetch(`${process.env.REACT_APP_SERVER_API}/auth`, {
        credentials: "include",
      });
      if (resp.ok) {
        const data = await resp.json();
        navigator(`dashboard/${data.username}`);
      } else {
        throw new Error("Not logged in");
      }
    } catch (err) {
      window.alert(err);
    }

    useEffect(() => {
      auth();
    }, []);
  };
};
