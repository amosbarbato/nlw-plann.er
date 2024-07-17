import { useState } from "react";

import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";

import { Button } from "../../../components/button";
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";

interface LocalAndDateStepProps {
  isGuestInputOpen: boolean
  closeGuestInput: () => void
  openGuestInput: () => void
  setDestination: (destination: string) => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
  eventStartAndEndDates: DateRange | undefined
}

export function LocalAndDateStep({
  openGuestInput,
  closeGuestInput,
  isGuestInputOpen,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: LocalAndDateStepProps) {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  const displayDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "d 'de' LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d 'de' LLL"))
    : null


  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-5">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          disabled={isGuestInputOpen}
          type="text"
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none"
          onChange={event => setDestination(event.target.value)}
        />
      </div>
      <button onClick={openDatePicker} disabled={isGuestInputOpen} className="flex items-center gap-2 outline-none">
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-43 text-left flex-1">
          {displayDate || 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button>
                  <X className="size-5 text-zinc-400" onClick={closeDatePicker} />
                </button>
              </div>
            </div>

            <DayPicker
              locale={ptBR}
              mode="range"
              showOutsideDays={true}
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
              classNames={{
                months:
                  'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                month: 'space-y-4 capitalize',
                caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-sm font-medium',

                nav: 'space-x-1 flex items-center',
                nav_button:
                  'h-7 w-7 hover:opacity-100 shadow-sm hover:bg-accent hover:text-accent-foreground flex justify-center items-center rounded-md',

                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',

                head_cell: 'w-8 font-normal text-[0.8rem]',


                day: 'w-10 p-1 hover:rounded-md aria-selected:hover:rounded-none aria-selected:font-bold',
                day_range_start: 'day-range-start rounded-l-md aria-selected:hover:rounded-l-md aria-selected:hover:bg-lime-200',
                day_range_end: 'day-range-end rounded-r-md aria-selected:hover:rounded-r-md aria-selected:hover:bg-lime-200',
                day_today: 'text-accent-foreground bg-zinc-950/95 rounded-md aria-selected:rounded-r-none',
                day_outside:
                  'day-outside text-muted-foreground opacity-30 aria-selected:opacity-100 aria-selected:bg-lime-300 aria-selected:text-lime-950',
                day_disabled: 'text-muted-foreground opacity-30',
                day_range_middle:
                  'rounded-none aria-selected:hover:bg-lime-200',
              }}
            />
          </div>
        </div>
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestInputOpen ? (
        <Button onClick={closeGuestInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestInput} >
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}