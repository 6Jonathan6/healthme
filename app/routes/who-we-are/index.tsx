export default function Index() {
  return (
    <div className="flex flex-col items-center flex-grow p-8 bg-lightest">
      <h1 className="font-popins font-bold w-full text-center text-2xl">
        Who we are?
      </h1>
      <ul className="grid  mt-8 md:grid-cols-2 gap-4  ">
        <li className="rounded w-80 bg-white p-4 flex flex-col items-center shadow-sm">
          <div className="w-28 h-w-28 rounded-full flex flex-col items-center overflow-hidden">
            <img src="/team/dan.jpg" alt="" />
          </div>
          <p className="font-bold mt-4 text-xl text-center">
            Daniel Martin
            <br />
            del Campo
          </p>
          <p className="font-semibold  text-xl  mt-4">Mexico</p>
          <p className="mt-4 text-base text-center">
            Passionate digital marketers, entrepreneurs, I enjoy working out and
            being healthy, love traveling and meeting new people.
          </p>
        </li>
        <li className="rounded w-80 bg-white p-4 flex flex-col items-center shadow-sm">
          <div className="w-28 h-w-28 rounded-full flex flex-col items-center overflow-hidden">
            <img src="/team/edna.jpg" alt="" />
          </div>
          <p className="font-bold mt-4 text-xl text-center">
            Edna Rosales <br />
            Valdez
          </p>
          <p className="font-semibold  text-xl  mt-4">Mexico</p>
          <p className="mt-4 text-base text-center">
            Passionate about technology, love traveling, love sports like
            swimming and cycling being with my friends.
          </p>
        </li>
        <li className="rounded w-80 bg-white p-4 flex flex-col items-center shadow-sm">
          <div className="w-28 h-w-28 rounded-full flex flex-col items-center overflow-hidden">
            <img src="/team/sthephano.jpg" alt="" />
          </div>
          <p className="font-bold mt-4 text-xl text-center">
            Stephano Carlo Palomino Madueño
          </p>
          <p className="font-semibold mt-4 text-xl">Perú</p>
          <p className="mt-4 text-base text-center">
            Passionate about Legaltech and legal innovation. Want to create more
            human centric legal services. Love to travel and play the piano.
          </p>
        </li>
        <li className="rounded w-80 bg-white p-4 flex flex-col items-center shadow-sm">
          <div className="w-28 h-w-28 rounded-full flex flex-col items-center overflow-hidden">
            <img src="/team/jon.jpg" alt="" />
          </div>
          <p className="font-bold mt-4 text-xl text-center">
            Jonathan Perez <br />
            Rodriguez
          </p>
          <p className="font-semibold mt-4 text-xl">Mexico</p>
          <p className="mt-4 text-base text-center">
            Frontend developer, passionate in develop interfaces with
            vuejs,react and javascript.
          </p>
        </li>
      </ul>
    </div>
  );
}
