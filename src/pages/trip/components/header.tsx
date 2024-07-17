import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

import { api } from "../../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Calendar, MapPin } from "lucide-react";

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export function LocalAndDateHeader() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()

  useEffect(() => {
    api.get(`/trips/${tripId}`)
      .then(response => { setTrip(response.data.trip) })
  }, [tripId])

  const displayedDate = trip
    ? format(trip.starts_at, "d ' de ' LLL")
      .concat(' até ')
      .concat(format(trip.ends_at, "d ' de ' LLL", { locale: ptBR }))
    : null


  return (
    <div className="px-4 h-16 max-md:h-14 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="text-zinc-400 size-5" />
        <span className="text-zinc-100 capitalize max-md:text-sm">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="text-zinc-400 size-5 flex-1" />
          <span className="text-zinc-100 max-md:text-sm">{displayedDate}</span>
        </div>
      </div>
    </div>
  )
}