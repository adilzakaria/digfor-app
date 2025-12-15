"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Plus, User } from "lucide-react"
import { useState } from "react"
import { SidebarPage } from "@/components/SidebarPage"

type Korban = {
  id: string
  nama: string
  kontak: string
  deskripsi: string
  tanggal: string
}

export default function KorbanPage() {
  const [korbanList, setKorbanList] = useState<Korban[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    nama: "",
    kontak: "",
    deskripsi: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newKorban: Korban = {
      id: Date.now().toString(),
      ...formData,
      tanggal: new Date().toLocaleDateString("id-ID"),
    }
    setKorbanList([newKorban, ...korbanList])
    setFormData({ nama: "", kontak: "", deskripsi: "" })
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
              <h2 className="mb-2 text-3xl font-bold">Data Korban</h2>
              <p className="text-muted-foreground">Kelola informasi korban kejahatan siber</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Korban
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6 border-border bg-card p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="nama">Nama Korban</Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    placeholder="Masukkan nama korban"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="kontak">Kontak Korban</Label>
                  <Input
                    id="kontak"
                    value={formData.kontak}
                    onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                    placeholder="Email atau nomor telepon"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="deskripsi">Deskripsi Kejadian</Label>
                  <Textarea
                    id="deskripsi"
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    placeholder="Ringkasan singkat kejadian yang dialami korban"
                    rows={4}
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
            {korbanList.length === 0 ? (
              <Card className="border-border bg-card p-12 text-center">
                <User className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">Belum ada data korban</h3>
                <p className="text-sm text-muted-foreground">
                  Klik tombol "Tambah Korban" untuk menambahkan data korban baru
                </p>
              </Card>
            ) : (
              korbanList.map((korban) => (
                <Card key={korban.id} className="border-border bg-card p-6 transition-all hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-bold">{korban.nama}</h3>
                      <p className="mb-2 text-sm text-muted-foreground">{korban.kontak}</p>
                      <p className="text-sm text-foreground">{korban.deskripsi}</p>
                      <p className="mt-3 text-xs text-muted-foreground">Ditambahkan: {korban.tanggal}</p>
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
