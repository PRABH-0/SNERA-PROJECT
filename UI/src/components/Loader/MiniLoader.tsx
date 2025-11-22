import React, { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";

import loadingAnimation from "../../assets/animations/loading.json";

const MiniLoader:React.FC = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) lottieRef.current.setSpeed(2);
  }, []);

  return (
    <div className="  py-6 fixed inset-0 flex justify-center items-center bg-[rgba(0, 0, 0, 0.07)] z-[9999]">
      <Lottie 
        animationData={loadingAnimation}
        loop
        className="w-40 h-40"
        lottieRef={lottieRef}
      />
    </div>
  );
};

export default MiniLoader;
