import createPrismaMock from "prisma-mock";

let client;

beforeEach(() => {
  client = createPrismaMock();
});
