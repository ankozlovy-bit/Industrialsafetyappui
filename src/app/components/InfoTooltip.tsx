import { useState } from "react";
import { Info, BookOpen } from "lucide-react";

interface InfoTooltipProps {
  title: string;
  shortInfo: string;
  detailedInfo?: {
    description: string;
    keyPoints?: string[];
    warnings?: string[];
    image?: string;
  };
}

export function InfoTooltip({ title, shortInfo, detailedInfo }: InfoTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative inline-block">
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FF8C00]/20 
                     text-[#FF8C00] hover:bg-[#FF8C00]/30 transition-all ml-2"
          aria-label="Информация"
        >
          <Info className="w-3 h-3" />
        </button>

        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute left-0 top-8 z-50 w-72 lg:w-96 p-4 bg-[#1A2130] border border-[#FF8C00]/30 
                          rounded-lg shadow-xl shadow-black/50 animate-fadeIn">
            <div className="text-sm text-white mb-2 font-medium">{title}</div>
            <div className="text-xs text-[#9CA3AF] leading-relaxed mb-3">{shortInfo}</div>
            {detailedInfo && (
              <button
                onClick={() => {
                  setShowTooltip(false);
                  setShowModal(true);
                }}
                className="flex items-center gap-1 text-xs text-[#FF8C00] hover:text-[#FF6B00] transition-colors"
              >
                <BookOpen className="w-3 h-3" />
                <span>Подробнее</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && detailedInfo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#0A0E1A] border border-[#FF8C00]/30 rounded-xl max-w-3xl w-full max-h-[90vh] 
                       overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#1A2130] to-[#0A0E1A] p-6 border-b border-[#FF8C00]/30">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FF8C00]/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#FF8C00]" />
                  </div>
                  <h3 className="text-xl text-white">{title}</h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[#9CA3AF] hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Image */}
              {detailedInfo.image && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={detailedInfo.image}
                    alt={title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div className="text-[#E8EAF0] leading-relaxed">
                {detailedInfo.description}
              </div>

              {/* Key Points */}
              {detailedInfo.keyPoints && detailedInfo.keyPoints.length > 0 && (
                <div className="bg-[#1A2130] rounded-lg p-5 border border-white/10">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <div className="w-1 h-5 bg-[#FF8C00] rounded"></div>
                    Ключевые моменты
                  </h4>
                  <ul className="space-y-2">
                    {detailedInfo.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-[#9CA3AF]">
                        <span className="text-[#FF8C00] mt-1">•</span>
                        <span className="flex-1">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {detailedInfo.warnings && detailedInfo.warnings.length > 0 && (
                <div className="bg-[#FF8C00]/10 rounded-lg p-5 border border-[#FF8C00]/30">
                  <h4 className="text-[#FF8C00] font-medium mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Важно учитывать
                  </h4>
                  <ul className="space-y-2">
                    {detailedInfo.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-[#E8EAF0]">
                        <span className="text-[#FF8C00] mt-1">⚠</span>
                        <span className="flex-1">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#1A2130] p-4 border-t border-white/10">
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-6 py-3 rounded-lg bg-[#FF8C00] text-[#0A0E1A] font-medium
                         hover:bg-[#FF6B00] transition-all"
              >
                Понятно
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
