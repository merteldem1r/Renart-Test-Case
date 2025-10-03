import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";

const LandingLayout: React.FC = () => {
  return (
    <div className="page">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingLayout;
