import { Button } from "../../../components/button";
import { ArrowRight, UserRoundPlus } from "lucide-react";

interface InviteGuestStepProps {
  openGuestModal: () => void
  openConfirmTripModal: () => void
  emailsToInvite: string[]
}

export function InviteGuestStep({
  openGuestModal,
  openConfirmTripModal,
  emailsToInvite
}: InviteGuestStepProps) {

  return (
    <div className="md:h-16 max-md:py-4 bg-zinc-900 px-4 rounded-xl md:flex items-center shadow-shape gap-5 max-md:space-y-5">
      <button type="button" onClick={openGuestModal} className="flex items-center gap-2 flex-1">
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100 md:text-lg flex-1 text-left">
            {emailsToInvite.length} pessoas(s) convidada(s)
          </span>
        ) : (
            <span className="text-zinc-400 md:text-lg flex-1 text-left">
            Quem estará na viagem?
          </span>
        )}
      </button>
      <div className="w-px h-6 bg-zinc-800 max-md:hidden" />

      <Button onClick={openConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}