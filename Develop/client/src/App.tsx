import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="text-white bg-black min-h-screen ">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
