import { useLocation, useNavigate } from "react-router";
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  Shield,
  Calendar,
  User,
  Building2,
  AlertTriangle,
  ChevronLeft
} from "lucide-react";

export function DocumentGenerator() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location.state || {};
  const { formData, anchorType, anchorTitle, anchorColor } = stateData;

  const currentDate = new Date().toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const getAttachmentMethodText = (value: string) => {
    const methods: Record<string, string> = {
      "loop-wrap": "Анкерная петля в обхват на удавку",
      "beam-clamp": "Зажим для двутавровых балок (Вариант №4)",
      "railing-multi": "Объединение нескольких стоек ограждения",
      "climbing-kit": "Когти + строп для позиционирования + СЗВТ",
      "beam-opening": "Анкерная балка для проёмов",
      "loop-noose": "Анкерная петля на удавку",
      "double-lanyard": "Двойной страховочный строп (2 ветви)",
      "flexible-line": "Гибкая анкерная линия",
      "crossover": "Крепление за перекрестия элементов",
      "pipe-wrap": "Обхват трубопровода петлёй",
      "multiple-pipes": "Распределение нагрузки на несколько трубопроводов",
      "vent-base": "Крепление у основания вентиляционной трубы",
      "stationary-mass": "Крепление за массивный неподвижный элемент",
      "machinery-hook": "Крепление за крюк/элемент техники",
      "frame-structure": "Крепление за раму/станину оборудования",
      "tree-base": "Многократный обхват вокруг ствола у комля",
      "tree-noose": "Крепление на удавку вокруг ствола дерева",
      "tree-multiple": "Распределение за несколько деревьев"
    };
    return methods[value] || value;
  };

  const getSystemTypeText = (value: string) => {
    const types: Record<string, string> = {
      "restraint": "Удерживающая система",
      "fall-arrest": "Страховочная система",
      "positioning": "Система позиционирования",
      "rope-access": "Система канатного доступа"
    };
    return types[value] || value;
  };

  const getConnectionTypeText = (value: string) => {
    const types: Record<string, string> = {
      "shock-absorber": "Строп с амортизатором",
      "retractable": "СЗВТ (средство защиты втягивающего типа)",
      "flexible-line": "Гибкая анкерная линия",
      "positioning-lanyard": "Строп для позиционирования"
    };
    return types[value] || value;
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] py-6 lg:py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/wizard", { state: { 
              anchorType,
              title: anchorTitle,
              color: anchorColor
            } })}
            className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#FF8C00] transition-colors mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Вернуться к мастеру</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-xl lg:text-3xl text-white mb-2">
                Наряд-допуск на работы на высоте
              </h2>
              <p className="text-sm lg:text-base text-[#9CA3AF]">
                Автоматически сформированный документ
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg bg-[#1A2130] 
                               border border-white/10 text-white hover:bg-white/5 transition-all
                               min-h-[48px] touch-manipulation">
                <Printer className="w-4 h-4" />
                <span className="text-sm lg:text-base">Печать</span>
              </button>
              <button className="flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg 
                               bg-gradient-to-r from-[#FF8C00] to-[#FF6B00] text-[#0A0E1A] 
                               hover:shadow-lg hover:shadow-[#FF8C00]/30 transition-all
                               min-h-[48px] touch-manipulation">
                <Download className="w-4 h-4" />
                <span className="text-sm lg:text-base">Скачать PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Document Preview */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Document Header */}
          <div className="bg-gradient-to-r from-[#0A0E1A] to-[#1A2130] p-6 lg:p-8 border-b-4 border-[#FF8C00]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg bg-[#FF8C00] flex items-center justify-center">
                  <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-[#0A0E1A]" />
                </div>
                <div>
                  <h3 className="text-base lg:text-lg text-white">
                    АО «ОКХ «УРАЛХИМ»
                  </h3>
                  <p className="text-xs lg:text-sm text-[#9CA3AF]">
                    Альбом технических решений
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xs lg:text-sm text-[#9CA3AF] mb-1">УТВЕРЖДАЮ</div>
                <div className="h-8 border-b border-white/20 w-32 lg:w-40 mb-1"></div>
                <div className="text-xs text-[#6B7280]">«___» ________ 2024 г.</div>
              </div>
            </div>
          </div>

          {/* Document Body */}
          <div className="p-6 lg:p-10 bg-white text-gray-900">
            {/* Title */}
            <div className="text-center mb-8 lg:mb-12">
              <h1 className="text-xl lg:text-3xl mb-3">
                НАРЯД-ДОПУСК №_______
              </h1>
              <h2 className="text-base lg:text-xl text-gray-700">
                на производство работ на высоте
              </h2>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-10">
              <InfoCard
                icon={Calendar}
                label="Дата выдачи"
                value={currentDate}
              />
              <InfoCard
                icon={Building2}
                label="Объект"
                value="Производственная площадка"
              />
              <InfoCard
                icon={User}
                label="Ответственный исполнитель"
                value="________________"
              />
              <InfoCard
                icon={Shield}
                label="Группа работ"
                value="Работы на высоте (1 группа)"
              />
            </div>

            {/* Main Section */}
            <div className="border-2 border-gray-200 rounded-lg p-5 lg:p-8 mb-6 lg:mb-8 bg-gray-50">
              <h3 className="text-base lg:text-xl mb-4 lg:mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#FF8C00]" />
                <span>1. Системы обеспечения безопасности работ на высоте</span>
              </h3>

              <div className="space-y-4 lg:space-y-6">
                <Section
                  title="1.1. Тип конструкции (базовый анкер)"
                  content={anchorTitle || "Не указано"}
                />

                <Section
                  title="1.2. Тип системы безопасности"
                  content={getSystemTypeText(formData?.systemType)}
                />

                <Section
                  title="1.3. Способ закрепления"
                  content={`${getAttachmentMethodText(formData?.attachmentMethod)} согласно Альбому технических решений АО «ОКХ «УРАЛХИМ»`}
                  highlight
                />

                <Section
                  title="1.4. Соединительная подсистема"
                  content={getConnectionTypeText(formData?.connectionType)}
                />

                <Section
                  title="1.5. Параметры системы"
                  content={
                    <ul className="space-y-2 text-sm lg:text-base">
                      <li>• Фактор падения: <strong>{formData?.fallFactor || "0"}</strong></li>
                      <li>• Количество работников: <strong>{formData?.workerCount || "1"} чел.</strong></li>
                      <li>• Вес работника: <strong>{formData?.workerWeight || "100"} кг</strong></li>
                      <li>• Направление нагрузки: <strong>{formData?.loadDirection === "shear" ? "Срез/Сдвиг" : formData?.loadDirection === "pullout" ? "Вырыв" : "Изгиб"}</strong></li>
                    </ul>
                  }
                />
              </div>
            </div>

            {/* Safety Requirements */}
            <div className="border-2 border-[#FF8C00] rounded-lg p-5 lg:p-8 mb-6 lg:mb-8 bg-orange-50">
              <h3 className="text-base lg:text-xl mb-4 lg:mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#FF8C00]" />
                <span>2. Особые условия и меры безопасности</span>
              </h3>

              <div className="space-y-3 text-sm lg:text-base">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                  <p>Исключить риск работы карабина «на излом»</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                  <p>Обеспечить фактор падения не более 1 (рекомендуется 0)</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                  <p>Проверить состояние структурного анкера перед началом работ</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                  <p>Провести осмотр средств индивидуальной защиты от падения</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
                  <p>Учесть температурный режим работы: {formData?.temperature || "—"} °C</p>
                </div>
              </div>
            </div>

            {/* Equipment List */}
            <div className="border-2 border-gray-200 rounded-lg p-5 lg:p-8 mb-8 lg:mb-10 bg-gray-50">
              <h3 className="text-base lg:text-xl mb-4 lg:mb-6">
                3. Перечень необходимых СИЗ от падения
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 text-sm lg:text-base">
                <EquipmentItem name="Страховочная привязь" />
                <EquipmentItem name={getConnectionTypeText(formData?.connectionType)} />
                <EquipmentItem name="Карабин овальный с муфтой" />
                <EquipmentItem name={getAttachmentMethodText(formData?.attachmentMethod)} />
                <EquipmentItem name="Каска защитная" />
                <EquipmentItem name="Перчатки рабочие" />
              </div>
            </div>

            {/* Signatures */}
            <div className="border-t-2 border-gray-300 pt-6 lg:pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <SignatureBlock title="Наряд выдал" />
                <SignatureBlock title="Ответственный руководитель" />
                <SignatureBlock title="Ответственный исполнитель" />
              </div>

              <div className="mt-8 lg:mt-10 p-4 lg:p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="text-xs lg:text-sm text-gray-700 leading-relaxed">
                  <strong>Примечание:</strong> Данный документ сформирован автоматически на основе введённых параметров 
                  и требований Альбома технических решений АО «ОКХ «УРАЛХИМ». Перед использованием 
                  необходимо проверить соответствие всех указанных параметров фактическим условиям работы.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 rounded-lg border border-white/20 
                     text-white hover:bg-white/5 transition-all min-h-[56px] touch-manipulation"
          >
            Вернуться на главную
          </button>
          <button
            onClick={() => navigate("/wizard")}
            className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 rounded-lg bg-[#1A2130] 
                     border border-white/10 text-white hover:bg-white/5 transition-all
                     min-h-[56px] touch-manipulation"
          >
            Создать новый документ
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-gray-100 rounded-lg">
      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-[#FF8C00]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs lg:text-sm text-gray-500 mb-0.5">{label}</div>
        <div className="text-sm lg:text-base text-gray-900 truncate">{value}</div>
      </div>
    </div>
  );
}

function Section({ title, content, highlight }: { title: string; content: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`${highlight ? "bg-orange-50 border-l-4 border-[#FF8C00] pl-4 py-2" : ""}`}>
      <h4 className="text-sm lg:text-base text-gray-600 mb-2">{title}</h4>
      <div className="text-sm lg:text-base text-gray-900">
        {typeof content === "string" ? <p>{content}</p> : content}
      </div>
    </div>
  );
}

function EquipmentItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 p-2 lg:p-3 bg-white border border-gray-200 rounded">
      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
      <span className="text-gray-900">{name}</span>
    </div>
  );
}

function SignatureBlock({ title }: { title: string }) {
  return (
    <div>
      <div className="text-xs lg:text-sm text-gray-600 mb-2">{title}</div>
      <div className="border-b-2 border-gray-300 mb-1 h-8"></div>
      <div className="text-xs text-gray-500">(подпись, Ф.И.О.)</div>
      <div className="text-xs text-gray-500 mt-2">«___» ________ 2024 г.</div>
    </div>
  );
}