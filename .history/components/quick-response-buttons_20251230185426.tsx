"use client"

import { ChatBubbleLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"

interface QuickResponseButtonsProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function QuickResponseButtons({ onSendMessage, disabled }: QuickResponseButtonsProps) {
  const quickMessages = [
    { id: 1, text: "Un momento por favor, ahí voy", icon: ChatBubbleLeftIcon },
    { id: 2, text: "Espera 5 minutos por favor", icon: ChatBubbleLeftIcon },
    { id: 3, text: "Ya te abro la puerta", icon: CheckCircleIcon },
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Mensajes Rápidos</h3>
      <div className="space-y-2">
        {quickMessages.map((msg) => {
          const Icon = msg.icon
          return (
            <Button
              key={msg.id}
              onClick={() => onSendMessage(msg.text)}
              disabled={disabled}
              variant="outline"
              className="w-full justify-start gap-2 h-auto py-3 text-left"
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{msg.text}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
