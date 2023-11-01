import React from "react";

const contact = () => {
  return (
    <div>
      <div className="h-8" />
      <div className="mx-20 flex h-60 items-center justify-center bg-red-600 bg-opacity-75">
        <h3 className="text-center text-5xl font-semibold text-white">
          Contact Us
        </h3>
      </div>
      <div className="h-12" />
      <div className="mx-20 grid grid-cols-5">
        <div className="col-span-2 border-r-2 border-white">
        <div className="h-4" />
          <h5 className="col-span-1 text-3xl font-medium text-white">
            Recruit Thailand
          </h5>
          <div className="h-8" />
          <p className="col-span-1 text-xl font-normal text-white">
            some details
          </p>
          <div className="h-8" />
          <p className="col-span-1 text-xl font-normal text-white">
            TEL: +669-000-0000
          </p>
          <p className="col-span-1 text-xl font-normal text-white">
            Email: contact@recruit.co.th
          </p>
          <div className="h-8" />
          <p className="col-span-1 text-xl font-medium text-white">
            Opening date and hours
          </p>
          <p className="col-span-1 text-xl font-normal text-white">
            Mon - Fri, 9:00 - 18:00
          </p>
          <div className="h-4" />
        </div>
        <div className="col-span-3">

        </div>
      </div>
      <div className="h-20" />
    </div>
  );
};

export default contact;
