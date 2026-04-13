import { Outlet, useNavigate, useLocation } from "react-router";
import { Shield, AlertTriangle, BookOpen } from "lucide-react";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <header className="border-b border-white/10 bg-[#0A0E1A]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-br from-[#FF8C00] to-[#FF6B00] shadow-lg shadow-[#FF8C00]/20">
                <Shield className="w-6 h-6 lg:w-7 lg:h-7 text-[#0A0E1A]" />
              </div>
              <div>
                <h1 className="text-base lg:text-lg tracking-tight text-white">
                  УРАЛХИМ
                </h1>
                <p className="text-xs lg:text-sm text-[#9CA3AF] tracking-wide">
                  Центр безопасности высотных работ
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/album")}
                className={`group relative flex items-center gap-2.5 px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg transition-all duration-300 min-h-[44px] lg:min-h-[48px] touch-manipulation overflow-hidden ${
                  location.pathname === "/album" 
                    ? "bg-gradient-to-r from-[#FF8C00] to-[#FF6B00] text-[#0A0E1A] shadow-lg shadow-[#FF8C00]/40" 
                    : "bg-gradient-to-r from-[#FF8C00] to-[#FF6B00] text-[#0A0E1A] shadow-lg shadow-[#FF8C00]/30 hover:shadow-xl hover:shadow-[#FF8C00]/50 hover:scale-105"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {location.pathname === "/album" && (
                  <div className="absolute inset-0 rounded-lg border-2 border-white/30 animate-pulse" />
                )}
                
                <BookOpen className="w-5 h-5 lg:w-5 lg:h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm lg:text-base font-semibold hidden sm:inline relative z-10 tracking-wide">
                  Альбом решений
                </span>
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg bg-[#FF8C00]/10 border border-[#FF8C00]/30">
                <AlertTriangle className="w-4 h-4 text-[#FF8C00]" />
                <span className="text-xs lg:text-sm text-[#FF8C00] tracking-wide hidden sm:inline">
                  Высотная безопасность
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)]">
        <Outlet />
      </main>
    </div>
  );
}
