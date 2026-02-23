const { z } = require("zod");

const startSessionSchema = z.object({
  body: z.object({
    resourceId: z.string().min(1),
    customerId: z.string().optional(),
    seatCount: z.number().min(1).optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateSeatSchema = z.object({
  body: z.object({
    newSeatCount: z.number().min(1),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
  query: z.object({}).optional(),
});

const finishSessionSchema = z.object({
  body: z.object({
    discountCode: z.string().optional(),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
  query: z.object({}).optional(),
});

module.exports = {
  startSessionSchema,
  updateSeatSchema,
  finishSessionSchema,
};
