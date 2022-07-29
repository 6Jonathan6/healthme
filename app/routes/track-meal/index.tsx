import NavBar from "~/components/navbar";
import Form from "~/components/Form";
import Input from "~/components/input";
import Button from "~/components/button";
import React, { useMemo } from "react";
import type { ChangeEvent } from "react";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { db } from "~/db.server";
import { useLoaderData } from "@remix-run/react";
import { Prisma, User, Goal, Meal } from "@prisma/client";

const DEFAULT_USER = 3;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const timeZone = formData.get("timeZone");
  const expireDate = formData.get("expire");
  const protein = formData.get("protein");
  const carbs = formData.get("carbs");
  const fat = formData.get("fat");
  const userId = formData.get("userId");
  if (!expireDate || !timeZone || !protein || !carbs || !fat || !userId)
    return null;
  const date = new Date(expireDate.toString());
  date.setHours(date.getHours() - Number(timeZone));
  const response = await db.goal
    .create({
      data: {
        carbs: carbs.toString(),
        expire: date.toISOString(),
        grasa: fat.toString(),
        proteina: protein.toString(),
        userId: Number(userId),
      },
    })
    .catch((e) => console.log(e));
  console.log("Response", response);
  return null;
};

export const loader: LoaderFunction = async () => {
  const user = await db.user.findUnique({
    where: { id: DEFAULT_USER },
    include: {
      meals: true,
      goals: {
        where: {
          expire: {
            gte: new Date().toISOString(),
          },
        },
        orderBy: {
          expire: "desc",
        },
      },
    },
  });
  if (!user) return null;
  return json(user);
};

const TrackMeal = () => {
  const data = useLoaderData<User & { goals: Goal[]; meals: Meal[] }>();
  const minDate = new Date().toISOString().split("T")[0];
  const hasMeals = useMemo(() => data.goals.length > 0, [data.goals.length]);

  const [weight, setWeigth] = React.useState("");
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);
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
        {!hasMeals && (
          <Form method="post">
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
              <div>
                <label htmlFor="expiredDate" className="font-popins mb-2 block">
                  Expira
                </label>
                <Input
                  name="expire"
                  type="date"
                  id="expiredDate"
                  defaultValue={expirationDate.toISOString().split("T")[0]}
                  min={minDate}
                />
                <input
                  type={"hidden"}
                  name="timeZone"
                  value={(-1 * new Date().getTimezoneOffset()) / 60}
                />
                <input type={"hidden"} name="protein" value={protein} />
                <input type={"hidden"} name="carbs" value={carbs} />
                <input type={"hidden"} name="fat" value={fat} />
                <input type={"hidden"} name="userId" value={data.id} />
              </div>
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
        )}
      </div>
    </div>
  );
};

export default TrackMeal;
