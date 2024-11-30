import Image from 'next/image'
import React from 'react'
import searchIcon from '../icons/search-lg.svg'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from './Button'
import { z } from 'zod'
import { IMenuFormFields } from './MenuItems'
import { v4 as uuidv4 } from 'uuid'

export const AddMenuItemFormSchema = z.object({
    name: z.string(),
    url: z.string().url().optional(),
})

export type AddMenuFormFields = z.infer<typeof AddMenuItemFormSchema>

interface IAddMenuItemFormProps {
    parentId: string | null
    showAddMenuItemForm: boolean
    addMenuItem: (newItem: IMenuFormFields, parentId?: string | null) => void
    setShowAddMenuItemForm: React.Dispatch<React.SetStateAction<boolean>>
}

const AddMenuItemForm = ({
    parentId,
    addMenuItem,
    showAddMenuItemForm,
    setShowAddMenuItemForm,
}: IAddMenuItemFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddMenuFormFields>({
        defaultValues: {
            name: '',
            url: '',
        },
    })
    console.log(errors)
    console.log('parentId', parentId)
    console.log('addMenuItem', addMenuItem)

    const onSubmit: SubmitHandler<AddMenuFormFields> = (data) => {
        const newItem = {
            id: uuidv4(),
            name: data.name,
            url: data.url || '',
            subLinks: [],
        }

        addMenuItem(newItem, parentId)
        setShowAddMenuItemForm(false)
    }

    return (
        <>
            {showAddMenuItemForm && (
                <form
                    className="flex w-full flex-col gap-4 rounded-md border p-4 shadow-md"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label htmlFor="Nazwa">Nazwa</label>
                    <input
                        id="Nazwa"
                        type="text"
                        placeholder="np. Promocje"
                        className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-purple-400"
                        {...register('name')}
                    />
                    <label htmlFor="Link">Link</label>
                    <div className="relative">
                        <Image
                            className="absolute left-3 top-1/2 -translate-y-1/2 transform"
                            src={searchIcon}
                            alt="search icon"
                        />
                        <input
                            id="Link"
                            type="text"
                            placeholder="Wklej lub wyszukaj"
                            className="w-full rounded-md border px-4 py-2 pl-10 focus:ring-2 focus:ring-purple-400"
                            {...register('url')}
                        />
                    </div>
                    <div className="flex w-full gap-4">
                        <Button onClick={() => setShowAddMenuItemForm(false)}>
                            Anuluj
                        </Button>
                        <Button variant={'secondary'}>Dodaj</Button>
                    </div>
                </form>
            )}
        </>
    )
}

export default AddMenuItemForm
