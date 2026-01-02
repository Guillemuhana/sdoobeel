'use client'
import PrimaryButton from './primary-button'

interface QuickResponseButtonsProps {
  onSendMessage: (message: string) => void
}

export default function QuickResponseButtons({ onSendMessage }: QuickResponseButtonsProps) {
  const quickMessages = [
    'Un momento por favor, ahí voy',
    'Dame 2 minutos',
    'Ya bajo, espera un momento',
    'Disculpa la demora, ya salgo',
  ]

  return (
    <div className='space-y-2'>
      <h3 className='font-semibold text-gray-900 mb-3'>Respuestas Rápidas</h3>
      {quickMessages.map((message, index) => (
        <button
          key={index}
          onClick={() => onSendMessage(message)}
          className='w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors'
        >
          <p className='text-sm text-gray-900'>{message}</p>
        </button>
      ))}
    </div>
  )
}
