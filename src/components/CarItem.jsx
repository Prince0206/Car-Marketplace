import React from "react";
import { Separator } from "./ui/separator";
import { LuFuel } from "react-icons/lu";
import { SlSpeedometer } from "react-icons/sl";
import { GiGearStickPattern } from "react-icons/gi";
import { IoMdOpen } from "react-icons/io";
import { Link } from "react-router-dom";

function CarItem({ car }) {
  return (
    <Link to={'/listing-details/'+car?.id}>
    <div className="rounded-xl bg-white border hover:shadow-md cursor-pointer ">
      <h2 className="absolute m-2 bg-green-500 px-2 rounded-full text-sm pb-1 text-white">
        New
      </h2>
      <img
        src={car?.images[0]?.imageUrl}
        width={"100%"}
        height={250}
        className="rounded-t-xl h-[180px] object-cover"
        alt="Car"
      />
      <div className="p-4">
        <h2 className="font-bold text-black text-lg mb-2">
          {car?.listingTitle}
        </h2>
        <Separator />
        <div className="grid md:grid-cols-3 mt-5">
          <div className="flex flex-col items-center">
            <LuFuel className="text-lg mb-2" />
            <h2>{car?.mileage}Miles</h2>
          </div>
          <div className="flex flex-col items-center">
            <SlSpeedometer className="text-lg mb-2" />
            <h2>{car?.fueltype}</h2>
          </div>
          <div className="flex flex-col items-center">
            <GiGearStickPattern className="text-lg mb-2" />
            <h2>{car?.transmission}</h2>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">${car?.sellingPrice}</h2>
          <h2 className="text-primary text-sm flex gap-2 items-center">
            {""}
            View Details <IoMdOpen />
          </h2>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default CarItem;
