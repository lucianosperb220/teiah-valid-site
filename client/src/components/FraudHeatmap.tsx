import MapView from "@/components/Map";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ShieldAlert, MapPin, Navigation } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

// Dados simulados de cidades e bairros
const CITIES = {
  fortaleza: {
    name: "Fortaleza, CE",
    center: { lat: -3.71722, lng: -38.54335 },
    zoom: 13,
    neighborhoods: [
      { name: "Pirambu", center: { lat: -3.7097, lng: -38.5678 }, risk: "high" },
      { name: "Barra do Ceará", center: { lat: -3.70000, lng: -38.58000 }, risk: "high" },
      { name: "Jangurussu", center: { lat: -3.8333, lng: -38.5167 }, risk: "high" },
      { name: "Bom Jardim", center: { lat: -3.7833, lng: -38.6000 }, risk: "high" },
      { name: "Aldeota", center: { lat: -3.73333, lng: -38.50000 }, risk: "low" },
    ]
  },
  saopaulo: {
    name: "São Paulo, SP",
    center: { lat: -23.550520, lng: -46.633308 },
    zoom: 11,
    neighborhoods: [
      { name: "Capão Redondo", center: { lat: -23.6667, lng: -46.7833 }, risk: "high" },
      { name: "Brasilândia", center: { lat: -23.4667, lng: -46.6833 }, risk: "high" },
      { name: "Jardim Ângela", center: { lat: -23.7000, lng: -46.7667 }, risk: "high" },
      { name: "Grajau", center: { lat: -23.7500, lng: -46.6833 }, risk: "high" },
      { name: "Pinheiros", center: { lat: -23.561684, lng: -46.702988 }, risk: "low" },
    ]
  },
  riodejaneiro: {
    name: "Rio de Janeiro, RJ",
    center: { lat: -22.906847, lng: -43.172896 },
    zoom: 11,
    neighborhoods: [
      { name: "Complexo do Alemão", center: { lat: -22.8594, lng: -43.2719 }, risk: "high" },
      { name: "Rocinha", center: { lat: -22.9883, lng: -43.2483 }, risk: "high" },
      { name: "Cidade de Deus", center: { lat: -22.9486, lng: -43.3619 }, risk: "high" },
      { name: "Maré", center: { lat: -22.8567, lng: -43.2406 }, risk: "high" },
      { name: "Copacabana", center: { lat: -22.969444, lng: -43.186944 }, risk: "low" },
    ]
  }
};

export default function FraudHeatmap() {
  const [selectedCity, setSelectedCity] = useState("fortaleza");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("all");
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [heatmapLayer, setHeatmapLayer] = useState<google.maps.visualization.HeatmapLayer | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Função para gerar pontos de heatmap baseados no centro
  const generateHeatmapPoints = (center: { lat: number; lng: number }, count: number, spread: number) => {
    const points = [];
    for (let i = 0; i < count; i++) {
      const lat = center.lat + (Math.random() - 0.5) * spread;
      const lng = center.lng + (Math.random() - 0.5) * spread;
      points.push(new google.maps.LatLng(lat, lng));
    }
    return points;
  };

  // Atualizar mapa quando cidade ou bairro mudar
  useEffect(() => {
    if (!mapInstance) return;

    const city = CITIES[selectedCity as keyof typeof CITIES];
    let center = city.center;
    let zoom = city.zoom;
    let points: google.maps.LatLng[] = [];

    if (selectedNeighborhood !== "all") {
      const neighborhood = city.neighborhoods.find(n => n.name === selectedNeighborhood);
      if (neighborhood) {
        center = neighborhood.center;
        zoom = 15;
        // Gerar pontos específicos para o bairro
        points = generateHeatmapPoints(center, 50, 0.01);
      }
    } else {
      // Gerar pontos para a cidade toda (baseado nos bairros)
      city.neighborhoods.forEach(n => {
        const count = n.risk === "high" ? 100 : n.risk === "medium" ? 50 : 20;
        points = [...points, ...generateHeatmapPoints(n.center, count, 0.02)];
      });
    }

    mapInstance.panTo(center);
    mapInstance.setZoom(zoom);

    // Atualizar camada de heatmap
    if (heatmapLayer) {
      heatmapLayer.setData(points);
    } else {
      const newHeatmap = new google.maps.visualization.HeatmapLayer({
        data: points,
        map: mapInstance,
        radius: 30,
        gradient: [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 165, 0, 1)', // Laranja forte
          'rgba(255, 69, 0, 1)'   // Laranja avermelhado
        ]
      });
      setHeatmapLayer(newHeatmap);
    }

  }, [selectedCity, selectedNeighborhood, mapInstance]);

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          if (mapInstance) {
            mapInstance.panTo(pos);
            mapInstance.setZoom(15);
            // Adicionar marcador para usuário
            new google.maps.Marker({
              position: pos,
              map: mapInstance,
              title: "Sua Localização",
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "white",
                strokeWeight: 2,
              },
            });
          }
        },
        () => {
          alert("Erro ao obter localização.");
        }
      );
    } else {
      alert("Geolocalização não suportada pelo navegador.");
    }
  };

  return (
    <Card className="w-full border-destructive/20 bg-destructive/5">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <ShieldAlert className="w-5 h-5" />
              Mapa de Calor de Risco
            </CardTitle>
            <CardDescription>
              Visualização em tempo real de clusters de fraude e áreas de alto risco.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" onClick={handleLocateUser} className="gap-2">
              <Navigation className="w-4 h-4" />
              Minha Localização
            </Button>
            <Badge variant="destructive" className="animate-pulse">
              ALERTA ATIVO
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex-1">
            <Select value={selectedCity} onValueChange={(v) => { setSelectedCity(v); setSelectedNeighborhood("all"); }}>
              <SelectTrigger>
                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Selecione a Cidade" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CITIES).map(([key, city]) => (
                  <SelectItem key={key} value={key}>{city.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por Bairro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Bairros</SelectItem>
                {CITIES[selectedCity as keyof typeof CITIES].neighborhoods.map((n) => (
                  <SelectItem key={n.name} value={n.name}>{n.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-[500px] relative">
        <MapView 
          onMapReady={(map: google.maps.Map) => {
            setMapInstance(map);
          }}
        />
        
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur p-4 rounded-lg border border-border shadow-lg max-w-xs">
          <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            Legenda de Risco
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>Zona Crítica (Alta Criminalidade)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Zona de Alerta (Inadimplência Alta)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Zona Monitorada (Baixo Risco)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
