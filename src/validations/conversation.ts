import { z } from "zod";

export const UpdateTitleSchema = z.object({
	title: z.string().min(1, "Title is required"),
});
