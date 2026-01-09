import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase, supabaseConfigError } from "./supabaseClient.js";

const parseHashParams = (hash) => {
  const normalized = hash.startsWith("#") ? hash.slice(1) : hash;
  return new URLSearchParams(normalized);
};

const AuthCallback = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Completing sign-in...");

  useEffect(() => {
    if (supabaseConfigError) {
      setMessage(supabaseConfigError);
      return;
    }

    let isMounted = true;

    const finishAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      try {
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (window.location.hash) {
          const hashParams = parseHashParams(window.location.hash);
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");

          if (accessToken && refreshToken) {
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            });
            if (error) throw error;
          }
        }

        if (isMounted) {
          navigate("/", { replace: true });
        }
      } catch (error) {
        if (isMounted) {
          setMessage(`Authentication failed: ${error?.message ?? "Unknown error"}`);
        }
      }
    };

    finishAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Auth Callback</h1>
      <p>{message}</p>
    </main>
  );
};

export default AuthCallback;
