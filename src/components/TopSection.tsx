import Link from "next/link";

const TopSection = () => {
  return (
    <div className="relative w-full h-full">
      {/* <img
        src="assets/images/espresso.jpg"
        alt="espresso"
        className="w-full"
      /> */}
      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
        <div className="h-full bg-white w-5/12">
          <div className="h-full flex flex-row justify-center">
            <div className="h-full flex flex-col w-3/4 justify-evenly">
              <div>
                <h1 className="text-4xl font-bold">
                  Find the best HR solution with us
                </h1>
                <div className="h-4"/>
                <p className="text-base font-normal">
                  Some description explaining the point stated above
                </p>
              </div>
              <div>
                <Link href="/subpages/hr-support" className="black_btn h-10 w-2/3">
                  HR support for employers
                </Link>
                <div className="h-3"/>
                {/* <Link href="/subpages/registration" className="black_btn h-10 w-2/3">
                  Registration for jobseekers
                </Link> */}
                <Link href="/main-navigation/registration-page" className="black_btn h-10 w-2/3">
                  Registration Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
