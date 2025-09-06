import z from "zod";

const regex_id = /^\d+$/;

const userIdParamSchema = z.object({
  id: z.string()
    .regex(regex_id, "ID must be a number")
    .transform((value) => Number(value))
});

const userQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(Number(val)), {
      message: "Page must be a valid number",
    })
    .transform((val) => (val ? Math.max(1, Number(val)) : 1)),

  page_size: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(Number(val)), {
      message: "Page size must be a valid number",
    })
    .transform((val) => {
      const size = val ? Number(val) : 10;
      return Math.min(50, size);
    }),

  q: z.string().optional(),
  role: z.string().optional(),

  is_active: z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined) return undefined;
      return val === "true";
    }),
});

export {
  userIdParamSchema,
  userQuerySchema
}