import React from "react";
import { BiArrowToRight, BiShoppingBag } from "react-icons/bi";

function Home() {
  return (
    <div className="flex items-center flex-col">
      <span className="border shadow-sm duration-200 transition-all hover:shadow-orange-400 hover border-orange-600 px-3 py-1 bg-orange-400/30 rounded-full">
        No. 1 Online Shopping Platform
      </span>
      <div className="flex gap-3 h-[400px] flex-col">
        <div className="mt-10 text-center">
          <h1 className="font-bold text-4xl mb-2">
            Quick Buy — Shop in Seconds, <br />
            Not Hours
          </h1>
          <p className="text-zinc-400 mb-2">
            Because time is precious, and so is your shopping <br /> experience.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-orange-500 px-3 py-1 rounded-md text-black">
            Start shopping <BiShoppingBag size={20} />{" "}
          </button>
          <button className="flex items-center gap-2 bg-white px-3 py-1 rounded-md text-black">
            Browse details <BiArrowToRight size={20} />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
