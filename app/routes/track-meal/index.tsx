import NavBar from "~/components/navbar";
import Form from "~/components/Form";
import Input from "~/components/input";
import Button from "~/components/button";
import React, { useMemo } from "react";
import type { ChangeEvent } from "react";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { db } from "~/db.server";
import { useLoaderData } from "@remix-run/react";
import { User, Goal, Meal } from "@prisma/client";
import MealDetail from "~/components/MealDetail";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks";
import NewGoalForm from "~/components/NewGolForm";
import { useBoolean } from "ahooks";
import AddMeal from "~/components/AddMeal";

const searchClient = algoliasearch(
  "FC2H5CGRFB",
  "3c9d7e74814f6471750ddd155e1e67fd"
);

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
    where: { id: 1 },
    include: {
      meals: true,
      goals: {
        where: {
          expire: {
            gte: new Date().toISOString(),
          },
        },
      },
    },
  });

  return json(user);
};

const TrackMeal = () => {
  const [isOpen, { setTrue: openModal, setFalse: closeModal }] =
    useBoolean(false);
  const data = useLoaderData<User & { goals: Goal[]; meals: Meal[] }>();
  const hasActiveGoal = useMemo(
    () => data.goals.length > 0,
    [data.goals.length]
  );
  const hasMeals = useMemo(() => data.meals.length > 0, [data.meals.length]);

  return (
    <InstantSearch indexName="food_Macros" searchClient={searchClient}>
      <div className="flex flex-col bg-lightest items-center flex-grow p-8 pt-[68px]">
        <NavBar>
          <Button onClick={openModal} className="ml-auto flex-wrap">
            Agregar alimento
          </Button>
        </NavBar>
        <div className="mt-4">
          {!hasActiveGoal && <NewGoalForm id={data.id} />}
          {hasActiveGoal && (
            <div className="w-full flex-col items-center flex-grow max-w-5xl">
              {hasMeals && (
                <p className="font-bold text-xl font-popins flex w-full items-center justify-center">
                  Mis alimentos
                  <span className="font-light ml-2 ">
                    {new Date().toLocaleDateString("es-MX")}
                  </span>
                </p>
              )}
              {!hasMeals && (
                <p className="font-bold text-xl font-popins flex w-full items-center justify-center">
                  Hola {data.name} registra tu primer alimento del dia
                </p>
              )}
              {hasMeals && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 font-popins mt-8">
                  {data.meals.map((meal) => {
                    return (
                      <li className="w-full" key={meal.id}>
                        <MealDetail
                          carbs={meal.carbs}
                          fat={meal.grasa}
                          name={meal.alimento}
                          portion={meal.porcion}
                          protein={meal.proteina}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
              {!hasMeals && (
                <div className="w-2/3 md:w-1/3  mx-auto mt-4">
                  <img
                    src="/empty-image.jpg"
                    alt="Registra tu primer comida del dia"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <AddMeal isOpen={isOpen} onClose={closeModal} />
    </InstantSearch>
  );
};

export default TrackMeal;
