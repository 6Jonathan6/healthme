import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const prisma = new PrismaClient();
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  if (!name || !email) {
    return json({ error: "email and name are required fields" });
  }
  const user = await prisma.user
    .create({
      data: {
        email,
        name,
      },
    })
    .then(async (user) => {
      await prisma.$disconnect();
      return user;
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      return json({ error: e });
    });
  return user;
};

export const loader: LoaderFunction = async () => {
  const prisma = new PrismaClient();
  return json(await prisma.user.findMany());
};
export default function Index() {
  const data = useLoaderData<User[]>();
  return (
    <div className="flex flex-col flex-grow">
      <Form method="post">
        <fieldset>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
            <label htmlFor="name" className="mt-4">
              name
            </label>
          </div>
          <input name="name" />
        </fieldset>
        <button>Submit</button>
      </Form>

      <ul className="mt-8">
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
