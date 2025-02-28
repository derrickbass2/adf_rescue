import React from "react";
import Hero from "../Hero";
import Process from "../Process";
import './index.css';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-default">
      <Hero />
      <Process />
    </div>
  );
};

export default Home;
