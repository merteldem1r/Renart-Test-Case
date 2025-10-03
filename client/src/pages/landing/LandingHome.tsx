import AboutUs from "./sections/AboutUs";
import FAQ from "./sections/FAQ";

const LandingHome: React.FC = () => {
  return (
    <main className="flex flex-col gap-[50px]">
      <AboutUs />
      <FAQ />
    </main>
  );
};

export default LandingHome;
