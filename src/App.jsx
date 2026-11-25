import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Onboarding from "./components/Onboarding";
import Home from "./pages/Home";
import CheckIn from "./pages/CheckIn";
import History from "./pages/History";
import Support from "./pages/Support";
import Bookmarks from "./pages/Bookmarks";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";

function isOnboarded() {
  try {
    return localStorage.getItem("emocheck_onboarded") === "yes";
  } catch {
    return true;
  }
}

export default function App() {
  const [onboarded, setOnboarded] = useState(isOnboarded());

  function finish() {
    try {
      localStorage.setItem("emocheck_onboarded", "yes");
    } catch {
      // ignore storage errors
    }
    setOnboarded(true);
  }

  if (!onboarded) {
    return <Onboarding onDone={finish} />;
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/history" element={<History />} />
          <Route path="/support" element={<Support />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </>
  );
}
