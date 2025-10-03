import AboutUs from "./sections/AboutUs";
import FAQ from "./sections/FAQ";

import Pricing from "./sections/Pricing";

const LandingHome: React.FC = () => {
  return (
    <main className="flex flex-col gap-[50px]">
      <AboutUs />
      <Pricing />
      <FAQ />
    </main>
  );
};

export default LandingHome;
