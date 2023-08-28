import Feed from "~/components/Feed";
import TopSection from "~/components/TopSection";
import RegistrationFormMini from "~/components/RegistrationFormMini";

export default function Home() {
  return (
    <>
      <section>
        <TopSection />
      </section>
      <div className="h-12" />
      <section className="flex w-full flex-row">
        <div className="row-auto w-2/3">
          <RegistrationFormMini />
        </div>
        <div className="row-auto w-1/3 mr-12 rounded-lg bg-gradient-to-r from-pink-600 to-red-700" />
      </section>
      <section className="flex-center relative w-full flex-col">
        <Feed />
      </section>
    </>
  );
}
