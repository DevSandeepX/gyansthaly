import z from "zod"


export const examSchema = z.object({
    name: z.string(),
    duration: z.number(),
    totalQuestions: z.number()

})