import Image from "next/image";
import plusIcon from "../icons/plus-circle.svg"

interface IEmptyMenuProps {
  setShowAddMenuItemForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmptyMenu = ({setShowAddMenuItemForm}: IEmptyMenuProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-10 border border-[#F9FAFB] w-full bg-[#F9FAFB]">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Menu jest puste</h2>
        <p className="text-sm text-gray-600">
          W tym menu nie ma jeszcze żadnych linków.
        </p>
      </div>
      <button className="flex items-center justify-center gap-1.5 px-4 py-2 bg-purple-700 text-white rounded-md shadow hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400" 
      onClick={() => {setShowAddMenuItemForm(true)}}
      >
        <Image src={plusIcon} alt="plus icon"/>
        Dodaj pozycję menu
      </button>
    </div>
  );
};

export default EmptyMenu;
