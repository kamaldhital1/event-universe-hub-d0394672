import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, RotateCcw, ZoomIn, ZoomOut, Maximize2, MapPin, Users, Wifi, X, Move3D, Layers, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const hotspots = [
  { id: 1, x: 25, y: 35, label: "Main Stage", capacity: "2,000", desc: "Full LED screen, Dolby Atmos sound" },
  { id: 2, x: 65, y: 28, label: "VIP Lounge", capacity: "150", desc: "Premium seating with backstage access" },
  { id: 3, x: 45, y: 70, label: "Food Court", capacity: "500", desc: "12 food stalls, outdoor seating" },
  { id: 4, x: 80, y: 55, label: "Workshop Hall", capacity: "300", desc: "Projector, round tables, breakout rooms" },
  { id: 5, x: 15, y: 65, label: "Registration", capacity: "—", desc: "6 check-in counters with QR scanners" },
];

const floorOptions = ["Ground Floor", "Level 1", "Level 2", "Rooftop"];

type Props = { venueName?: string };

const ARVenuePreview = ({ venueName = "Bengaluru Convention Center" }: Props) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [rotation, setRotation] = useState([45]);
  const [zoom, setZoom] = useState(1);
  const [floor, setFloor] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState<"day" | "night">("day");

  const Viewer = () => (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* 3D Scene simulation */}
      <div
        className={cn(
          "absolute inset-0 transition-colors duration-700",
          timeOfDay === "day"
            ? "bg-gradient-to-br from-sky-100 via-blue-50 to-emerald-50"
            : "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800"
        )}
      >
        {/* Grid floor */}
        <div className="absolute inset-0" style={{ perspective: "800px" }}>
          <motion.div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(60deg) rotateZ(${rotation[0]}deg) scale(${zoom})`,
            }}
          >
            {/* Floor grid */}
            <div className={cn(
              "absolute inset-[-50%] border-opacity-20",
              timeOfDay === "day" ? "opacity-30" : "opacity-20"
            )} style={{
              backgroundImage: `
                linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px"
            }} />

            {/* Building blocks */}
            {[
              { x: 20, y: 25, w: 30, h: 25, color: "bg-accent/40", label: "Main Stage" },
              { x: 55, y: 20, w: 20, h: 18, color: "bg-violet/40", label: "VIP" },
              { x: 35, y: 60, w: 25, h: 20, color: "bg-gold/40", label: "Food Court" },
              { x: 70, y: 45, w: 22, h: 22, color: "bg-emerald/40", label: "Workshop" },
              { x: 8, y: 55, w: 18, h: 15, color: "bg-secondary", label: "Entry" },
            ].map((block, i) => (
              <motion.div
                key={i}
                className={cn("absolute rounded-lg border border-white/30 backdrop-blur-sm", block.color)}
                style={{ left: `${block.x}%`, top: `${block.y}%`, width: `${block.w}%`, height: `${block.h}%` }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        </div>

        {/* Interactive hotspots */}
        {hotspots.map(h => (
          <motion.button
            key={h.id}
            className="absolute z-10"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
          >
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all",
              activeHotspot === h.id
                ? "bg-accent border-accent scale-125 shadow-glow"
                : "bg-card/80 border-accent/40 shadow-lg"
            )}>
              <MapPin className={cn("h-3 w-3", activeHotspot === h.id ? "text-accent-foreground" : "text-accent")} />
            </div>
            {activeHotspot !== h.id && (
              <motion.div className="absolute w-8 h-8 -inset-1 rounded-full border border-accent/30" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
            )}
          </motion.button>
        ))}

        {/* Hotspot tooltip */}
        <AnimatePresence>
          {activeHotspot && (() => {
            const h = hotspots.find(h => h.id === activeHotspot)!;
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute z-20 bg-card/95 backdrop-blur-xl rounded-xl p-3 shadow-elevated border border-border/40 w-56"
                style={{ left: `${Math.min(h.x, 60)}%`, top: `${h.y + 5}%` }}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-heading font-bold text-sm text-card-foreground">{h.label}</h4>
                  <button onClick={() => setActiveHotspot(null)}><X className="h-3 w-3 text-muted-foreground" /></button>
                </div>
                {h.capacity !== "—" && (
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-1">
                    <Users className="h-3 w-3" /> Capacity: {h.capacity}
                  </div>
                )}
                <p className="text-[11px] text-muted-foreground">{h.desc}</p>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>

      {/* Controls overlay */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
        <Button variant="glass" size="icon" className="h-8 w-8 rounded-xl" onClick={() => setZoom(z => Math.min(2, z + 0.2))}>
          <ZoomIn className="h-3.5 w-3.5" />
        </Button>
        <Button variant="glass" size="icon" className="h-8 w-8 rounded-xl" onClick={() => setZoom(z => Math.max(0.5, z - 0.2))}>
          <ZoomOut className="h-3.5 w-3.5" />
        </Button>
        <Button variant="glass" size="icon" className="h-8 w-8 rounded-xl" onClick={() => setRotation([0])}>
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <Button variant="glass" size="icon" className="h-8 w-8 rounded-xl" onClick={() => setTimeOfDay(t => t === "day" ? "night" : "day")}>
          {timeOfDay === "day" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        </Button>
        {!isFullscreen && (
          <Button variant="glass" size="icon" className="h-8 w-8 rounded-xl" onClick={() => setIsFullscreen(true)}>
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Floor selector */}
      <div className="absolute bottom-3 left-3 z-20 flex gap-1">
        {floorOptions.map((f, i) => (
          <button
            key={f}
            onClick={() => setFloor(i)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all border",
              floor === i
                ? "bg-accent text-accent-foreground border-accent shadow-glow"
                : "bg-card/80 text-muted-foreground border-border/40 backdrop-blur-sm hover:bg-card"
            )}
          >{f}</button>
        ))}
      </div>

      {/* Rotation slider */}
      <div className="absolute bottom-3 right-3 z-20 w-32 flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-border/40">
        <Move3D className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <Slider value={rotation} onValueChange={setRotation} min={0} max={360} step={1} className="flex-1" />
      </div>

      {/* Venue label */}
      <div className="absolute top-3 left-3 z-20 bg-card/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-border/40">
        <div className="flex items-center gap-2">
          <Eye className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-heading font-bold text-card-foreground">{venueName}</span>
        </div>
        <p className="text-[9px] text-muted-foreground mt-0.5">Interactive 3D Preview · {floorOptions[floor]}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Inline viewer */}
      <div className="bg-card rounded-2xl border border-border/40 shadow-card overflow-hidden">
        <div className="h-[400px]">
          <Viewer />
        </div>
        <div className="p-4 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><Wifi className="h-3 w-3" /> Virtual Tour</span>
            <span className="flex items-center gap-1"><Layers className="h-3 w-3" /> {floorOptions.length} Floors</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {hotspots.length} Points of Interest</span>
          </div>
          <Button variant="hero" size="sm" className="rounded-xl text-xs gap-1.5" onClick={() => setIsFullscreen(true)}>
            <Maximize2 className="h-3.5 w-3.5" /> Full Screen
          </Button>
        </div>
      </div>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            <Viewer />
            <Button
              variant="glass" size="icon"
              className="absolute top-4 right-4 z-[110] h-10 w-10 rounded-xl"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ARVenuePreview;
