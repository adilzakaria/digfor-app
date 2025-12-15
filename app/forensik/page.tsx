"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Plus, ClipboardCheck, Clock } from "lucide-react"
import { useState } from "react"
import { SidebarPage } from "@/components/SidebarPage"

type Tindakan = {
  id: string
  kasus: string
  tindakan: string
  waktu: string
}

export default function ForensikPage() {
  const [tindakanList, setTindakanList] = useState<Tindakan[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    kasus: "",
    tindakan: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTindakan: Tindakan = {
      id: Date.now().toString(),
      ...formData,
      waktu: new Date().toLocaleString("id-ID"),
    }
    setTindakanList([newTindakan, ...tindakanList])
    setFormData({ kasus: "", tindakan: "" })
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex h-full items-center px-6">
          <Shield className="mr-3 h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Sistem Forensik Digital</h1>
        </div>
      </header>

      <SidebarPage />

      <main className="pt-16 md:pl-64">
        <div className="container mx-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Tindakan Forensik</h2>
              <p className="text-muted-foreground">Catat setiap tindakan investigasi forensik</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Tindakan
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6 border-border bg-card p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="kasus">Pilih Kasus</Label>
                  <Input
                    id="kasus"
                    value={formData.kasus}
                    onChange={(e) => setFormData({ ...formData, kasus: e.target.value })}
                    placeholder="ID atau nama kasus"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tindakan">Tindakan yang Dilakukan</Label>
                  <Textarea
                    id="tindakan"
                    value={formData.tindakan}
                    onChange={(e) => setFormData({ ...formData, tindakan: e.target.value })}
                    placeholder="Deskripsi lengkap tindakan forensik yang dilakukan"
                    rows={6}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Simpan</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Batal
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <div className="space-y-4">
            {tindakanList.length === 0 ? (
              <Card className="border-border bg-card p-12 text-center">
                <ClipboardCheck className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">Belum ada tindakan forensik</h3>
                <p className="text-sm text-muted-foreground">
                  Klik tombol "Tambah Tindakan" untuk mencatat tindakan forensik baru
                </p>
              </Card>
            ) : (
              tindakanList.map((tindakan) => (
                <Card key={tindakan.id} className="border-border bg-card p-6 transition-all hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <h3 className="text-lg font-bold">Kasus: {tindakan.kasus}</h3>
                      </div>
                      <p className="text-sm text-foreground">{tindakan.tindakan}</p>
                      <p className="mt-3 text-xs text-muted-foreground">Waktu: {tindakan.waktu}</p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
