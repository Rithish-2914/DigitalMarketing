import { z } from "zod";
import { insertGenerationSchema, generations } from "./schema";

export const api = {
  generations: {
    list: {
      method: "GET" as const,
      path: "/api/generations",
      responses: {
        200: z.array(z.custom<typeof generations.$inferSelect>()),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/generations",
      input: insertGenerationSchema,
      responses: {
        201: z.custom<typeof generations.$inferSelect>(),
        500: z.object({ message: z.string() }),
      },
    },
    get: {
      method: "GET" as const,
      path: "/api/generations/:id",
      responses: {
        200: z.custom<typeof generations.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
};
