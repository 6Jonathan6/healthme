import { FunctionComponent } from "react";
export type Meal = {
  name: string;
  portion: string | number;
  protein: string | number;
  fat: string | number;
  carbs: string | number;
};
const MealDetail: FunctionComponent<Meal> = ({
  name,
  carbs,
  fat,
  portion,
  protein,
}) => {
  return (
    <div className="max-w-xl w-full rounded shadow-lg bg-white p-4">
      <ul>
        <li>
          <p className="flex w-full items-center justify-between">
            Alimento: <span className="font-semibold ml-4">{name}</span>
          </p>
          <p className="text-sm mt-2 flex w-full items-center justify-between">
            Porción: <span className="font-semibold ml-4">{portion} gr</span>
          </p>
        </li>
        <ul className="flex flex-col gap-y-2 gap-x-2 mt-4">
          <li className="w-full flex justify-between gap-2">
            Proteína:{" "}
            <span className="font-bold tabular-nums text-sm	">{protein} gr</span>
          </li>

          <li className="w-full flex justify-between gap-2">
            Grasa:{" "}
            <span className="font-bold tabular-nums text-sm	">{fat} gr</span>
          </li>
          <li className="w-full flex flex-nowrap justify-between gap-4">
            Carbohidratos:{" "}
            <span className="font-bold tabular-nums text-sm flex-nowrap	">
              {carbs} gr
            </span>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default MealDetail;
