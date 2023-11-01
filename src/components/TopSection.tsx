import Link from "next/link";

const TopSection = () => {
  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')]">
      <div className="w-1/2 bg-red-600/75">
        <div className="h-40" />
        <div className="flex flex-none flex-row flex-wrap justify-center ">
          <div className="basis-3/4">
            <h1 className="text-start text-6xl font-semibold text-white ">
              Find the best HR solution with us
            </h1>
            <div className="h-4" />
            <h3 className="text-xl font-medium text-white">
              Some description text
            </h3>
            <div className="h-8" />
            <div className="">
              <Link
                href="/subpages/contact"
                className="block w-2/3 rounded-full px-2 py-2 text-center dark:border-gray-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-700 dark:hover:text-white"
              >
                HR support for employers
              </Link>
              <div className="h-4" />
              <Link
                href="/subpages/contact"
                className="block w-2/3 rounded-full px-2 py-2 text-center dark:border-gray-700 dark:bg-red-600 dark:text-white dark:hover:bg-red-700 dark:hover:text-white"
              >
                Registration for job seekers
              </Link>
            </div>
          </div>
        </div>
        <div className="h-32" />
      </div>
    </div>
  );
};

export default TopSection;
