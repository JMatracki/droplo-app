import React from 'react'

export interface IMenuFormFields {
    name: string
    url?: string
    subLinks?: IMenuFormFields[]
}

export const MenuItem = ({ menuItems }: { menuItems: IMenuFormFields[] }) => {
    return (
        <div>
            {menuItems.map((el) => {
                return (
                    <div key={el.name}>
                        {el.name}
                        {el.subLinks ? (
                            <div style={{ marginLeft: '10px' }}>
                                <MenuItem
                                    key={el.name}
                                    menuItems={el.subLinks}
                                />
                            </div>
                        ) : null}
                    </div>
                )
            })}
        </div>
    )
}
