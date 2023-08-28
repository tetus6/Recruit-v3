import Link from "next/link";
import router from "next/router";
import React, { useState } from "react";
import { api, type RouterInputs } from "~/utils/api";

export type Jobsinput = RouterInputs["jobs"]["create"];

const JobsPage = () => {
  const [jobs, setJobs] = useState<Jobsinput>({
    creator: "",
    name: "",
    type: "",
    company: "",
    location: "",
    salary: "",
    detail: "",
    requirement: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const jobsMutation = api.jobs.create.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
        jobsMutation.mutate(jobs);
    } catch (error) {
        console.log(error);
    }finally {
        await router.push('/');
        setSubmitting(false);
        // add some message to indicate successfulness of creation
    }
  };

  return (
    <div>
      <div className="h-8"></div>
      <div className="px-8 grid grid-cols-2">
        <form className="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="jobTitle"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Job Title
            </label>
            <input
              id="jobTitle"
              value={jobs.name}
              onChange={(e) => setJobs({ ...jobs, name: e.target.value })}
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
              required
            ></input>
          </div>
          <div className="mb-3">
            <label
              htmlFor="type"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <input
              id="type"
              value={jobs.type}
              onChange={(e) => setJobs({ ...jobs, type: e.target.value })}
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
              required
            ></input>
          </div>
          <div className="mb-3">
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Company
            </label>
            <input
              id="company"
              value={jobs.company}
              onChange={(e) => setJobs({ ...jobs, company: e.target.value })}
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
              required
            ></input>
          </div>
          <div className="mb-3">
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Location
            </label>
            <textarea
              id="location"
              value={jobs.location}
              onChange={(e) => setJobs({ ...jobs, location: e.target.value })}
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label
              htmlFor="salary"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Salary
            </label>
            <input
              id="salary"
              value={jobs.salary}
              onChange={(e) => setJobs({ ...jobs, salary: e.target.value })}
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
              required
            ></input>
          </div>
          <div className="mb-3">
            <label
              htmlFor="detail"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Detail
            </label>
            <textarea
              id="detail"
              value={jobs.detail}
              onChange={(e) => setJobs({ ...jobs, detail: e.target.value })}
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              htmlFor="requirement"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Requirement
            </label>
            <textarea
              id="requirement"
              value={jobs.requirement}
              onChange={(e) =>
                setJobs({ ...jobs, requirement: e.target.value })
              }
              className="dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500"
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-red-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              {submitting ? "Creating Job" : "Create Job"}
            </button>
            <Link
              href="/"
              className="rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobsPage;
