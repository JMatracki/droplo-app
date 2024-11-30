export type IOpenForm = ({
    parentId,
    editingId,
}: {
    parentId: string | null
    editingId: string | null
}) => void

export type ICloseForm = () => void

export type IFormState = {
    isVisible: boolean
    parentId: string | null
    editingId: string | null
}
export interface IMenuFormFields {
    id: string
    name: string
    url?: string
    subLinks?: IMenuFormFields[]
}

export type IAddMenuItem = ({
    newItem,
    parentId,
}: {
    newItem: IMenuFormFields
    parentId: string | null
}) => void

export type IEditMenuItem = ({
    updatedItem,
}: {
    updatedItem: IMenuFormFields
}) => void

export type IDeleteMenuItem = ({ itemId }: { itemId: string }) => void
