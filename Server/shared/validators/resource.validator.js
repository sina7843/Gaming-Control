const { z } = require("zod");

const createResourceSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    resourceTypeId: z.string().min(1),
    capacity: z.number().min(1).optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

module.exports = {
  createResourceSchema,
};
