import { useMemo } from "react";
import NavBar from "~/components/navbar";
import Whatsapp from "~/components/Whatsapp";
import contactList from "../nutricionist.json";
export default function Index() {
  const contact = useMemo(() => {
    return contactList[randomNumber(0, contactList.length)];
  }, []);
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
              <a
                target={"_blank"}
                href={getWhatsAppUrl(
                  `Hola Doctor, ${contact.name}. Me gustaría hacerle una consulta:`,
                  contact.phone
                )}
                rel={"noreferrer"}
                className="flex flex-col mt-4 justify-center items-center px-5 py-2 bg-primary-action text-white font-popins truncate border text-sm rounded-xl hover:bg-secondary"
              >
                <span> Panic button</span>
                <span>Press if you need help</span>
              </a>
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

function getWhatsAppUrl(text?: string, number = "") {
  const url = new URL(`https://wa.me/${number}`);
  if (text) {
    url.searchParams.set("text", text);
  }
  return url.toString();
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
