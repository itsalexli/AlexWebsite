import React from "react";
import VantaFog from "./VantaFog";
import Info from "./info";

const HomePage: React.FC = () => {
  return (
    <div>
      <VantaFog></VantaFog>
      <div>
        <Info />
      </div>
    </div>
  );
};

export default HomePage;
