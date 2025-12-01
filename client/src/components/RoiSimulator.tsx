import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { TrendingDown } from "lucide-react";

export default function RoiSimulator() {
  const [clientes, setClientes] = useState(10000);
  const [ticketMedio, setTicketMedio] = useState(100);
  const [inadimplenciaAtual, setInadimplenciaAtual] = useState(25);
  const [reducaoEstimada, setReducaoEstimada] = useState(50);
  const [churnAtual, setChurnAtual] = useState(1.5);

  const [resultados, setResultados] = useState({
    perdaAtual: 0,
    economiaAnual: 0,
    roi: 0
  });

  useEffect(() => {
    const receitaMensal = clientes * ticketMedio;
    
    // Perda por Inadimplência
    const perdaInadimplenciaMensal = receitaMensal * (inadimplenciaAtual / 100);
    
    // Perda por Churn (clientes perdidos * ticket médio)
    const clientesPerdidosMensal = clientes * (churnAtual / 100);
    const perdaChurnMensal = clientesPerdidosMensal * ticketMedio;
    
    const perdaTotalMensal = perdaInadimplenciaMensal + perdaChurnMensal;
    const perdaTotalAnual = perdaTotalMensal * 12;
    
    // Economia estimada (aplicada sobre a perda total)
    const economiaMensal = perdaTotalMensal * (reducaoEstimada / 100);
    const economiaAnual = economiaMensal * 12;
    
    // Custo estimado TeiaH (exemplo: R$ 0,50 por cliente/mês)
    const custoAnual = clientes * 0.50 * 12;
    
    const roi = ((economiaAnual - custoAnual) / custoAnual) * 100;

    setResultados({
      perdaAtual: perdaTotalAnual,
      economiaAnual: economiaAnual,
      roi: roi
    });
  }, [clientes, ticketMedio, inadimplenciaAtual, reducaoEstimada, churnAtual]);

  const dataChart = [
    { name: "Economia Gerada", value: resultados.economiaAnual },
    { name: "Perda Residual", value: resultados.perdaAtual - resultados.economiaAnual },
  ];

  const COLORS = ["var(--primary)", "var(--destructive)"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Simulador de Impacto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Base de Clientes</Label>
              <span className="font-bold">{clientes.toLocaleString()}</span>
            </div>
            <Slider 
              value={[clientes]} 
              min={1000} 
              max={2000000} 
              step={1000} 
              onValueChange={(v) => setClientes(v[0])} 
            />
          </div>

          <div className="space-y-4 p-4 bg-secondary/50 rounded-lg border border-border">
            <div className="flex justify-between items-center">
              <Label className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Termômetro de Churn (%)
              </Label>
              <span className={`font-bold px-2 py-1 rounded ${
                churnAtual > 2.5 ? 'bg-destructive/10 text-destructive' : 
                churnAtual > 1.5 ? 'bg-orange-100 text-orange-600' : 
                'bg-green-100 text-green-600'
              }`}>
                {churnAtual}%
              </span>
            </div>
            <Slider 
              value={[churnAtual]} 
              min={0.1} 
              max={10} 
              step={0.1} 
              className={
                churnAtual > 2.5 ? "[&>.relative>.bg-primary]:bg-destructive" : 
                churnAtual > 1.5 ? "[&>.relative>.bg-primary]:bg-orange-500" : 
                "[&>.relative>.bg-primary]:bg-green-500"
              }
              onValueChange={(v) => setChurnAtual(v[0])} 
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Saudável (0-1.5%)</span>
              <span>Alerta (1.5-2.5%)</span>
              <span>Crítico (&gt;2.5%)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Ticket Médio (R$)</Label>
              <span className="font-bold">R$ {ticketMedio}</span>
            </div>
            <Slider 
              value={[ticketMedio]} 
              min={50} 
              max={300} 
              step={10} 
              onValueChange={(v) => setTicketMedio(v[0])} 
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Taxa de Inadimplência Atual (%)</Label>
              <span className="font-bold">{inadimplenciaAtual}%</span>
            </div>
            <Slider 
              value={[inadimplenciaAtual]} 
              min={5} 
              max={50} 
              step={1} 
              onValueChange={(v) => setInadimplenciaAtual(v[0])} 
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Redução Estimada com TeiaH (%)</Label>
              <span className="font-bold">{reducaoEstimada}%</span>
            </div>
            <Slider 
              value={[reducaoEstimada]} 
              min={10} 
              max={80} 
              step={5} 
              onValueChange={(v) => setReducaoEstimada(v[0])} 
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-secondary/20">
        <CardHeader>
          <CardTitle>Projeção de Resultados (Anual)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataChart}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${(value as number).toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-background border border-border rounded-lg">
              <span className="text-sm text-muted-foreground">Economia Projetada</span>
              <span className="text-xl font-bold text-primary">
                R$ {resultados.economiaAnual.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-background border border-border rounded-lg">
              <span className="text-sm text-muted-foreground">ROI Estimado</span>
              <span className="text-xl font-bold text-green-600">
                {resultados.roi.toFixed(0)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
