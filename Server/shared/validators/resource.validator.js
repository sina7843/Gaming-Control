const { z } = require("zod");
const ResourceType = require("../../modules/resource/domain/resourceType.enum");

const createResourceSchema = z.object({
  body: z.object({
    name: z.string().min(1, "name is required"),
    resourceType: z.enum(Object.values(ResourceType)),
    capacity: z.number().int().min(1, "capacity must be >= 1"),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

module.exports = {
  createResourceSchema,
};
