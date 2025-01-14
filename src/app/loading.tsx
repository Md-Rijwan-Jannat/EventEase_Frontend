import React from "react";
import Loader from "../components/ui/loader/loader";

export default function loading() {
  return (
    <div className="flex h-screen justify-center items-center text-3xl">
      <Loader />
    </div>
  );
}
