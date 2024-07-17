import { useState } from "react";

import { LocalAndDateHeader } from "./components/header";
import { Activities } from "./components/activities";
import { ImportantLinks } from "./components/links";
import { Guests } from "./components/guests";
import { CreateActiveModal } from "./modals/createActivity";
import { Plus } from "lucide-react";

export function TripPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }


  return (
    <div className="max-w-6xl px-6 py-10 max-md:py-6 mx-auto">
      <div className="space-y-8">
        <LocalAndDateHeader />

        <main className="md:flex gap-16 md:px-4 max-md:space-y-8">
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold max-md:text-xl">Atividades</h2>
              <button onClick={openCreateActivityModal} className="bg-lime-300 text-lime-950 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400">
                <Plus className="size-5" />
                <p className="max-md:hidden">Cadastrar atividade</p>
              </button>
            </div>
            <Activities />
          </div>

          <div className="w-full h-px bg-zinc-800 md:hidden" />

          <div className="w-80 space-y-6 max-md:space-y-8">
            <ImportantLinks />
            <div className="w-full h-px bg-zinc-800" />
            <Guests />
          </div>
        </main>
      </div>

      {isCreateActivityModalOpen && (
        <CreateActiveModal
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  )
}