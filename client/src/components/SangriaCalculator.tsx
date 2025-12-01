import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { AlertTriangle, TrendingDown } from "lucide-react";

export default function SangriaCalculator() {
  const [baseClientes, setBaseClientes] = useState(5000);
  const [ticketMedio, setTicketMedio] = useState(100);
  const [churnMensal, setChurnMensal] = useState(1.5);
  const [custoReposicao, setCustoReposicao] = useState(1000); // CRC

  const [resultados, setResultados] = useState({
    clientesPerdidosMes: 0,
    clientesPerdidosAno: 0,
    receitaPerdidaAno: 0,
    custoReposicaoAno: 0,
    sangriaTotalAno: 0
  });

  useEffect(() => {
    const perdidosMes = Math.round(baseClientes * (churnMensal / 100));
    const perdidosAno = perdidosMes * 12;
    
    // Receita perdida (LTV simplificado de 12 meses para cada cliente perdido)
    const receitaPerdida = perdidosAno * ticketMedio * 12;
    
    // Custo para repor esses clientes
    const custoRepo = perdidosAno * custoReposicao;
    
    const total = receitaPerdida + custoRepo;

    setResultados({
      clientesPerdidosMes: perdidosMes,
      clientesPerdidosAno: perdidosAno,
      receitaPerdidaAno: receitaPerdida,
      custoReposicaoAno: custoRepo,
      sangriaTotalAno: total
    });
  }, [baseClientes, ticketMedio, churnMensal, custoReposicao]);

  return (
    <Card className="border-destructive/20 bg-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="w-6 h-6" />
          Calculadora de "Sangria" Financeira
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Base de Clientes</Label>
                <span className="font-bold">{baseClientes.toLocaleString()}</span>
              </div>
              <Slider 
                value={[baseClientes]} 
                min={1000} 
                max={2000000} 
                step={1000} 
                onValueChange={(v) => setBaseClientes(v[0])} 
              />
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
                <Label>Churn Mensal (%)</Label>
                <span className="font-bold text-destructive">{churnMensal}%</span>
              </div>
              <Slider 
                value={[churnMensal]} 
                min={0.5} 
                max={5} 
                step={0.1} 
                onValueChange={(v) => setChurnMensal(v[0])} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Custo de Reposição (CRC)</Label>
                <span className="font-bold">R$ {custoReposicao}</span>
              </div>
              <Slider 
                value={[custoReposicao]} 
                min={500} 
                max={2000} 
                step={50} 
                onValueChange={(v) => setCustoReposicao(v[0])} 
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-destructive/20 shadow-sm">
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-6">Impacto Anual Estimado</h4>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Clientes Perdidos</span>
                  <span className="font-bold text-destructive">{resultados.clientesPerdidosAno.toLocaleString()} / ano</span>
                </div>
                <div className="text-xs text-muted-foreground">~{resultados.clientesPerdidosMes} por mês</div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Receita Futura Comprometida</span>
                  <span className="font-bold">R$ {resultados.receitaPerdidaAno.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Custo para Reposição (CAPEX)</span>
                  <span className="font-bold">R$ {resultados.custoReposicaoAno.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-destructive/30">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-destructive uppercase text-sm">Sangria Total</span>
                  <span className="text-3xl font-bold text-destructive">
                    R$ {(resultados.sangriaTotalAno / 1000000).toFixed(2)}M
                  </span>
                </div>
                <p className="text-xs text-destructive/80 mt-2 text-right">
                  Valor que deixa de entrar ou sai do caixa anualmente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
