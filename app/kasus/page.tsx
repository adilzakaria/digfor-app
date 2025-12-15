"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Plus, FolderOpen, AlertCircle } from "lucide-react"
import { useState } from "react"
import { SidebarPage } from "@/components/SidebarPage"

type Kasus = {
  id: string
  korban: string
  jenis: string
  ringkasan: string
  status: "Open" | "Closed"
  tanggal: string
}

export default function KasusPage() {
  const [kasusList, setKasusList] = useState<Kasus[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    korban: "",
    jenis: "",
    ringkasan: "",
    status: "Open" as "Open" | "Closed",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newKasus: Kasus = {
      id: Date.now().toString(),
      ...formData,
      tanggal: new Date().toLocaleDateString("id-ID"),
    }
    setKasusList([newKasus, ...kasusList])
    setFormData({ korban: "", jenis: "", ringkasan: "", status: "Open" })
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
              <h2 className="mb-2 text-3xl font-bold">Data Kasus</h2>
              <p className="text-muted-foreground">Lacak dan dokumentasikan kasus kejahatan siber</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Kasus
            </Button>
          </div>

          {showForm && (
            <Card className="mb-6 border-border bg-card p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="korban">Nama Korban</Label>
                  <Input
                    id="korban"
                    value={formData.korban}
                    onChange={(e) => setFormData({ ...formData, korban: e.target.value })}
                    placeholder="Pilih atau masukkan nama korban"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="jenis">Jenis Kasus</Label>
                  <select
                    id="jenis"
                    value={formData.jenis}
                    onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    <option value="">Pilih jenis kasus</option>
                    <option value="Phishing">Phishing</option>
                    <option value="Hacking">Hacking</option>
                    <option value="Scam">Scam</option>
                    <option value="Ransomware">Ransomware</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="ringkasan">Ringkasan Kasus</Label>
                  <Textarea
                    id="ringkasan"
                    value={formData.ringkasan}
                    onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                    placeholder="Deskripsi lengkap tentang kasus"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "Open" | "Closed" })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
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
            {kasusList.length === 0 ? (
              <Card className="border-border bg-card p-12 text-center">
                <FolderOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">Belum ada data kasus</h3>
                <p className="text-sm text-muted-foreground">Klik tombol "Tambah Kasus" untuk menambahkan kasus baru</p>
              </Card>
            ) : (
              kasusList.map((kasus) => (
                <Card key={kasus.id} className="border-border bg-card p-6 transition-all hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <AlertCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <h3 className="text-lg font-bold">{kasus.jenis}</h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            kasus.status === "Open" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {kasus.status}
                        </span>
                      </div>
                      <p className="mb-2 text-sm text-muted-foreground">Korban: {kasus.korban}</p>
                      <p className="text-sm text-foreground">{kasus.ringkasan}</p>
                      <p className="mt-3 text-xs text-muted-foreground">Dibuat: {kasus.tanggal}</p>
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
