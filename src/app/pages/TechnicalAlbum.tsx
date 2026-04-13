import { useNavigate } from "react-router";
import { 
  BookOpen, 
  ChevronLeft, 
  Shield, 
  Cable,
  Anchor,
  AlertTriangle
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const albumSections = [
  {
    id: "anchor-types",
    title: "Типы структурных анкеров",
    icon: Anchor,
    color: "#FF8C00",
    items: [
      {
        title: "Металлоконструкции",
        description: "Стальные балки, колонны, фермы и другие металлические элементы",
        image: "https://images.unsplash.com/photo-1727097729041-8203da53ecd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc3RlZWwlMjBiZWFtJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc3MzA1Nzk5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        keyPoints: [
          "Минимальная толщина металла: 5 мм для стали",
          "Проверка на коррозию обязательна",
          "Учёт направления нагрузки критичен",
          "Рекомендуются специализированные зажимы"
        ]
      },
      {
        title: "Железобетонные конструкции",
        description: "Бетонные колонны, балки, плиты перекрытий",
        image: "https://images.unsplash.com/photo-1691380302089-e0f59e68150b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jcmV0ZSUyMGNvbHVtbiUyMGluZHVzdHJpYWwlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzMwNTgwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        keyPoints: [
          "Минимальная прочность бетона: класс B22.5 (М300)",
          "Проверка на трещины обязательна",
          "Использование когтей или анкерных балок",
          "Запрет крепления к повреждённым участкам"
        ]
      },
      {
        title: "Временное подмащивание",
        description: "Леса, вышки-туры, подмости и другие временные конструкции",
        image: "https://images.unsplash.com/photo-1762255141399-d0396102c043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc2NhZmZvbGRpbmclMjB3b3JrZXIlMjBzYWZldHl8ZW58MXx8fHwxNzczMDU4MDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        keyPoints: [
          "Проверка устойчивости обязательна",
          "Двойной страховочный строп рекомендован",
          "Крепление к основным стойкам, не к ограждениям",
          "Леса должны быть привязаны к стационарной конструкции"
        ]
      },
      {
        title: "Трубопроводы и коммуникации",
        description: "Технологические и вентиляционные трубопроводы",
        image: "https://images.unsplash.com/photo-1772530025301-efcc9ebd8235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGlwZXMlMjB2ZW50aWxhdGlvbiUyMHN5c3RlbXxlbnwxfHx8fDE3NzMwNTgwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        keyPoints: [
          "Минимальный диаметр: 100 мм",
          "Расстояние до опоры: не более 1.5 м",
          "Проверка надёжности крепления к зданию",
          "Запрет для труб с горячими средами"
        ]
      },
      {
        title: "Технологическое оборудование",
        description: "Станки, агрегаты, массивные стационарные элементы",
        image: "https://images.unsplash.com/photo-1767281075989-7571356d477e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwbWFjaGluZXJ5JTIwZXF1aXBtZW50JTIwaW5kdXN0cmlhbHxlbnwxfHx8fDE3NzMwNTgwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        keyPoints: [
          "Масса оборудования: в 15 раз больше массы работника",
          "Стационарное крепление обязательно",
          "Крепление за несущие элементы",
          "Согласование с ответственным за оборудование"
        ]
      }
    ]
  },
  {
    id: "safety-systems",
    title: "Системы обеспечения безопасности",
    icon: Shield,
    color: "#3B82F6",
    items: [
      {
        title: "Страховочная система",
        description: "Останавливает падение работника с высоты",
        image: "https://images.unsplash.com/photo-1662309376159-b95fb193d96b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBoYXJuZXNzJTIwZmFsbCUyMHByb3RlY3Rpb24lMjB3b3JrZXJ8ZW58MXx8fHwxNzczMDU4MDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        keyPoints: [
          "Анкерная точка минимум 22 кН",
          "Обязателен амортизатор или СЗВТ",
          "Фактор падения: не более 2",
          "Минимум 4.5 м свободного пространства"
        ]
      },
      {
        title: "Удерживающая система",
        description: "Предотвращает доступ работника к зоне падения",
        image: "https://images.unsplash.com/photo-1662309376159-b95fb193d96b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBoYXJuZXNzJTIwZmFsbCUyMHByb3RlY3Rpb24lMjB3b3JrZXJ8ZW58MXx8fHwxNzczMDU4MDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        keyPoints: [
          "Длина стропа исключает доступ к краю",
          "Амортизатор не требуется",
          "Анкерная точка минимум 6 кН",
          "Точный расчёт длины обязателен"
        ]
      },
      {
        title: "Система позиционирования",
        description: "Позволяет работать с упором на строп",
        image: "https://images.unsplash.com/photo-1662309376159-b95fb193d96b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBoYXJuZXNzJTIwZmFsbCUyMHByb3RlY3Rpb24lMjB3b3JrZXJ8ZW58MXx8fHwxNzczMDU4MDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        keyPoints: [
          "Крепление к боковым D-кольцам",
          "Обязательна дополнительная страховка",
          "Угол отклонения: не более 15°",
          "Максимальная высота падения: 0.6 м"
        ]
      },
      {
        title: "Система канатного доступа",
        description: "Спуск и подъём по верёвкам",
        image: "https://images.unsplash.com/photo-1729101199373-08ef5221cb87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3BlJTIwYWNjZXNzJTIwd29ya2VyJTIwaW5kdXN0cmlhbCUyMGhlaWdodHxlbnwxfHx8fDE3NzMwNjA1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        keyPoints: [
          "Две независимые анкерные точки",
          "Рабочая и страховочная верёвки",
          "Требуется 3 группа безопасности",
          "План эвакуации обязателен"
        ]
      }
    ]
  },
  {
    id: "connection-subsystems",
    title: "Соединительные подсистемы",
    icon: Cable,
    color: "#10B981",
    items: [
      {
        title: "Строп с амортизатором",
        description: "Снижает ударную нагрузку при падении до безопасных значений",
        image: "https://images.unsplash.com/photo-1696416228396-d31a664f8881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBsYW55YXJkJTIwc2hvY2slMjBhYnNvcmJlcnxlbnwxfHx8fDE3NzMwNjA1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        keyPoints: [
          "Максимальная нагрузка: 6 кН",
          "Длина срабатывания: 1.0-1.75 м",
          "Одноразовое использование амортизатора",
          "Срок службы: 5 лет"
        ]
      },
      {
        title: "СЗВТ (втягивающее устройство)",
        description: "Автоматически регулирует длину стропа, минимизируя падение",
        image: "https://images.unsplash.com/photo-1662309376159-b95fb193d96b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBoYXJuZXNzJTIwZmFsbCUyMHByb3RlY3Rpb24lMjB3b3JrZXJ8ZW58MXx8fHwxNzczMDU4MDA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        keyPoints: [
          "Длина троса: 3-30 метров",
          "Встроенный амортизатор",
          "Падение менее 0.6 м",
          "Ежегодная проверка механизма"
        ]
      },
      {
        title: "Гибкая анкерная линия",
        description: "Горизонтальная система для перемещения вдоль рабочей зоны",
        image: "https://images.unsplash.com/photo-1668225160912-6fa910310bd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jpem9udGFsJTIwbGlmZWxpbmUlMjBzYWZldHklMjBzeXN0ZW18ZW58MXx8fHwxNzczMDYwNTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        keyPoints: [
          "Минимум две анкерные точки",
          "Максимальный пролёт: 15-20 м",
          "Требуется проектный расчёт",
          "Учёт провисания при падении"
        ]
      },
      {
        title: "Строп для позиционирования",
        description: "Регулируемый строп для удержания в рабочем положении",
        image: "https://images.unsplash.com/photo-1770120098099-27cb7502795d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY29uc3RydWN0aW9uJTIwZXF1aXBtZW50fGVufDF8fHx8MTc3MzA1MDgyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        keyPoints: [
          "Регулируемая длина: 1.5-3.0 м",
          "Крепление к боковым D-кольцам",
          "Не имеет амортизатора",
          "Только со страховочной системой"
        ]
      }
    ]
  },
  {
    id: "safety-requirements",
    title: "Требования безопасности",
    icon: AlertTriangle,
    color: "#EF4444",
    items: [
      {
        title: "Фактор падения",
        description: "Отношение глубины падения к длине стропа",
        keyPoints: [
          "Фактор падения 0: анкер над работником (идеально)",
          "Фактор падения 1: анкер на уровне ног (приемлемо)",
          "Фактор падения 2: анкер на уровне точки крепления (максимум)",
          "Фактор более 2: ЗАПРЕЩЕНО"
        ]
      },
      {
        title: "Расчёт свободного пространства",
        description: "Минимальное расстояние до препятствий при падении",
        keyPoints: [
          "Длина стропа + удлинение (обычно 1.75 м)",
          "Рост работника (1.8 м)",
          "Запас безопасности (1 м)",
          "Итого минимум: 4.5-6.0 м"
        ]
      },
      {
        title: "Эффект маятника",
        description: "Боковое раскачивание при падении с отклонением от анкера",
        keyPoints: [
          "Возникает при работе сбоку от анкерной точки",
          "Опасность удара о конструкции",
          "Минимизация: анкер над зоной работы",
          "Учёт препятствий по траектории маятника"
        ]
      },
      {
        title: "Проверка СИЗ",
        description: "Регулярный осмотр средств защиты от падения",
        keyPoints: [
          "Визуальный осмотр перед каждым использованием",
          "Периодическая проверка: минимум 1 раз в год",
          "Испытание после срабатывания или падения",
          "Ведение журнала учёта СИЗ"
        ]
      }
    ]
  }
];

export function TechnicalAlbum() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0E1A] py-6 lg:py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="mb-8 lg:mb-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#FF8C00] transition-colors mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Вернуться на главную</span>
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-gradient-to-br from-[#FF8C00] to-[#FF6B00] flex items-center justify-center shadow-lg shadow-[#FF8C00]/20">
              <BookOpen className="w-8 h-8 lg:w-10 lg:h-10 text-[#0A0E1A]" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-4xl text-white mb-2">
                Альбом технических решений
              </h1>
              <p className="text-sm lg:text-base text-[#9CA3AF]">
                АО «ОКХ «УРАЛХИМ» • Системы обеспечения безопасности работ на высоте
              </p>
            </div>
          </div>

          <div className="bg-[#FF8C00]/10 border border-[#FF8C00]/30 rounded-lg p-4 lg:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-0.5" />
              <div className="text-sm lg:text-base text-[#E8EAF0]">
                <strong className="text-[#FF8C00]">Внимание:</strong> Данный альбом содержит
                рекомендации по выбору и использованию анкерных точек и систем безопасности.
                Перед применением обязательна консультация с ответственным лицом за охрану труда.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12 lg:space-y-16">
          {albumSections.map((section) => (
            <section key={section.id} className="scroll-mt-8" id={section.id}>
              <div className="flex items-center gap-3 mb-6 lg:mb-8">
                <div 
                  className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${section.color}20`, borderLeft: `4px solid ${section.color}` }}
                >
                  <section.icon className="w-6 h-6 lg:w-7 lg:h-7" style={{ color: section.color }} />
                </div>
                <h2 className="text-xl lg:text-3xl text-white">{section.title}</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#1A2130] rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group"
                  >
                    {item.image && (
                      <div className="relative h-48 lg:h-56 overflow-hidden bg-[#0A0E1A]">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2130] via-transparent to-transparent" />
                      </div>
                    )}
                    
                    <div className="p-5 lg:p-6">
                      <h3 className="text-lg lg:text-xl text-white mb-2">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm lg:text-base text-[#9CA3AF] mb-4">
                          {item.description}
                        </p>
                      )}
                      
                      <div className="space-y-2">
                        {item.keyPoints.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div 
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                              style={{ backgroundColor: section.color }}
                            />
                            <span className="text-sm text-[#E8EAF0]">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 lg:mt-16 p-6 lg:p-8 bg-[#1A2130] rounded-xl border border-white/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg lg:text-xl text-white mb-2">
                Нужна помощь в выборе решения?
              </h3>
              <p className="text-sm lg:text-base text-[#9CA3AF]">
                Используйте мастер подбора для автоматического формирования рекомендаций
              </p>
            </div>
            <button
              onClick={() => navigate("/wizard")}
              className="w-full lg:w-auto px-6 lg:px-8 py-3 lg:py-4 rounded-lg bg-gradient-to-r from-[#FF8C00] to-[#FF6B00] text-[#0A0E1A] font-medium hover:shadow-lg hover:shadow-[#FF8C00]/30 transition-all min-h-[56px] touch-manipulation whitespace-nowrap"
            >
              Запустить мастер
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
