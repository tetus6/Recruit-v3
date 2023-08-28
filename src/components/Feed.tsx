import Link from "next/link";
import React from "react";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

type JobsInput = RouterOutputs["jobs"]["create"];


const Feed = () => {
  // const { registration } = api.registration.fetch.useQuery();

  const jobCardsQuery = api.jobs.fetch.useQuery();
  const jobCardsData = jobCardsQuery.data;

  return (
    <div className="mx-8">
      <div className="h-12"/>
      <div>
        <h3 className="text-center text-5xl font-semibold text-white">Recent Jobs Openening</h3>
      </div>
      <div className="h-12"/>
      <div className="grid grid-cols-3 gap-8">
      {jobCardsData?.map((item, index) => (
        <JobCard
          key={index}
          id = {item.id}
          creator={item.creator}
          name={item.name}
          type={item.type}
          company={item.company}
          location={item.location}
          salary={item.salary}
          detail={item.detail}
          requirement={item.requirement}
        />
      ))}
      </div>
      
    </div>
  );
};

const JobCard: React.FC<JobsInput> = (data) => {
  return (
    <div className="">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
        <a href="#">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.name}
          </h5>
        </a>
        <div className="h-2"/>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-start" >
          Company: {data.company}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-start">
          Salary: {data.salary} THB
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-start">
          Location: {data.location} 
        </p>
        <div className="h-4"/>
        <Link
          href={`/subpages/cardDetail/${data.id}`}
          className="inline-flex items-center rounded-lg bg-red-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Learn more
          <svg
            className="ml-2 h-3.5 w-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Feed;
