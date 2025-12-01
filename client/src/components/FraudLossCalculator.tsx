import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Router } from "lucide-react";

export default function FraudLossCalculator() {
  const [baseSize, setBaseSize] = useState(5000);
  const [churnRate, setChurnRate] = useState(2.0);
  const [equipmentCost, setEquipmentCost] = useState(450); // Custo médio ONU + Roteador
  const [lossRate, setLossRate] = useState(15); // % de equipamentos não recuperados

  const [monthlyLoss, setMonthlyLoss] = useState(0);
  const [annualLoss, setAnnualLoss] = useState(0);

  useEffect(() => {
    const churnedClients = Math.round(baseSize * (churnRate / 100));
    const lostEquipments = Math.round(churnedClients * (lossRate / 100));
    
    const monthly = lostEquipments * equipmentCost;
    const annual = monthly * 12;

    setMonthlyLoss(monthly);
    setAnnualLoss(annual);
  }, [baseSize, churnRate, equipmentCost, lossRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Router className="w-5 h-5 text-primary" />
          Calculadora de Perda Patrimonial
        </CardTitle>
        <CardDescription>
          Estime o prejuízo anual com equipamentos (ONU/Roteadores) não recuperados em casos de fraude e inadimplência.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Tamanho da Base de Clientes</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[baseSize]}
                  onValueChange={(v) => setBaseSize(v[0])}
                  max={50000}
                  step={100}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={baseSize}
                  onChange={(e) => setBaseSize(Number(e.target.value))}
                  className="w-24 text-right"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Taxa de Churn Mensal (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[churnRate]}
                  onValueChange={(v) => setChurnRate(v[0])}
                  max={10}
                  step={0.1}
                  className="flex-1"
                />
                <span className="w-24 text-right font-mono">{churnRate.toFixed(1)}%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Custo Médio do Kit (ONU + Roteador)</Label>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">R$</span>
                <Input
                  type="number"
                  value={equipmentCost}
                  onChange={(e) => setEquipmentCost(Number(e.target.value))}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Taxa de Não-Recuperação (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[lossRate]}
                  onValueChange={(v) => setLossRate(v[0])}
                  max={50}
                  step={1}
                  className="flex-1"
                />
                <span className="w-24 text-right font-mono">{lossRate}%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Média de mercado para inadimplência &gt; 90 dias: 15-20%
              </p>
            </div>
          </div>

          <div className="bg-secondary/50 p-6 rounded-lg flex flex-col justify-center space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Prejuízo Mensal</p>
              <p className="text-3xl font-bold text-destructive">{formatCurrency(monthlyLoss)}</p>
            </div>
            
            <div className="w-full h-px bg-border" />
            
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Prejuízo Anual Projetado</p>
              <p className="text-5xl font-bold text-destructive tracking-tight">{formatCurrency(annualLoss)}</p>
            </div>

            <div className="bg-background p-4 rounded border border-border text-sm">
              <p className="font-medium mb-1">Impacto TeiaH Valid:</p>
              <p className="text-muted-foreground">
                Com a redução de 85% na fraude e identificação antecipada de risco, você poderia economizar:
                <span className="block text-xl font-bold text-green-600 mt-1">
                  {formatCurrency(annualLoss * 0.85)} / ano
                </span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
