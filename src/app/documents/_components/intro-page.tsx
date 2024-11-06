import Image from "next/image";
import React from "react";

const IntroPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>IntroPage</h1>
      <Image src="/hero.gif" alt="hero" width={300} height={300} />
    </div>
  );
};

export default IntroPage;
