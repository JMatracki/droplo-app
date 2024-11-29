interface Props {
  setShowAddMenuItemForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmptyMenu = ({setShowAddMenuItemForm}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-10">
      <div>
        <h2 className="text-lg font-bold text-gray-800">Menu jest puste</h2>
        <p className="text-sm text-gray-600">
          W tym menu nie ma jeszcze żadnych linków.
        </p>
      </div>
      <button className="flex items-center justify-center px-4 py-2 bg-purple-700 text-white rounded-md shadow hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400" 
      onClick={() => {setShowAddMenuItemForm(true)}}
      >
        Dodaj pozycję menu
      </button>
    </div>
  );
};

export default EmptyMenu;
