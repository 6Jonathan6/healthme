import { Dialog, Combobox } from "@headlessui/react";
import { FunctionComponent, useState } from "react";
import { useConnector, useHits, useSearchBox } from "react-instantsearch-hooks";
import connectAutocomplete from "instantsearch.js/es/connectors/autocomplete/connectAutocomplete";
import Form from "./Form";
import Input from "./input";

function useAutocomplete(props?: any) {
  return useConnector(connectAutocomplete, props);
}

type Props = {
  onClose: () => void;
  isOpen: boolean;
};
const AddMeal: FunctionComponent<Props> = ({ onClose, isOpen }) => {
  const { refine } = useSearchBox();
  const { hits } = useHits();
  console.log(hits);
  const [selectedOption, setSelectedOption] = useState();
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Overlay
        className={"fixed top-0 left-0 h-screen right-0 z-50 bg-black/25"}
      ></Dialog.Overlay>
      <Dialog.Panel
        className={
          "fixed top-1/2 transform -translate-y-1/2 mx-auto left-0 right-0 z-50 max-w-lg"
        }
      >
        <Form action="new-meal" className="bg-white shadow-xl">
          <p className="mt-4 text-xl font-semibold">Registrar alimento</p>
          <div className="mt-4 flex flex-col gap-4">
            <div className="relative">
              <Combobox value={selectedOption} onChange={setSelectedOption}>
                <label className="border rounded-xl p-4 border-gray-1 flex focus-within:border-primary-action">
                  <Combobox.Input
                    className="text-sm focus:outline-none focus:border-none font-popins bg-transparent placeholder:text-gray-1"
                    placeholder="Busca tu alimento por nombre"
                    onChange={(event) => refine(event.target.value)}
                  />
                </label>
                <Combobox.Options
                  className={
                    "absolute top-full w-full max-h-[150px] overflow-y-auto p-4  mt-2 bg-white shadow-xl "
                  }
                >
                  {hits.map((hit) => (
                    <Combobox.Option
                      className={
                        "flex items-center justify-start text-xs p-2 hover:bg-lightest cursor-pointer font-popins"
                      }
                      key={hit.objectID}
                      value={hit}
                    >
                      <span>{`${hit.alimento} Carbs( ${hit.carbs}gr ), Grasa( ${hit.grasa}gr ), Proteína(v${hit.proteina} gr)`}</span>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox>
            </div>
            date String alimento String porcion String calorias String proteina
            String carbs String grasa String
            <div>
              <Input placeholder="Alimento" />
            </div>
            <div>
              <Input placeholder="Proteina" />
            </div>
            <div>
              <Input placeholder="Carbohidratos" />
            </div>
            <div>
              <Input placeholder="Grasa" />
            </div>
          </div>
        </Form>
      </Dialog.Panel>
    </Dialog>
  );
};

export default AddMeal;
