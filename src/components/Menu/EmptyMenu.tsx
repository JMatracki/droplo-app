import { Button } from '../Button'
import { IOpenForm } from '@/types/form'
import plusIcon from '@/icons/plus-circle.svg'
import Image from 'next/image'

interface IEmptyMenuProps {
    openForm: IOpenForm
}

const EmptyMenu = ({ openForm }: IEmptyMenuProps) => {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-6 rounded-lg py-10 text-center">
            <div>
                <h2 className="text-lg font-bold text-gray-800">
                    Menu jest puste
                </h2>
                <p className="text-sm text-gray-600">
                    W tym menu nie ma jeszcze żadnych linków.
                </p>
            </div>
            <Button
                variant={'primary'}
                onClick={() => {
                    openForm({ parentId: null, editingId: null })
                }}
            >
                <Image src={plusIcon} alt="plus icon" />
                Dodaj pozycję menu
            </Button>
        </div>
    )
}

export default EmptyMenu
