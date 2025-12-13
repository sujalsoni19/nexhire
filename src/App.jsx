import { Button } from "@/components/ui/button";
import "./App.css";
import { Header, Footer } from "../src/pages";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-grid min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
