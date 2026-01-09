import { Link, Route, Routes } from "react-router-dom";
import AuthCallback from "./AuthCallback.jsx";
import { supabaseConfigError } from "./supabaseClient.js";

const MissingConfig = () => (
  <main style={{ padding: "2rem", fontFamily: "system-ui", color: "#b91c1c" }}>
    <h1>Configuration Error</h1>
    <p>{supabaseConfigError}</p>
    <p>
      Define these values in your Cloudflare Pages environment variables and rebuild.
    </p>
  </main>
);

const Home = () => (
  <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
    <h1>FAWN</h1>
    <p>Welcome to the app.</p>
    <p>
      <Link to="/auth/callback">Test auth callback route</Link>
    </p>
  </main>
);

const App = () => {
  if (supabaseConfigError) {
    return <MissingConfig />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
  );
};

export default App;
