import { useNavigate } from "react-router";
import { 
  Boxes, 
  Building2, 
  Rows3, 
  PipetteIcon as Pipe,
  TreeDeciduous,
  Wrench,
  ChevronRight,
  Shield,
  BookOpen
} from "lucide-react";

interface AnchorPoint {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

const anchorPoints: AnchorPoint[] = [
  {
    id: "metal",
    title: "Металлоконструкции",
    subtitle: "Steel Structures",
    icon: Boxes,
    color: "#FF8C00",
    description: "Балки, арматура, ограждения"
  },
  {
    id: "concrete",
    title: "Железобетон",
    subtitle: "Reinforced Concrete",
    icon: Building2,
    color: "#3B82F6",
    description: "Колонны, опоры ЛЭП, проёмы"
  },
  {
    id: "scaffolding",
    title: "Подмащивание",
    subtitle: "Scaffolding Systems",
    icon: Rows3,
    color: "#10B981",
    description: "Леса, лестницы, люльки"
  },
  {
    id: "pipes",
    title: "Коммуникации",
    subtitle: "Engineering Systems",
    icon: Pipe,
    color: "#F59E0B",
    description: "Трубопроводы, вентиляция"
  },
  {
    id: "equipment",
    title: "Оборудование",
    subtitle: "Machinery & Equipment",
    icon: Wrench,
    color: "#8B5CF6",
    description: "Станки, установки, техника"
  },
  {
    id: "natural",
    title: "Деревья",
    subtitle: "Natural Anchors",
    icon: TreeDeciduous,
    color: "#22C55E",
    description: "Природные точки крепления"
  }
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-12">
      {/* Title Section */}
      <div className="mb-8 lg:mb-12">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-[#FF8C00]" />
          <h2 className="text-2xl lg:text-4xl tracking-tight text-white">
            Выбор точки анкерного крепления
          </h2>
        </div>
        <p className="text-sm lg:text-base text-[#9CA3AF] max-w-3xl">
          Выберите тип конструкции для определения способа закрепления системы обеспечения безопасности работ на высоте
        </p>
      </div>

      {/* Grid of Anchor Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {anchorPoints.map((point) => {
          const Icon = point.icon;
          return (
            <button
              key={point.id}
              onClick={() => navigate("/wizard", { state: { 
                anchorType: point.id,
                title: point.title,
                subtitle: point.subtitle,
                color: point.color,
                description: point.description
              } })}
              className="group relative bg-gradient-to-br from-[#131825] to-[#0A0E1A] border border-white/10 rounded-xl p-6 lg:p-8 
                         hover:border-[#FF8C00]/50 hover:shadow-xl hover:shadow-[#FF8C00]/10 
                         transition-all duration-300 text-left overflow-hidden
                         active:scale-[0.98] touch-manipulation min-h-[160px] lg:min-h-[200px]"
            >
              {/* Background Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-2xl"
                style={{ backgroundColor: point.color }}
              />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4 lg:mb-6">
                  <div 
                    className="flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ 
                      backgroundColor: `${point.color}20`,
                      border: `1px solid ${point.color}40`
                    }}
                  >
                    <Icon 
                      className="w-7 h-7 lg:w-8 lg:h-8"
                      style={{ color: point.color }}
                    />
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#FF8C00] group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg lg:text-xl text-white group-hover:text-[#FF8C00] transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-[#9CA3AF] tracking-wide uppercase">
                    {point.description}
                  </p>
                </div>
              </div>

              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                   style={{
                     backgroundImage: `linear-gradient(${point.color} 1px, transparent 1px), 
                                      linear-gradient(90deg, ${point.color} 1px, transparent 1px)`,
                     backgroundSize: '20px 20px'
                   }}
              />
            </button>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="mt-8 lg:mt-12 p-4 lg:p-6 rounded-xl bg-[#1A2130] border border-[#3B82F6]/30">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <h4 className="text-sm lg:text-base text-white mb-1">
              Альбом технических решений
            </h4>
            <p className="text-xs lg:text-sm text-[#9CA3AF] leading-relaxed">
              Система автоматически подберёт оптимальное решение на основе параметров объекта 
              и требований безопасности согласно нормативным документам АО «ОКХ «УРАЛХИМ»
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}