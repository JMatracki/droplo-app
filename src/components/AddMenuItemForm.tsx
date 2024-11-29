import React, { useState } from "react";

interface Props {
  showAddMenuItemForm: boolean;
  setShowAddMenuItemForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddMenuItemForm = ({
  showAddMenuItemForm,
  setShowAddMenuItemForm,
}: Props) => {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ label, url }); // Replace this with actual handling logic
    setLabel("");
    setUrl("");
  };

  return (
    <>
      {showAddMenuItemForm && (
        <form
          className="flex flex-col items-center gap-4 p-4 border rounded-md shadow-md w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <label htmlFor="Nazwa">Nazwa</label>
          <input
            id="Nazwa"
            type="text"
            placeholder="np. Promocje"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400"
            required
          />
          <label htmlFor="Link">Link</label>
          <input
            id="Link"
            type="text"
            placeholder="Wklej lub wyszukaj"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400"
          />
          <div className="flex gap-4 w-full">
            <button
              type="button"
              onClick={() => setShowAddMenuItemForm(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Anuluj
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-700 text-white rounded-md shadow hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Zapisz
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddMenuItemForm;
