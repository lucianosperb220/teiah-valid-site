import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import RoiSimulator from "@/components/RoiSimulator";

export default function Impacto() {
  const dataInadimplencia = [
    { name: 'Atual', valor: 3000000, label: 'R$ 3.0M' },
    { name: 'Com TeiaH', valor: 1500000, label: 'R$ 1.5M' },
  ];

  const dataChurn = [
    { mes: 'Mês 1', semTeiaH: 2.5, comTeiaH: 2.4 },
    { mes: 'Mês 3', semTeiaH: 2.6, comTeiaH: 2.1 },
    { mes: 'Mês 6', semTeiaH: 2.5, comTeiaH: 1.8 },
    { mes: 'Mês 9', semTeiaH: 2.7, comTeiaH: 1.5 },
    { mes: 'Mês 12', semTeiaH: 2.5, comTeiaH: 1.2 },
  ];

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mb-20"
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
              Resultados Mensuráveis
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              ROI COMPROVADO
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A implementação do TeiaH Valid não é um custo, é um investimento de alto retorno. 
              Para um provedor médio com 10.000 clientes, a economia anual pode ultrapassar R$ 1,5 milhão.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div className="bg-card border border-border p-8">
              <h3 className="text-xl font-bold mb-6">Redução de Inadimplência (Anual)</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataInadimplencia} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                      formatter={(value) => [`R$ ${(value as number / 1000000).toFixed(1)}M`, 'Perda Anual']}
                    />
                    <Bar dataKey="valor" fill="var(--primary)" barSize={40} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                *Cenário base: Provedor com 10k clientes, ticket R$ 100, inadimplência reduzida de 25% para 12.5%.
              </p>
            </div>

            <div className="bg-card border border-border p-8">
              <h3 className="text-xl font-bold mb-6">Evolução da Taxa de Churn (%)</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataChurn}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mes" />
                    <YAxis domain={[0, 3]} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }} />
                    <Legend />
                    <Line type="monotone" dataKey="semTeiaH" name="Sem TeiaH" stroke="#ef4444" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="comTeiaH" name="Com TeiaH" stroke="var(--primary)" strokeWidth={3} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                *Redução progressiva do churn à medida que a base é qualificada pela IA.
              </p>
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8 text-center">Simule seu Cenário</h2>
            <RoiSimulator />
          </div>

          <div className="bg-primary text-primary-foreground p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">ROI Acumulado: 170%</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              O investimento se paga integralmente nos primeiros meses de operação, gerando caixa livre para expansão.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
              <div className="bg-white/10 p-6 backdrop-blur-sm">
                <h4 className="text-lg font-bold mb-2">Economia Direta</h4>
                <p className="text-sm opacity-80">Redução de perdas com inadimplência e fraudes.</p>
              </div>
              <div className="bg-white/10 p-6 backdrop-blur-sm">
                <h4 className="text-lg font-bold mb-2">Receita Retida</h4>
                <p className="text-sm opacity-80">Manutenção de clientes que sairiam da base (LTV).</p>
              </div>
              <div className="bg-white/10 p-6 backdrop-blur-sm">
                <h4 className="text-lg font-bold mb-2">Eficiência OPEX</h4>
                <p className="text-sm opacity-80">Menos deslocamentos improdutivos e instalações de risco.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
