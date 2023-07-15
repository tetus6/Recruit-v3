import Feed from "~/components/Feed";
import TopSection from "~/components/TopSection";


export default function Home() {
  return (<>
    <section>
      <TopSection/>  
    </section>
    <div className="h-6"/>
    <section className="flex flex-row h-96 w-full">
      <div className="row-auto w-2/3">
      </div>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 row-auto w-1/3 rounded-lg" />
    </section>
    <section className="relative w-full flex-center flex-col">
      <Feed />
    </section>
  </>);
}
