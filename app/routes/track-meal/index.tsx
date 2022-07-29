import NavBar from "~/components/navbar";
import Form from "~/components/Form";
import Input from "~/components/input";
import Button from "~/components/button";
import React, { useMemo } from "react";
import type { ChangeEvent } from "react";

const TrackMeal = () => {
  const [weight, setWeigth] = React.useState("");

  const calories = useMemo(() => {
    if (isNaN(Number(weight))) return 0;
    const number = Number(weight);
    const calories = 22 * number;
    return Math.max(calories, 1600);
  }, [weight]);

  const protein = useMemo(() => {
    if (isNaN(Number(weight))) return 0;
    const number = Number(weight);
    const protein = Math.ceil(2.4 * number);
    return Math.min(protein, 200);
  }, [weight]);

  const fat = useMemo(() => {
    if (!weight || isNaN(Number(weight))) return 0;
    return Math.ceil(0.66 * Number(weight));
  }, [weight]);

  const carbs = useMemo(() => {
    if (!protein || !weight || !calories || !fat) return 0;
    const result = (calories - protein * 4 - fat * 9) / 4;

    return Math.round(result);
  }, [calories, fat, protein, weight]);

  return (
    <div className="flex flex-col items-center flex-grow p-8 pt-[68px]">
      <NavBar />
      <div className="mt-4">
        <Form>
          <p className="mt-4 text-xl font-semibold">
            Calculemos tus requerimientos
          </p>
          <div className="mt-4 flex flex-col gap-4">
            <Input
              placeholder="Peso (kg)"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWeigth(e.target.value)
              }
              inputMode="numeric"
            />
          </div>
          <ul className="flex items-center gap-3 justify-center w-full mt-8 font-popins">
            <li>
              <p className="font-semibold text-gray-1 text-sm">Proteína</p>
              <p className="text-sm mt-2">{protein} gr</p>
            </li>
            <li>
              <p className="font-semibold text-gray-1 text-sm">Carbs.</p>
              <p className="text-sm mt-2">{carbs} gr</p>
            </li>
            <li>
              <p className="font-semibold text-gray-1 text-sm">Grasas</p>
              <p className="text-sm mt-2">{fat} gr</p>
            </li>
          </ul>
          <Button className="mt-8 w-full">Guardar objetivos</Button>
        </Form>
      </div>
    </div>
  );
};

export default TrackMeal;
