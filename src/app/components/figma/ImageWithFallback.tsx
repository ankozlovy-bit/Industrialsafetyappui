import { useState } from "react";

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gradient-to-br from-[#1A2130] to-[#0A0E1A] text-center align-middle ${className ?? ""}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(#FF8C00 1px, transparent 1px), linear-gradient(90deg, #FF8C00 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-lg bg-[#FF8C00]/10 border border-[#FF8C00]/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-[#FF8C00]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-xs text-[#9CA3AF] uppercase tracking-wider">Изображение</span>
        </div>
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  );
}
