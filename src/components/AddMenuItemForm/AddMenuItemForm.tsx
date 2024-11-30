import Image from 'next/image'
import React from 'react'
import searchIcon from '../../icons/search-lg.svg'
import ButtonSecondary from '../Buttons/ButtonSecondary'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AddMenuFormFields } from './validator'

interface IAddMenuItemFormProps {
    setShowAddMenuItemForm: React.Dispatch<React.SetStateAction<boolean>>
}
const AddMenuItemForm = ({ setShowAddMenuItemForm }: IAddMenuItemFormProps) => {
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

    const onSubmit: SubmitHandler<AddMenuFormFields> = (data) =>
        console.log(data)
    console.log(errors)
    return (
        <>
            <form
                className="flex flex-col gap-4 p-4 border rounded-md shadow-md w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label htmlFor="Nazwa">Nazwa</label>
                <input
                    id="Nazwa"
                    type="text"
                    placeholder="np. Promocje"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400"
                    {...register('name')}
                />
                <label htmlFor="Link">Link</label>
                <div className="relative">
                    <Image
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                        src={searchIcon}
                        alt="search icon"
                    />
                    <input
                        id="Link"
                        type="text"
                        placeholder="Wklej lub wyszukaj"
                        className="w-full px-4 pl-10 py-2 border rounded-md focus:ring-2 focus:ring-purple-400"
                        {...register('url')}
                    />
                </div>
                <div className="flex gap-4 w-full">
                    <ButtonSecondary
                        text="Anuluj"
                        onClick={() => setShowAddMenuItemForm(false)}
                    />
                    <ButtonPrimary text="Dodaj" />
                </div>
            </form>
        </>
    )
}

export default AddMenuItemForm
