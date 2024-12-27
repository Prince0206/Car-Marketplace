import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex justify-between items-center shadow-sm p-5">
      <Link to={"/"}>
        <img src="/car-brands-logo.svg" width={100} height={90} />
      </Link>

      <ul className="hidden md:flex gap-16">
        <Link to={"/"}>
          <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
            Home
          </li>
        </Link>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Search
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          New
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Pre-Owned
        </li>
      </ul>

      {isSignedIn ? (
        <div className="flex items-center gap-5">
          <UserButton />
          <Link to={"/profile"}>
            <Button>Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <Button>Submit Listing</Button>
      )}
    </div>
  );
}

export default Header;
