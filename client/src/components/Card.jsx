import React from "react";

import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ id, url }) => (
  <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
    <img
      className="w-full h-auto object-cover rounded-xl"
      src={`https://thin-toes-shop.loca.lt/${url}`}
      alt={`image_${id + 1}`}
    />
    <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <p className="text-white text-sm">{`image_${id + 1}`}</p>
        </div>
        <button
          type="button"
          onClick={() =>
            downloadImage(id, `https://thin-toes-shop.loca.lt/${url}`)
          }
          className="outline-none bg-transparent border-none"
        >
          <img
            src={download}
            alt="download"
            className="w-6 h-6 object-contain invert"
          />
        </button>
      </div>
    </div>
  </div>
);

export default Card;
