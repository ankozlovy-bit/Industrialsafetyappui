import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  FileText,
  Boxes,
  Building2,
  Rows3,
  PipetteIcon as Pipe,
  TreeDeciduous,
  Wrench
} from "lucide-react";
import { InfoTooltip } from "../components/InfoTooltip";
import { theoryContent } from "../data/theoryContent";

interface WizardStep {
  id: number;
  title: string;
  description: string;
}

const steps: WizardStep[] = [
  { id: 1, title: "Тип конструкции", description: "Базовый анкер" },
  { id: 2, title: "Параметры системы", description: "Нагрузки и условия" },
  { id: 3, title: "Способ закрепления", description: "Выбор решения" },
  { id: 4, title: "Проверка", description: "Условия безопасности" }
];

// Helper function to get icon component by anchor type
const getIconByType = (type: string) => {
  const icons: Record<string, any> = {
    metal: Boxes,
    concrete: Building2,
    scaffolding: Rows3,
    pipes: Pipe,
    equipment: Wrench,
    natural: TreeDeciduous
  };
  return icons[type] || Boxes;
};

export function Wizard() {
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state || {};
  
  // Reconstruct anchor data from state
  const anchorData = stateData.anchorType ? {
    id: stateData.anchorType,
    title: stateData.title,
    subtitle: stateData.subtitle,
    color: stateData.color,
    description: stateData.description,
    icon: getIconByType(stateData.anchorType)
  } : null;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    constructionType: anchorData?.id || "",
    structureCondition: "good",
    temperature: "",
    materialGrade: "",
    systemType: "",
    fallFactor: "",
    workerCount: "1",
    workerWeight: "",
    attachmentMethod: "",
    connectionType: "",
    carabinerType: "",
    loadDirection: ""
  });

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Pass only serializable data
      navigate("/document", { state: { 
        formData,
        anchorType: anchorData?.id,
        anchorTitle: anchorData?.title,
        anchorColor: anchorData?.color
      } });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] py-6 lg:py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#FF8C00] transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Назад</span>
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            {anchorData && (
              <div 
                className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: `${anchorData.color}20`,
                  border: `1px solid ${anchorData.color}40`
                }}
              >
                <anchorData.icon 
                  className="w-6 h-6 lg:w-8 lg:h-8"
                  style={{ color: anchorData.color }}
                />
              </div>
            )}
            <div>
              <h2 className="text-xl lg:text-3xl text-white mb-1">
                {anchorData?.title || "Мастер настройки"}
              </h2>
              <p className="text-sm lg:text-base text-[#9CA3AF]">
                Шаг {currentStep} из {steps.length}: {steps[currentStep - 1].title}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-[#1A2130] rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF8C00] to-[#FF6B00] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step Indicators */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`p-3 lg:p-4 rounded-lg border transition-all ${
                  step.id < currentStep
                    ? "bg-[#FF8C00]/10 border-[#FF8C00]/50"
                    : step.id === currentStep
                    ? "bg-[#FF8C00]/20 border-[#FF8C00]"
                    : "bg-[#131825] border-white/10"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {step.id < currentStep ? (
                    <CheckCircle2 className="w-4 h-4 text-[#FF8C00]" />
                  ) : (
                    <span className={`text-xs ${step.id === currentStep ? "text-[#FF8C00]" : "text-[#9CA3AF]"}`}>
                      {step.id}
                    </span>
                  )}
                  <span className={`text-xs hidden lg:inline ${step.id === currentStep ? "text-white" : "text-[#9CA3AF]"}`}>
                    {step.title}
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] hidden lg:block">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-gradient-to-br from-[#131825] to-[#0A0E1A] border border-white/10 rounded-xl p-6 lg:p-8 mb-6">
          {currentStep === 1 && <Step1 formData={formData} onChange={handleInputChange} />}
          {currentStep === 2 && <Step2 formData={formData} onChange={handleInputChange} />}
          {currentStep === 3 && <Step3 formData={formData} onChange={handleInputChange} anchorType={anchorData?.id} />}
          {currentStep === 4 && <Step4 formData={formData} />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            className="px-6 lg:px-8 py-3 lg:py-4 rounded-lg border border-white/20 text-white 
                       hover:bg-white/5 transition-all min-h-[56px] touch-manipulation"
          >
            <span className="hidden sm:inline">Назад</span>
            <ChevronLeft className="w-5 h-5 sm:hidden" />
          </button>

          <button
            onClick={handleNext}
            className="flex-1 max-w-md px-6 lg:px-8 py-3 lg:py-4 rounded-lg bg-gradient-to-r from-[#FF8C00] to-[#FF6B00] 
                       text-[#0A0E1A] hover:shadow-lg hover:shadow-[#FF8C00]/30 
                       transition-all min-h-[56px] touch-manipulation active:scale-[0.98]
                       flex items-center justify-center gap-2"
          >
            <span className="text-base lg:text-lg">
              {currentStep === steps.length ? "Сформировать документ" : "Продолжить"}
            </span>
            {currentStep === steps.length ? (
              <FileText className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Step 1: Construction Type & Condition
function Step1({ formData, onChange }: { formData: any; onChange: (field: string, value: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-[#E8EAF0] mb-3">
          Состояние анкера
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: "good", label: "Отличное", icon: CheckCircle2 },
            { value: "acceptable", label: "Приемлемое", icon: Info },
            { value: "check", label: "Требует проверки", icon: AlertTriangle }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onChange("structureCondition", option.value)}
              className={`p-4 lg:p-5 rounded-lg border transition-all min-h-[80px] touch-manipulation ${
                formData.structureCondition === option.value
                  ? "bg-[#FF8C00]/20 border-[#FF8C00] text-white"
                  : "bg-[#1A2130] border-white/10 text-[#9CA3AF] hover:border-white/20"
              }`}
            >
              <option.icon className={`w-5 h-5 mb-2 mx-auto ${
                formData.structureCondition === option.value ? "text-[#FF8C00]" : "text-[#9CA3AF]"
              }`} />
              <span className="block text-sm lg:text-base">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="temperature" className="block text-sm text-[#E8EAF0] mb-3">
          Температурный режим (°C)
        </label>
        <input
          id="temperature"
          type="number"
          value={formData.temperature}
          onChange={(e) => onChange("temperature", e.target.value)}
          placeholder="Укажите температуру окружающей среды"
          className="w-full px-4 lg:px-5 py-3 lg:py-4 rounded-lg bg-[#1A2130] border border-white/10 
                     text-white placeholder:text-[#6B7280] focus:border-[#FF8C00] 
                     focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all
                     min-h-[56px] text-base lg:text-lg"
        />
      </div>

      <div>
        <label htmlFor="materialGrade" className="block text-sm text-[#E8EAF0] mb-3">
          Марка материала (если применимо)
        </label>
        <select
          id="materialGrade"
          value={formData.materialGrade}
          onChange={(e) => onChange("materialGrade", e.target.value)}
          className="w-full px-4 lg:px-5 py-3 lg:py-4 rounded-lg bg-[#1A2130] border border-white/10 
                     text-white focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 
                     outline-none transition-all min-h-[56px] text-base lg:text-lg"
        >
          <option value="">Выберите марку материала</option>
          <option value="B15">Бетон B15</option>
          <option value="B20">Бетон B20</option>
          <option value="B25">Бетон B25</option>
          <option value="steel-st3">Сталь Ст3</option>
          <option value="steel-09g2s">Сталь 09Г2С</option>
        </select>
      </div>
    </div>
  );
}

// Step 2: System Parameters
function Step2({ formData, onChange }: { formData: any; onChange: (field: string, value: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-[#E8EAF0] mb-3 flex items-center">
          Тип системы
          <InfoTooltip
            title="Тип системы безопасности"
            shortInfo="Выбор системы зависит от характера работ и расположения рабочей зоны относительно края"
            detailedInfo={theoryContent.systemTypes["fall-arrest"]?.detailedInfo}
          />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { value: "restraint", label: "Удерживающая" },
            { value: "fall-arrest", label: "Страховочная" },
            { value: "positioning", label: "Позиционирование" },
            { value: "rope-access", label: "Канатный доступ" }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onChange("systemType", option.value)}
              className={`p-4 lg:p-5 rounded-lg border transition-all min-h-[64px] touch-manipulation ${
                formData.systemType === option.value
                  ? "bg-[#FF8C00]/20 border-[#FF8C00] text-white"
                  : "bg-[#1A2130] border-white/10 text-[#9CA3AF] hover:border-white/20"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#E8EAF0] mb-3 flex items-center">
          Фактор падения
          <InfoTooltip
            title="Фактор падения"
            shortInfo="Отношение глубины падения к длине стропа. Чем меньше, тем безопаснее."
            detailedInfo={{
              description: "Фактор падения — это отношение глубины (высоты) возможного падения к длине стропа, соединяющего работника с анкерной точкой. Это ключевой параметр безопасности при работе на высоте.",
              keyPoints: [
                "Фактор падения 0: анкерная точка находится над головой работника (идеальный вариант)",
                "Фактор падения 1: анкер на уровне ног работника (приемлемо)",
                "Фактор падения 2: анкер на уровне точки крепления привязи (максимально допустимо)",
                "Фактор падения более 2: ЗАПРЕЩЕНО - критически опасно"
              ],
              warnings: [
                "При факторе падения 2 нагрузка на работника и анкер максимальна",
                "Рекомендуется всегда стремиться к фактору падения 0",
                "Амортизатор обязателен при факторе падения более 0.3",
                "Необходим расчёт свободного пространства для безопасной остановки"
              ]
            }}
          />
        </label>
        <div className="grid grid-cols-3 gap-3">
          {["0", "1", "2"].map((factor) => (
            <button
              key={factor}
              onClick={() => onChange("fallFactor", factor)}
              className={`p-4 lg:p-5 rounded-lg border transition-all min-h-[64px] touch-manipulation ${
                formData.fallFactor === factor
                  ? "bg-[#FF8C00]/20 border-[#FF8C00] text-white text-xl"
                  : "bg-[#1A2130] border-white/10 text-[#9CA3AF] hover:border-white/20 text-xl"
              }`}
            >
              {factor}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="workerCount" className="block text-sm text-[#E8EAF0] mb-3">
            Количество работников
          </label>
          <input
            id="workerCount"
            type="number"
            min="1"
            value={formData.workerCount}
            onChange={(e) => onChange("workerCount", e.target.value)}
            className="w-full px-4 lg:px-5 py-3 lg:py-4 rounded-lg bg-[#1A2130] border border-white/10 
                       text-white focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 
                       outline-none transition-all min-h-[56px] text-base lg:text-lg"
          />
        </div>

        <div>
          <label htmlFor="workerWeight" className="block text-sm text-[#E8EAF0] mb-3">
            Вес работника (кг)
          </label>
          <input
            id="workerWeight"
            type="number"
            value={formData.workerWeight}
            onChange={(e) => onChange("workerWeight", e.target.value)}
            placeholder="100"
            className="w-full px-4 lg:px-5 py-3 lg:py-4 rounded-lg bg-[#1A2130] border border-white/10 
                       text-white placeholder:text-[#6B7280] focus:border-[#FF8C00] 
                       focus:ring-2 focus:ring-[#FF8C00]/20 outline-none transition-all
                       min-h-[56px] text-base lg:text-lg"
          />
        </div>
      </div>
    </div>
  );
}

// Step 3: Attachment Method
function Step3({ formData, onChange, anchorType }: { formData: any; onChange: (field: string, value: string) => void; anchorType?: string }) {
  const getRecommendations = () => {
    switch (anchorType) {
      case "metal":
        return [
          { value: "loop-wrap", label: "Анкерная петля в обхват" },
          { value: "beam-clamp", label: "Зажим для балок" },
          { value: "railing-multi", label: "Объединение стоек ограждения" }
        ];
      case "concrete":
        return [
          { value: "climbing-kit", label: "Когти + строп позиционирования" },
          { value: "beam-opening", label: "Анкерная балка для проёмов" },
          { value: "loop-noose", label: "Анкерная петля на удавку" }
        ];
      case "scaffolding":
        return [
          { value: "double-lanyard", label: "Двойной страховочный строп" },
          { value: "flexible-line", label: "Гибкая анкерная линия" },
          { value: "crossover", label: "За перекрестия элементов" }
        ];
      case "pipes":
        return [
          { value: "pipe-wrap", label: "Обхват трубопровода" },
          { value: "multiple-pipes", label: "Распределение на несколько труб" },
          { value: "vent-base", label: "У основания вентиляционной трубы" }
        ];
      case "equipment":
        return [
          { value: "stationary-mass", label: "За массивный элемент" },
          { value: "machinery-hook", label: "За крюк/элемент техники" },
          { value: "frame-structure", label: "За раму/станину" }
        ];
      case "natural":
        return [
          { value: "tree-base", label: "Многократный обхват у комля" },
          { value: "tree-noose", label: "На удавку вокруг ствола" },
          { value: "tree-multiple", label: "За несколько деревьев" }
        ];
      default:
        return [
          { value: "method-1", label: "Способ закрепления 1" },
          { value: "method-2", label: "Способ закрепления 2" },
          { value: "method-3", label: "Способ закрепления 3" }
        ];
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-[#E8EAF0] mb-3">
          Рекомендуемый способ закрепления
        </label>
        <div className="space-y-3">
          {getRecommendations().map((option) => (
            <button
              key={option.value}
              onClick={() => onChange("attachmentMethod", option.value)}
              className={`w-full p-4 lg:p-5 rounded-lg border transition-all text-left min-h-[64px] touch-manipulation ${
                formData.attachmentMethod === option.value
                  ? "bg-[#FF8C00]/20 border-[#FF8C00] text-white"
                  : "bg-[#1A2130] border-white/10 text-[#9CA3AF] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base lg:text-lg">{option.label}</span>
                {formData.attachmentMethod === option.value && (
                  <CheckCircle2 className="w-5 h-5 text-[#FF8C00]" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-[#E8EAF0] mb-3">
          Тип соединительной подсистемы
        </label>
        <select
          value={formData.connectionType}
          onChange={(e) => onChange("connectionType", e.target.value)}
          className="w-full px-4 lg:px-5 py-3 lg:py-4 rounded-lg bg-[#1A2130] border border-white/10 
                     text-white focus:border-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20 
                     outline-none transition-all min-h-[56px] text-base lg:text-lg"
        >
          <option value="">Выберите тип</option>
          <option value="shock-absorber">Строп с амортизатором</option>
          <option value="retractable">СЗВТ (втягивающее устройство)</option>
          <option value="flexible-line">Гибкая анкерная линия</option>
          <option value="positioning-lanyard">Строп для позиционирования</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-[#E8EAF0] mb-3">
          Направление нагрузки
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: "shear", label: "Срез/Сдвиг" },
            { value: "pullout", label: "Вырыв" },
            { value: "bending", label: "Изгиб" }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onChange("loadDirection", option.value)}
              className={`p-4 lg:p-5 rounded-lg border transition-all min-h-[64px] touch-manipulation ${
                formData.loadDirection === option.value
                  ? "bg-[#FF8C00]/20 border-[#FF8C00] text-white"
                  : "bg-[#1A2130] border-white/10 text-[#9CA3AF] hover:border-white/20"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 4: Safety Check
function Step4({ formData }: { formData: any }) {
  const checks = [
    {
      id: 1,
      title: "Прочность точки крепления",
      status: "passed",
      message: "Достаточная прочность подтверждена"
    },
    {
      id: 2,
      title: "Исключение работы карабина на излом",
      status: "passed",
      message: "Конфигурация крепления безопасна"
    },
    {
      id: 3,
      title: "Фактор падения",
      status: formData.fallFactor === "0" ? "passed" : "warning",
      message: formData.fallFactor === "0" 
        ? "Оптимальный фактор падения (0)" 
        : "Фактор падения требует дополнительных мер"
    },
    {
      id: 4,
      title: "Состояние структурного анкера",
      status: formData.structureCondition === "good" ? "passed" : "warning",
      message: formData.structureCondition === "good"
        ? "Состояние анкера удовлетворительное"
        : "Рекомендуется дополнительная проверка"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg lg:text-xl text-white mb-2">
          Проверка условий безопасности
        </h3>
        <p className="text-sm text-[#9CA3AF]">
          Автоматическая проверка соответствия требованиям безопасности
        </p>
      </div>

      {checks.map((check) => (
        <div
          key={check.id}
          className={`p-4 lg:p-5 rounded-lg border ${
            check.status === "passed"
              ? "bg-[#10B981]/10 border-[#10B981]/30"
              : "bg-[#F59E0B]/10 border-[#F59E0B]/30"
          }`}
        >
          <div className="flex items-start gap-3">
            {check.status === "passed" ? (
              <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h4 className="text-sm lg:text-base text-white mb-1">
                {check.title}
              </h4>
              <p className="text-xs lg:text-sm text-[#9CA3AF]">
                {check.message}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 lg:p-5 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm lg:text-base text-white mb-1">
              Готово к формированию документов
            </h4>
            <p className="text-xs lg:text-sm text-[#9CA3AF]">
              На основе введённых данных будет сформирован Наряд-допуск 
              и технологическая карта работ на высоте
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}