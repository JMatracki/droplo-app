import AddMenuItemForm from "@/components/AddMenuItemForm/AddMenuItemForm";
import EmptyMenu from "@/components/EmptyMenu";
import { IMenuFormFields, MenuItem } from "@/components/MenuItem/MenuItem";
import { useState } from "react";

export default function Home() {
  const [menuItems,] = useState<IMenuFormFields[]>([{
    name: 'test',
    url: '1',
    subLinks: [
      {name: 'test 1', url: 't', subLinks: [{name: 'test 1 1'},{name: 'test 1 2', subLinks: [{name: 'test 1 1'},{name: 'test 1 2',subLinks: [{name: 'test 1 2 1'}]}]}
    ]
  }]}])
  const [showAddMenuItemForm, setShowAddMenuItemForm] = useState(false);

  return (
    <div
      className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        {menuItems ? <MenuItem menuItems={menuItems} /> :  <EmptyMenu setShowAddMenuItemForm={setShowAddMenuItemForm} />}
        <EmptyMenu setShowAddMenuItemForm={setShowAddMenuItemForm} />
        {showAddMenuItemForm ? <AddMenuItemForm
          setShowAddMenuItemForm={setShowAddMenuItemForm}
        /> : null}
      </main>
    </div>
  );
}
