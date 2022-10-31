import React from "react";
import Lottie from "react-lottie";
import Loading from "../../public/loading.json";

export default function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="block mx-auto">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}
