import { ArrowRight, UserRoundPlus } from "lucide-react";

interface InviteGuestStepProps {
  openGuestModal: () => void
  emailsToInvite: string[]
  openConfirmTripModal: () => void
}

export function InviteGuestStep({
  openGuestModal,
  emailsToInvite,
  openConfirmTripModal
}: InviteGuestStepProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-5">
      <button type="button" onClick={openGuestModal} className="flex items-center gap-2 flex-1">
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100 text-lg flex-1 text-left">
            {emailsToInvite.length} pessoas(s) convidada(s)
          </span>
        ) : (
          <span className="text-zinc-400 text-lg flex-1 text-left">
            Quem estará na viagem?
          </span>
        )}
      </button>
      <div className="w-px h-6 bg-zinc-800" />
      <button onClick={openConfirmTripModal} className="bg-lime-300 text-lime-950 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-lime-400">
        Confirmar viagem
        <ArrowRight className="size-5" />
      </button>
    </div>
  )
}