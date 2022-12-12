import { Dispatch, FC, SetStateAction, useState } from "react";
import { trpc } from "../utils/trpc";

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ItemModal: FC<ItemModalProps> = ({ setModalOpen }) => {
  const [input, setInput] = useState<string>("");

  const { mutate: addItem } = trpc.useMutation("items.addItem");

  return (
    <div className="absolute inset-0 flex items-center justify-center  bg-black/75">
      <div className=" space-y-4 rounded-sm bg-white p-3">
        <h3 className="text-xl font-medium">Name of item</h3>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-violet-300 focus:ring focus:ring-white"
        />
        <div className="grid grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="rounded-md bg-gray-500 p-1 text-sm text-white transition hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              addItem({ name: input });
              setModalOpen(false);
            }}
            className="rounded-md bg-violet-500 p-1 text-sm text-white transition hover:bg-violet-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
