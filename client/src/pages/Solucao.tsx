import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { CheckCircle2, Cpu, Database, Lock, Network } from "lucide-react";
import FraudHeatmap from "@/components/FraudHeatmap";
import FraudLossCalculator from "@/components/FraudLossCalculator";

export default function Solucao() {
  const steps = [
    "Consolidação Multiprovedor",
    "Normalização de Dados",
    "Deduplicação de Endereços",
    "Classificação de Inadimplência",
    "Cálculo de Permanência (Tenure)",
    "Cálculo de Dívida do Endereço",
    "Score Base TeiaH",
    "Score Intermediado",
    "Score Preditivo Final",
    "Classificação de Risco"
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
              A Tecnologia
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              INTELIGÊNCIA <br /> DO ENDEREÇO
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              O TeiaH Valid abandona a visão limitada do CPF para abraçar a inteligência do ecossistema do endereço. 
              Nossa IA constrói uma "persona digital" do local, prevendo comportamentos futuros com base em dados históricos reais.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            <div className="bg-card border border-border p-8 hover:border-primary transition-colors">
                <Cpu className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">Machine Learning</h3>
                <p className="text-muted-foreground">
                  Algoritmos treinados com milhões de registros de cancelamento e reativação. 
                  Identifica padrões ocultos impossíveis de detectar manualmente.
                </p>
              </div>
              
              <div className="bg-card border border-border p-8 hover:border-primary transition-colors">
                <Network className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">Efeito de Rede</h3>
                <p className="text-muted-foreground">
                  Quanto mais provedores utilizam, mais inteligente o sistema se torna. 
                  Uma rede colaborativa de proteção contra fraudes e inadimplência.
                </p>
              </div>
              
              <div className="bg-card border border-border p-8 hover:border-primary transition-colors">
                <Lock className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">Segurança de Dados</h3>
                <p className="text-muted-foreground">
                  Conformidade total com a LGPD. Dados anonimizados e tratados com 
                  os mais altos padrões de segurança e criptografia.
                </p>
              </div>
            </div>

          <div className="mb-24">
            <div className="bg-destructive/5 border border-destructive/20 p-12 rounded-lg">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <span className="text-destructive font-bold uppercase tracking-widest text-sm mb-4 block">
                    Segurança Avançada
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                    Combate à Fraude e ao Crime Organizado
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    O TeiaH Valid vai além da análise de crédito. Nossa inteligência analítica identifica padrões complexos utilizados por fraudadores e grupos criminosos para explorar provedores de internet.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-destructive mt-1" />
                      <div>
                        <strong className="block text-foreground">Detecção de Laranjas</strong>
                        <span className="text-muted-foreground text-sm">Identificação de múltiplos contratos em nomes diferentes para o mesmo endereço físico.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-destructive mt-1" />
                      <div>
                        <strong className="block text-foreground">Mapeamento de Áreas de Risco</strong>
                        <span className="text-muted-foreground text-sm">Alertas sobre regiões com histórico de equipamentos não devolvidos e inadimplência sistêmica.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-destructive mt-1" />
                      <div>
                        <strong className="block text-foreground">Rodízio de CPFs</strong>
                        <span className="text-muted-foreground text-sm">Bloqueio preventivo de novas instalações em locais onde há troca constante de titularidade para evadir cobranças.</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex-1 flex flex-col gap-8">
                  <FraudHeatmap />
                  <FraudLossCalculator />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary p-12 border border-border">
            <h3 className="text-3xl font-bold mb-12 text-center">Fluxo Analítico de 10 Etapas</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-background p-6 border border-border h-full flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold mb-4 text-sm">
                      {index + 1}
                    </div>
                    <p className="font-medium text-sm">{step}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
