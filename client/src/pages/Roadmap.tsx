import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Roadmap() {
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
              Próximos Passos
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              ROADMAP DE <br /> IMPLEMENTAÇÃO
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Um plano estruturado para integrar a inteligência do TeiaH Valid à sua operação, 
              garantindo resultados rápidos e escaláveis.
            </p>
          </motion.div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            
            {/* Phase 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary group-[.is-active]:bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <span className="font-bold text-sm">1</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-8 border border-border hover:border-primary transition-colors">
                <div className="flex items-center justify-between space-x-2 mb-4">
                  <h3 className="font-bold text-xl">Implantação Inicial</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1">Mês 1</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                    Integração via API com ERP do provedor
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                    Treinamento da equipe comercial
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                    Ativação do módulo de consulta de endereço
                  </li>
                </ul>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-background border-border group-[.is-active]:bg-primary text-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <span className="font-bold text-sm">2</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-8 border border-border hover:border-primary transition-colors">
                <div className="flex items-center justify-between space-x-2 mb-4">
                  <h3 className="font-bold text-xl">Escalonamento</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-1">Mês 2-3</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                    Expansão para 100% das novas vendas
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                    Análise retroativa da base de clientes atual
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                    Ajuste fino dos parâmetros de risco
                  </li>
                </ul>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-background border-border group-[.is-active]:bg-primary text-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <span className="font-bold text-sm">3</span>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-8 border border-border hover:border-primary transition-colors">
                <div className="flex items-center justify-between space-x-2 mb-4">
                  <h3 className="font-bold text-xl">TeiaH Score Full</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-1">Mês 4+</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                    Implementação do Score Preditivo Avançado
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                    Automação de ações de retenção baseadas em risco
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground text-sm">
                    <Check className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
                    Integração total com fluxo de marketing
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
