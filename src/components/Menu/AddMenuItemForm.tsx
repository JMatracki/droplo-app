import Image from 'next/image'
import React from 'react'
import searchIcon from '@/icons/search-lg.svg'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../Button'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    IAddMenuItem,
    ICloseForm,
    IEditMenuItem,
    IFormState,
    IMenuFormFields,
} from '@/types/form'

export const AddMenuItemFormSchema = z.object({
    name: z.string().min(1, { message: 'Nazwa jest wymagana' }),
    url: z
        .string()
        .url({ message: 'Podaj prawidłowy adres URL' })
        .optional()
        .or(z.literal('')),
})

export type AddMenuFormFields = z.infer<typeof AddMenuItemFormSchema>

interface IAddMenuItemFormProps {
    formState: IFormState
    editingItem?: IMenuFormFields | null
    addMenuItem: IAddMenuItem
    editMenuItem: IEditMenuItem
    closeForm: ICloseForm
}

const AddMenuItemForm = ({
    formState,
    editingItem,
    addMenuItem,
    editMenuItem,
    closeForm,
}: IAddMenuItemFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddMenuFormFields>({
        resolver: zodResolver(AddMenuItemFormSchema),
        defaultValues: {
            name: editingItem?.name || '',
            url: editingItem?.url || '',
        },
    })

    const onSubmit: SubmitHandler<AddMenuFormFields> = (data) => {
        if (formState.editingId) {
            editMenuItem({
                updatedItem: {
                    id: formState.editingId,
                    name: data.name,
                    url: data.url || '',
                },
            })
        } else {
            const newItem = {
                id: uuidv4(),
                name: data.name,
                url: data.url || '',
                subLinks: [],
            }

            addMenuItem({
                newItem,
                parentId: formState.parentId,
            })
        }

        closeForm()
    }

    return (
        <>
            {formState.isVisible && (
                <form
                    className="mb-6 flex w-full flex-col gap-1 rounded-md border p-4 shadow-md"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <label htmlFor="name">Nazwa</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="np. Promocje"
                            className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-purple-400"
                            {...register('name')}
                        />
                        <div className="min-h-6">
                            <span className="text-sm text-red-500">
                                {errors.name && errors.name.message}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="link">Link</label>
                        <div className="relative">
                            <Image
                                className="absolute left-3 top-1/2 -translate-y-1/2 transform"
                                src={searchIcon}
                                alt="search icon"
                            />
                            <input
                                id="link"
                                type="text"
                                placeholder="Wklej lub wyszukaj"
                                className="w-full rounded-md border px-4 py-2 pl-10 focus:ring-2 focus:ring-purple-400"
                                {...register('url')}
                            />
                        </div>
                        <div className="min-h-6">
                            <span className="text-sm text-red-500">
                                {errors.url && errors.url.message}
                            </span>
                        </div>
                    </div>

                    <div className="flex w-full gap-4">
                        <Button type="button" onClick={() => closeForm()}>
                            Anuluj
                        </Button>
                        <Button variant={'secondary'}>
                            {editingItem ? 'Zapisz' : 'Dodaj'}
                        </Button>
                    </div>
                </form>
            )}
        </>
    )
}

export default AddMenuItemForm
