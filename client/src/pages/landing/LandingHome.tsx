import Products from "./products/Products";
import AboutUs from "./sections/AboutUs";
import FAQ from "./sections/FAQ";

const LandingHome: React.FC = () => {
  return (
    <main className="flex flex-col">
      <AboutUs />
      <Products />
      <FAQ />
    </main>
  );
};

export default LandingHome;
