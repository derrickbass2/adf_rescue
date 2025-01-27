import React from "react";
import Hero from "../Hero";
import Process from "../Process";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-default">
      <Hero />
      <Process />
    </div>
  );
};

export default Home;
