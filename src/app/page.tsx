import React from "react";
import VantaFog from "./VantaFog";
import Info from "./info";
import ProjectsShowcase from "./projects";
const HomePage: React.FC = () => {
  return (
    <div>
      <VantaFog></VantaFog>
      <div>
        <Info />
      </div>
      {/* <ProjectsShowcase /> */}
    </div>
  );
};

export default HomePage;
