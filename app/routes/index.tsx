import NavBar from "~/components/navbar";

export default function Index() {
  return (
    <div className="flex flex-col justify-center flex-grow p-8 pt-[68px]">
      <NavBar />
      <div className="w-full flex flex-col max-w-7xl pt-4 justify-center items-center flex-grow">
        <div className="flex flex-col md:flex-row w-full flex-grow">
          <div className="flex flex-col md:flex-grow md:basis-1/3 md:justify-center md:mr-8 md:items-end">
            <h1 className="font-popins font-bold text-4xl md:text-5xl flex flex-col text-left">
              <span>Health Me</span>
              <span className="text-dark-gray font-popins text-lg font-normal">
                Stop feeling guilty for losing{" "}
                <br className="hidden md:block" /> weight
              </span>
            </h1>
          </div>
          <div className="md:flex-grow mt-16 md:mt-0 md:basis-2/3 flex justify-start">
            <img src="/ilus.svg" alt="" className="drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
