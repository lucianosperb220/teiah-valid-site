import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  LogOut, 
  Search,
  MapPin,
  Activity,
  Upload,
  Moon,
  Sun,
  FileSpreadsheet,
  Download,
  FileText
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";
import MapView from "@/components/Map";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "text/csv") {
        toast.error("Formato inválido. Por favor, envie um arquivo CSV.");
        return;
      }
      
      setIsUploading(true);
      // Simulação de validação e processamento
      setTimeout(() => {
        setIsUploading(false);
        toast.success(`Arquivo ${file.name} validado! 1.240 registros importados com sucesso.`);
      }, 2000);
    }
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    toast.info(`Gerando relatório em ${format.toUpperCase()}...`);
    setTimeout(() => {
      toast.success("Download iniciado!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col fixed h-full transition-colors duration-300">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-lg tracking-tight">TeiaH Valid</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Button variant="secondary" className="w-full justify-start font-medium">
            <LayoutDashboard className="mr-3 h-5 w-5" /> Visão Geral
          </Button>
          <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
            <Users className="mr-3 h-5 w-5" /> Base de Clientes
          </Button>
          <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
            <MapPin className="mr-3 h-5 w-5" /> Consulta de Endereço
          </Button>
          <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
            <Activity className="mr-3 h-5 w-5" /> Monitoramento
          </Button>
        </nav>

        <div className="p-4 border-t border-border">
          <Link href="/login">
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="mr-3 h-5 w-5" /> Sair
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Painel de Controle</h1>
            <p className="text-muted-foreground">Bem-vindo de volta, Provedor Exemplo.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input 
                type="file" 
                id="csv-upload" 
                accept=".csv" 
                className="hidden" 
                onChange={handleFileUpload}
              />
              <label htmlFor="csv-upload">
                <Button variant="outline" className="cursor-pointer" asChild disabled={isUploading}>
                  <span>
                    {isUploading ? (
                      "Validando..."
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" /> Importar CSV
                      </>
                    )}
                  </span>
                </Button>
              </label>
            </div>

            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <FileText className="mr-2 h-4 w-4" /> PDF
            </Button>
            
            <Button variant="outline" onClick={() => handleExport('excel')}>
              <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel
            </Button>

            <div className="w-px h-8 bg-border mx-2" />

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar cliente ou endereço..." 
                className="pl-10 bg-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              PE
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Base Analisada</p>
                  <h3 className="text-2xl font-bold mt-1">12.450</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> +150 novos este mês
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Risco Alto</p>
                  <h3 className="text-2xl font-bold mt-1 text-destructive">8.2%</h3>
                </div>
                <div className="p-2 bg-destructive/10 rounded-lg text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                </div>
              </div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> -2.1% vs mês anterior
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Endereços Bloqueados</p>
                  <h3 className="text-2xl font-bold mt-1">145</h3>
                </div>
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                  <MapPin className="h-5 w-5" />
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Blacklist colaborativa ativa
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Economia Projetada</p>
                  <h3 className="text-2xl font-bold mt-1 text-green-600">R$ 45k</h3>
                </div>
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Evitada em inadimplência este mês
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Visualization */}
        <Card className="mb-8 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Mapa de Risco Geográfico
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[400px] relative">
            <MapView 
              onMapReady={(map: google.maps.Map) => {
                // Exemplo de marcadores de risco
                const locations = [
                  { lat: -23.550520, lng: -46.633308, risk: 'high' },
                  { lat: -23.555520, lng: -46.638308, risk: 'low' },
                  { lat: -23.545520, lng: -46.628308, risk: 'medium' },
                ];
                
                locations.forEach(loc => {
                  new google.maps.Marker({
                    position: { lat: loc.lat, lng: loc.lng },
                    map: map,
                    title: `Risco: ${loc.risk}`,
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 8,
                      fillColor: loc.risk === 'high' ? '#ef4444' : loc.risk === 'medium' ? '#f97316' : '#22c55e',
                      fillOpacity: 0.9,
                      strokeWeight: 1,
                      strokeColor: '#ffffff',
                    }
                  });
                });
              }}
            />
            <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded shadow text-xs space-y-1">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Alto Risco</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Médio Risco</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Baixo Risco</div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Table Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Consultas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <p className="font-medium">Rua Exemplo, {100 + i} - Centro</p>
                      <p className="text-sm text-muted-foreground">Consulta realizada há {i * 10} min</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      i % 2 === 0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {i % 2 === 0 ? 'APROVADO' : 'ALTO RISCO'}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">Score: {i % 2 === 0 ? 850 : 320}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function DollarSign({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}
