import type { ShoppingItem } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { SetStateAction, useState } from "react";
import ItemModal from "../components/ItemModal";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const {} = trpc.useMutation(["items.addItem"], {
    onSuccess: (item) => {
      setItems((prev) => [...prev, item]);
    },
  });
  return (
    <>
      <Head>
        <title>Shooping List</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {modalOpen && <ItemModal setModalOpen={setModalOpen} />}

      <main className="mx-auto my-12 max-w-3xl">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">My shopping list</h2>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded-md bg-violet-600 p-2 text-sm text-white transition hover:bg-violet-700"
          >
            Add shopping item
          </button>
        </div>

        <ul className="mt-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;
