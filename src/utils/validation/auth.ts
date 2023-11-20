import { z } from "zod";

export const zodUser = z.object(
  {
    id: z.string(),
    name: z.string({ required_error: "Invalid: User name not found" }),
    email: z.string({ required_error: "Invalid: User email not found" }),
    studentId: z
      .string({
        invalid_type_error: "Invalid: StudentId is not of valid type",
      })
      .regex(/^s20\d{7}$/i, {
        message: "Invalid: StudentId is not of valid format",
      }),
  },
  { required_error: "Invalid: User object not found" },
);
