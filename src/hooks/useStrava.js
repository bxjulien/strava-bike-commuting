import { getAccessToken, getAthleteProfile } from "@/strava.api";
import { useEffect, useState } from "react";

const useStrava = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) getUser();
    else {
      if (window) {
        const url = new URL(window.location);
        const code = url.searchParams.get('code');
        if (code) {
          getAccessToken(code).then((auth) => {
            setUser(auth.athlete);
            // Cleanup URL
            window.history.replaceState({}, document.title || '', "/");
          });
        }
      }
    }
  }, []);

  const getUser = async () => {
    getAthleteProfile().then((profile) => {
      setUser(profile);
    });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresAt");
    setUser(null);
  };

  return { user, logout };
}

export default useStrava;