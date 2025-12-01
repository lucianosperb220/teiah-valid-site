import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import DemoModal from "@/components/DemoModal";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Visão Geral" },
    { href: "/mercado", label: "O Problema" },
    { href: "/solucao", label: "A Solução" },
    { href: "/impacto", label: "Impacto Financeiro" },
    { href: "/roadmap", label: "Roadmap" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-border py-2" : "bg-transparent py-4"
      )}>
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="/logo-teiah.png" alt="TeiaH Valid" className="h-16 w-auto" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary cursor-pointer uppercase tracking-wider",
                    location === item.href
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <DemoModal>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-none px-6 font-bold uppercase tracking-wider text-xs">
                Agendar Demo
              </Button>
            </DemoModal>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border p-6 flex flex-col gap-4 shadow-lg">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={cn(
                    "text-lg font-medium block py-2 cursor-pointer",
                    location === item.href ? "text-primary" : "text-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <DemoModal>
              <Button className="w-full bg-primary text-white rounded-none mt-4">
                Agendar Demo
              </Button>
            </DemoModal>
          </div>
        )}
      </header>

      <main className="flex-1 pt-20">
        {children}
      </main>

      <footer className="bg-secondary py-16 border-t border-border">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo-teiah.png" alt="TeiaH Valid" className="h-16 w-auto" />
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Tecnologia que antecipa riscos e oportunidades no mercado de internet.
              Transformando dados em decisões estratégicas para provedores de todo o Brasil.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6 text-sm">Navegação</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6 text-sm">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>contato@teiah.com.br</li>
              <li>Santa Cruz do Sul - RS</li>
              <li>Av. Leo Kraeter, 1566</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-wider">
          <p>© 2025 TeiaH Tecnologia. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <span>Privacidade</span>
            <span>Termos de Uso</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
