import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { api } from "../../../lib/axios";

import { Button } from "../../../components/button";
import { InviteSomeoneModal } from "../modals/inviteSomeone";
import { CheckCircle, CircleDashed, UserCog } from "lucide-react";

interface GuestsProps {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function Guests() {
  const { tripId } = useParams()
  const [tripGuests, setTripGuests] = useState<GuestsProps[] | undefined>()
  const [isInviteSomeoneModalOpen, setIsInviteSomeoneModalOpen] = useState(false);

  function openInviteSomeoneModal() {
    setIsInviteSomeoneModalOpen(true);
  }

  function closeInviteSomeoneModal() {
    setIsInviteSomeoneModalOpen(false);
  }

  useEffect(() => {
    api.get(`trips/${tripId}/participants`)
      .then(response => { setTripGuests(response.data.participants) })
  }, [tripId])


  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {tripGuests && tripGuests.map((guests, index) => {
          return (
            <div key={guests.id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {guests.name ?? `Convidado ${index}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {guests.email}
                </span>
              </div>

              {guests.is_confirmed ? (
                <CheckCircle className="size-6 shrink-0 text-green-400" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              )}
            </div>
          )
        })}
      </div>

      <Button onClick={openInviteSomeoneModal} variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {isInviteSomeoneModalOpen && (
        <InviteSomeoneModal closeInviteSomeoneModal={closeInviteSomeoneModal} />
      )}
    </div>
  )
}