import { z } from 'zod'

export const AddMenuItemFormSchema = z.object({
    name: z.string(),
    url: z.string().url().optional(),
})

export type AddMenuFormFields = z.infer<typeof AddMenuItemFormSchema>
