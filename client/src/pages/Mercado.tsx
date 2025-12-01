import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, DollarSign, Users } from "lucide-react";
import SangriaCalculator from "@/components/SangriaCalculator";

export default function Mercado() {
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
              Diagnóstico de Mercado
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
              O IMPOSTO OCULTO <br /> DO CHURN
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              O mercado brasileiro de banda larga fixa cresce exponencialmente, mas esconde uma crise de rentabilidade. 
              Provedores sangram receita através de inadimplência crônica e rotatividade evitável.
            </p>
          </motion.div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8 text-center">Quanto sua operação perde hoje?</h2>
            <SangriaCalculator />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div className="space-y-12">
              <div className="border-l-2 border-primary pl-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <AlertTriangle className="text-destructive" /> Inadimplência Crônica
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Representa <strong className="text-foreground">55%</strong> das causas de churn. O maior vilão e o mais evitável.
                  Inadimplência é comportamento e risco. Quando a operação é preditiva, o churn cai drasticamente.
                </p>
              </div>
              
              <div className="border-l-2 border-primary pl-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <TrendingUp className="text-destructive" /> Churn Volátil
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  Drena mais de <strong className="text-foreground">R$ 12 bilhões</strong> anuais do setor.
                  Com 53 milhões de assinantes e churn médio de 1,5%, são perdidos 8,79 milhões de clientes por ano.
                </p>
              </div>

              <div className="border-l-2 border-primary pl-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <DollarSign className="text-destructive" /> Endividamento Operacional
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  O CAPEX de expansão vira CAPEX de recomposição.
                  O setor cresce, mas não progride. O churn se tornou o novo OPEX silencioso do setor.
                </p>
              </div>
            </div>

            <div className="relative h-full">
              <div className="bg-secondary p-12 border border-border h-full flex flex-col justify-center">
                <h3 className="text-xl font-bold uppercase tracking-wider mb-6">Oportunidade Brasil</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Acessos Banda Larga</span>
                    <span className="font-bold">53+ Milhões</span>
                  </li>
                  <li className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">ISPs Ativos</span>
                    <span className="font-bold">22.000+</span>
                  </li>
                  <li className="flex justify-between border-b border-border pb-2">
                    <span className="text-muted-foreground">Perda Anual Setor</span>
                    <span className="font-bold text-destructive">R$ 12 Bilhões</span>
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
