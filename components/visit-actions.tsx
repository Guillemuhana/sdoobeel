"use client"

import { useState } from "react"
import { MapPinIcon, ScissorsIcon, NoSymbolIcon } from "@heroicons/react/24/outline"
import { PrimaryButton } from "./primary-button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface VisitActionsProps {
  onRequestLocation?: () => void
  onEndVisit?: () => void
  onBlockVisitor?: () => void
  disabled?: boolean
}

export function VisitActions({ onRequestLocation, onEndVisit, onBlockVisitor, disabled = false }: VisitActionsProps) {
  const [showEndDialog, setShowEndDialog] = useState(false)
  const [showBlockDialog, setShowBlockDialog] = useState(false)

  const handleEndVisit = () => {
    setShowEndDialog(false)
    onEndVisit?.()
  }

  const handleBlockVisitor = () => {
    setShowBlockDialog(false)
    onBlockVisitor?.()
  }

  return (
    <>
      <div className="space-y-3">
        <PrimaryButton variant="warning" size="lg" className="w-full" onClick={onRequestLocation} disabled={disabled}>
          <MapPinIcon className="h-5 w-5" />
          Pedir ubicación
        </PrimaryButton>

        <PrimaryButton
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => setShowEndDialog(true)}
          disabled={disabled}
        >
          <ScissorsIcon className="h-5 w-5" />
          Cortar visita
        </PrimaryButton>

        <PrimaryButton
          variant="danger"
          size="lg"
          className="w-full"
          onClick={() => setShowBlockDialog(true)}
          disabled={disabled}
        >
          <NoSymbolIcon className="h-5 w-5" />
          Bloquear visitante
        </PrimaryButton>
      </div>

      <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cortar esta visita?</AlertDialogTitle>
            <AlertDialogDescription>
              El visitante recibirá una notificación de que la visita ha finalizado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleEndVisit}>Sí, cortar visita</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Bloquear este visitante?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción impedirá que este visitante pueda tocar el timbre nuevamente desde esta ubicación.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleBlockVisitor} className="bg-red-600 hover:bg-red-700">
              Sí, bloquear
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
