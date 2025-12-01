import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

export default function DemoModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Agendar Demonstração
          </DialogTitle>
          <DialogDescription>
            Preencha seus dados para que nossa equipe técnica entre em contato.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            company: formData.get("company"),
            base: formData.get("base"),
            type: "Demo Request"
          };

          try {
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data)
            });

            if (response.ok) {
              toast.success("Solicitação enviada! Entraremos em contato em breve.");
              setOpen(false);
            } else {
              toast.error("Erro ao enviar solicitação. Tente novamente.");
            }
          } catch (error) {
            toast.error("Erro de conexão. Verifique sua internet.");
          }
        }}>
          <div className="grid gap-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" name="name" placeholder="Seu nome" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail Corporativo</Label>
            <Input id="email" name="email" type="email" placeholder="voce@empresa.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone / WhatsApp</Label>
            <Input id="phone" name="phone" placeholder="(11) 99999-9999" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Nome do Provedor (ISP)</Label>
            <Input id="company" name="company" placeholder="Nome da sua empresa" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="base">Tamanho da Base (aprox.)</Label>
            <Input id="base" name="base" type="number" placeholder="Ex: 5000" />
          </div>
          <Button type="submit" className="w-full mt-2">Confirmar Agendamento</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
