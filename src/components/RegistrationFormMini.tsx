import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";
import type { RouterInputs } from "~/utils/api";
import router from "next/router";
import React from "react";

type RegistrationInput = RouterInputs["registration"]["create"];

const RegistrationFormMini: React.FC = () => {
  const [registration, setRegistration] = useState<RegistrationInput>({
    creator: "",
    firstname: "",
    lastname: "",
    phone: "",
    birthdate: "",
    nationality: "",
    address: "",
    gender: "",
    desiredOccupation: "",
    desiredLocation: "",
    desiredSalary: "",
    jobID: "",
    file: "",
  });

  return (
    <div className="px-12">
      <div>
        <h3 className="text-5xl font-medium text-white ">Quick Start</h3>
        <div className="h-4" />
        <p className="text-lg font-normal text-white">Some description text</p>
      </div>
      <div className="h-6" />
      <form>
        <div className="mb-3">
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <input
            type="firstName"
            id="firstName"
            className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
            required
          ></input>
        </div>
        <div className="mb-3">
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <input
            type="lastName"
            id="lastName"
            className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
            required
          ></input>
        </div>
        <div className="mb-3">
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <input
            type="phone"
            id="phone"
            className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
            required
          ></input>
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
            required
          ></input>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Register new account
        </button>
      </form>
    </div>
  );
};

export default RegistrationFormMini;
