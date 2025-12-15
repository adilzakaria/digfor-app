import { SidebarPage } from "@/components/SidebarPage"
import { Card } from "@/components/ui/card"
import { Shield, Users, FolderOpen, ClipboardCheck } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex h-full items-center px-6">
          <Shield className="mr-3 h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Sistem Forensik Digital</h1>
        </div>
      </header>

      {/* Sidebar */}
      <SidebarPage />

      {/* Main Content */}
      <main className="pt-16 md:pl-64">
        <div className="container mx-auto p-6">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-balance">Dashboard Forensik</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Selamat datang di sistem manajemen barang bukti digital
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="group relative overflow-hidden border-border bg-card p-6 transition-all hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Data Korban</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Kelola informasi korban kejahatan siber dengan lengkap dan terorganisir
                </p>
              </div>
            </Card>

            <Card className="group relative overflow-hidden border-border bg-card p-6 transition-all hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <FolderOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Data Kasus</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Lacak dan dokumentasikan kasus phishing, hacking, dan penipuan digital
                </p>
              </div>
            </Card>

            <Card className="group relative overflow-hidden border-border bg-card p-6 transition-all hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Tindakan Forensik</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Catat setiap tindakan investigasi dan riwayat forensik per kasus
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}