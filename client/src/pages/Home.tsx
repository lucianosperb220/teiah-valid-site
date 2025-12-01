import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Shield, Zap, MapPin } from "lucide-react";
import WhitepaperDownload from "@/components/WhitepaperDownload";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute right-0 top-0 w-2/3 h-full bg-[url('/hero-bg.png')] bg-cover bg-center" />
        </div>
        
        <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 border border-primary text-primary text-xs font-bold uppercase tracking-widest mb-6">
                Relatório Estratégico 2025
              </span>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-foreground mb-6">
                INTELIGÊNCIA <br />
                <span className="text-primary">PREDITIVA</span> <br />
                PARA ISPs
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light">
                O TeiaH Valid transforma o endereço na unidade central de análise de risco, 
                antecipando inadimplência e churn com precisão inédita.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href="/solucao">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none h-14 px-8 text-sm font-bold uppercase tracking-wider w-full sm:w-auto">
                  Conheça a Solução <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/impacto">
                <Button variant="outline" size="lg" className="border-foreground text-foreground hover:bg-foreground hover:text-background rounded-none h-14 px-8 text-sm font-bold uppercase tracking-wider w-full sm:w-auto">
                  Ver Impacto Financeiro
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-square bg-secondary p-8 border border-border relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <MapPin className="w-12 h-12 text-primary opacity-20" />
                </div>
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-4xl font-bold mb-2">53M</h3>
                    <p className="text-sm uppercase tracking-wider text-muted-foreground">Acessos Banda Larga</p>
                  </div>
                  <div className="w-full h-px bg-border my-4" />
                  <div>
                    <h3 className="text-4xl font-bold mb-2 text-destructive">1,5%</h3>
                    <p className="text-sm uppercase tracking-wider text-muted-foreground">Churn Médio Mensal</p>
                  </div>
                  <div className="w-full h-px bg-border my-4" />
                  <div>
                    <h3 className="text-4xl font-bold mb-2 text-primary">170%</h3>
                    <p className="text-sm uppercase tracking-wider text-muted-foreground">ROI Projetado (Ano 1)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Insights Grid */}
      <section className="py-24 bg-white border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            <div className="bg-background p-12 hover:bg-secondary/30 transition-colors group">
              <div className="mb-6 text-primary group-hover:scale-110 transition-transform duration-300 origin-left">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Análise de Risco 360°</h3>
              <p className="text-muted-foreground leading-relaxed">
                Superamos a limitação do CPF. Nossa IA analisa o histórico comportamental do endereço, identificando padrões invisíveis aos bureaus tradicionais.
              </p>
            </div>
            
            <div className="bg-background p-12 hover:bg-secondary/30 transition-colors group">
              <div className="mb-6 text-primary group-hover:scale-110 transition-transform duration-300 origin-left">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Prevenção de Churn</h3>
              <p className="text-muted-foreground leading-relaxed">
                Identifique clientes com alta propensão ao cancelamento antes que aconteça. Ações proativas baseadas em dados reais de mercado.
              </p>
            </div>
            
            <div className="bg-background p-12 hover:bg-secondary/30 transition-colors group">
              <div className="mb-6 text-primary group-hover:scale-110 transition-transform duration-300 origin-left">
                <BarChart3 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">ROI Mensurável</h3>
              <p className="text-muted-foreground leading-relaxed">
                Redução drástica de custos operacionais e inadimplência. O investimento se paga em meses, não anos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section with CEO */}
      <section className="py-24 bg-secondary border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-start">
              <a 
                href="https://www.linkedin.com/in/lucianosperbcastagnino/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary hover:bg-primary/20 transition-colors cursor-pointer"
                title="Visitar LinkedIn"
              >
                <span className="text-4xl font-bold text-primary">LC</span>
              </a>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <blockquote className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-8 text-primary">
                "A verdadeira disputa não é pelo cliente. É por não perder o próprio."
              </blockquote>
              <div className="w-24 h-1 bg-primary mx-0 mb-6" />
              <div>
                <h4 className="text-2xl font-bold text-foreground">Luciano Sperb Castagnino</h4>
                <p className="text-muted-foreground uppercase tracking-wider text-sm mt-1">CEO & Founder TeiaH Valid</p>
                <p className="text-muted-foreground mt-4 max-w-xl">
                  Mais de 30 anos no mercado de telecom, especialista em churn, retenção e crescimento sustentável de base.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhitepaperDownload />
    </Layout>
  );
}
