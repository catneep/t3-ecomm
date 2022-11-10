import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

import type IProduct from "../../models/IProduct";

// Gets all the rows within a table
const products = async (req: NextApiRequest, res: NextApiResponse) => {
  // Uses endpoint from server/trpc/router
  const data = await prisma.product.findMany();

  // Formats as reponse, and binds data to body
  res.status(200).json(data);
};

export default products;
