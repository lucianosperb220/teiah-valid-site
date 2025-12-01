import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function WhitepaperDownload() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      type: "Whitepaper Download"
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Cadastro realizado com sucesso! O download iniciará em instantes.");
      } else {
        toast.error("Erro ao enviar cadastro. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro de conexão. Verifique sua internet.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Aprofunde-se nos Dados
            </h2>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              Baixe o relatório completo em PDF com todas as estatísticas de mercado, 
              análises detalhadas de churn e o guia completo de implementação da 
              inteligência preditiva para ISPs.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>Análise detalhada do cenário 2025</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>Metodologia completa de Score de Endereço</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>5 Casos de uso práticos</span>
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <Card className="w-full max-w-md bg-white text-foreground shadow-2xl border-0">
              <CardContent className="p-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="font-bold text-xl mb-2">Baixar Whitepaper Gratuito</h3>
                      <p className="text-sm text-muted-foreground">Preencha para liberar o download imediato.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input id="name" name="name" required placeholder="Seu nome" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail Corporativo</Label>
                      <Input id="email" name="email" type="email" required placeholder="seu@empresa.com.br" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">WhatsApp</Label>
                      <Input id="phone" name="phone" type="tel" required placeholder="(11) 99999-9999" />
                    </div>

                    <Button type="submit" className="w-full h-12 font-bold text-lg" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-5 w-5" /> Baixar Agora
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-2xl">Sucesso!</h3>
                    <p className="text-muted-foreground">
                      O download do seu relatório já começou. Enviamos também uma cópia para o seu e-mail.
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
                      Baixar Novamente
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
