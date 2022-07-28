import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Input from "~/components/input";
import Button from "~/components/button";
export const action: ActionFunction = async ({ request }) => {
  // const prisma = new PrismaClient();
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  if (!name || !email) {
    return json({ error: "email and name are required fields" });
  }
  // const user = await prisma.user
  //   .create({
  //     data: {
  //       email,
  //       name,
  //     },
  //   })
  //   .then(async (user) => {
  //     await prisma.$disconnect();
  //     return user;
  //   })
  //   .catch(async (e) => {
  //     console.error(e);
  //     await prisma.$disconnect();
  //     return json({ error: e });
  //   });
  // return user;
};

// export const loader: LoaderFunction = async () => {
//   // const prisma = new PrismaClient();
//   // return json(await prisma.user.findMany());
// };
export default function Index() {
  return (
    <div className="flex flex-col flex-grow pt-8">
      <Form method="post">
        <fieldset>
          <div className="flex flex-col">
            <Input placeholder="Name" />
          </div>
        </fieldset>
        <Button>Submit</Button>
      </Form>
    </div>
  );
}
