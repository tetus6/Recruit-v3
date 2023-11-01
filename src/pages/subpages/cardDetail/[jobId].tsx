import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

export type CardDetail = RouterOutputs["jobs"]["create"];

const CardDetail = () => {
  const router = useRouter();
  const { jobId } = router.query;
  const cardDetailQuery = api.jobs.fetchById.useQuery(jobId);
  const cardDetailQueryOutput = cardDetailQuery.data;
  // fix jobId is undefined in initial refreshes

  if (cardDetailQueryOutput) {
    return (
      <div>
        <div className="h-8" />
        <div className="mx-20 flex h-60 items-center justify-center bg-red-600 bg-opacity-75">
          <h3 className="text-center text-5xl font-semibold text-white">
            Job Details
          </h3>
        </div>
        <div className="h-8" />
        <div className="mx-20 rounded-md border-2 border-white p-8">
          <div className="grid grid-cols-4">
            <p className="col-span-1 text-xl font-medium text-white">
              Job Title:
            </p>
            <p className="col-span-3 text-xl font-normal text-white">
              {cardDetailQueryOutput.name}
            </p>
            <div className="h-4" />
          </div>
          <div className="grid grid-cols-4">
            <p className="col-span-1 text-xl font-medium text-white">Type:</p>
            <p className="col-span-3 text-xl font-normal text-white">
              {cardDetailQueryOutput.type}
            </p>
            <div className="h-4" />
          </div>
          <div className="grid grid-cols-4">
            <p className="col-span-1 text-xl font-medium text-white">
              Company:
            </p>
            <p className="col-span-3 text-xl font-normal text-white">
              {cardDetailQueryOutput.company}
            </p>
            <div className="h-4" />
          </div>
          <div className="grid grid-cols-4">
            <p className="col-span-1 text-xl font-medium text-white">
              Location:
            </p>
            <p className="col-span-3 text-xl font-normal text-white">
              {cardDetailQueryOutput.location}
            </p>
            <div className="h-4" />
          </div>
          <div className="grid grid-cols-4">
            <p className="col-span-1 text-xl font-medium text-white">Salary:</p>
            <p className="col-span-3 text-xl font-normal text-white">
              {cardDetailQueryOutput.salary}
            </p>
            <div className="h-4" />
          </div>
          <div className="grid grid-cols-4">
            <p className="col-span-1 text-xl font-medium text-white">Detail:</p>
            <p className="col-span-3 text-xl font-normal text-white">
              {cardDetailQueryOutput.detail}
            </p>
            <div className="h-4" />
          </div>
          <div className="grid grid-cols-4">
            <p className="col-span-1 text-xl font-medium text-white">
              Requirement:
            </p>
            <p className="col-span-3 text-xl font-normal text-white">
              {cardDetailQueryOutput.requirement}
            </p>
            <div className="h-4" />
          </div>
        </div>
        <div className="mx-20 mt-8 pb-20 grid grid-cols-6 gap-4">
          <div className="" />
          <Link
          href={`/main-navigation/application/${jobId}`}
            className="col-start-5 rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Apply now
          </Link>
          <Link
            href="/"
            className="rounded-full bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Cancel
          </Link>
        </div>
      </div>
    );
  }
};

export default CardDetail;
