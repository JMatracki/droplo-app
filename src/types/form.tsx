export type IOpenForm = ({ parentId }: { parentId: string | null }) => void

export type ICloseForm = () => void

export type IFormState = {
    isVisible: boolean
    parentId: string | null
}
export interface IMenuFormFields {
    id: string
    name: string
    url?: string
    subLinks?: IMenuFormFields[]
}

export type IAddMenuItem = (
    newItem: IMenuFormFields,
    parentId: string | null
) => void

export type IDeleteMenuItem = (itemId: string) => void
