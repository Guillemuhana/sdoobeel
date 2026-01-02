"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

interface SecuritySettingsProps {
  requireLocation?: boolean
  securityRadius?: number
  doNotDisturb?: boolean
  onChange?: (settings: {
    requireLocation: boolean
    securityRadius: number
    doNotDisturb: boolean
  }) => void
}

export function SecuritySettings({
  requireLocation = false,
  securityRadius = 50,
  doNotDisturb = false,
  onChange,
}: SecuritySettingsProps) {
  const [settings, setSettings] = useState({
    requireLocation,
    securityRadius,
    doNotDisturb,
  })

  const updateSetting = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onChange?.(newSettings)
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="require-location">Requerir ubicación</Label>
            <p className="text-sm text-muted-foreground">Solicitar ubicación del visitante antes de notificarte</p>
          </div>
          <Switch
            id="require-location"
            checked={settings.requireLocation}
            onCheckedChange={(checked) => updateSetting("requireLocation", checked)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="security-radius">Radio de seguridad</Label>
            <span className="text-sm font-semibold text-foreground">{settings.securityRadius}m</span>
          </div>
          <Slider
            id="security-radius"
            min={10}
            max={200}
            step={10}
            value={[settings.securityRadius]}
            onValueChange={([value]) => updateSetting("securityRadius", value)}
            disabled={!settings.requireLocation}
          />
          <p className="text-xs text-muted-foreground">Distancia máxima permitida desde tu puerta</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="do-not-disturb">Modo no molestar</Label>
            <p className="text-sm text-muted-foreground">No recibir notificaciones de visitantes</p>
          </div>
          <Switch
            id="do-not-disturb"
            checked={settings.doNotDisturb}
            onCheckedChange={(checked) => updateSetting("doNotDisturb", checked)}
          />
        </div>
      </div>
    </Card>
  )
}
