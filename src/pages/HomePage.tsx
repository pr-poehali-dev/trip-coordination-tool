import Icon from "@/components/ui/icon";

type Tab = "home" | "expenses" | "trips" | "calculations";

interface HomePageProps {
  onNavigate: (tab: Tab) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="animate-fade-in pb-4">
      {/* Header */}
      <div className="px-5 pt-12 pb-5 flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-0.5">Добрый день,</p>
          <h1 className="text-2xl font-bold text-foreground">Алексей 👋</h1>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-foreground text-white flex items-center justify-center font-bold text-sm">АК</div>
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[hsl(var(--accent))] rounded-full border-2 border-background" />
        </div>
      </div>

      {/* Active trip card */}
      <div className="mx-5 mb-5 rounded-2xl overflow-hidden bg-foreground text-white relative">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 20%, hsl(47 96% 53%) 0%, transparent 60%)" }} />
        <div className="relative p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--accent))] pulse-yellow" />
                <span className="text-xs text-white/60 font-medium uppercase tracking-wider">Активная поездка</span>
              </div>
              <h2 className="text-xl font-bold">Сочи 2025 🌊</h2>
              <p className="text-sm text-white/50 mt-0.5">18–22 мая · 4 участника</p>
            </div>
            <button
              onClick={() => onNavigate("trips")}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
            >
              <Icon name="ChevronRight" size={16} className="text-white/60" />
            </button>
          </div>

          {/* Budget progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/50">Бюджет</span>
              <span className="text-xs font-semibold text-white">₽ 38 400 / 60 000</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[hsl(var(--accent))] rounded-full" style={{ width: "64%" }} />
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-4">
            <div>
              <p className="text-xs text-white/50">Моя доля</p>
              <p className="text-base font-bold">₽ 9 600</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-xs text-white/50">Мне должны</p>
              <p className="text-base font-bold text-[hsl(var(--accent))]">₽ 3 200</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-xs text-white/50">Трат</p>
              <p className="text-base font-bold">14</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-5 mb-5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Быстрые действия</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate("expenses")}
            className="bg-white rounded-2xl p-4 border border-border text-left active:scale-95 transition-transform duration-150"
          >
            <div className="w-9 h-9 rounded-xl bg-[hsl(47,96%,53%,0.15)] flex items-center justify-center mb-3">
              <Icon name="Plus" size={18} className="text-[hsl(47,80%,40%)]" />
            </div>
            <p className="font-semibold text-foreground text-sm">Добавить</p>
            <p className="text-xs text-muted-foreground">трату</p>
          </button>

          <button
            onClick={() => onNavigate("expenses")}
            className="bg-white rounded-2xl p-4 border border-border text-left active:scale-95 transition-transform duration-150"
          >
            <div className="w-9 h-9 rounded-xl bg-[hsl(47,96%,53%,0.15)] flex items-center justify-center mb-3">
              <Icon name="ScanLine" size={18} className="text-[hsl(47,80%,40%)]" />
            </div>
            <p className="font-semibold text-foreground text-sm">Сканировать</p>
            <p className="text-xs text-muted-foreground">чек</p>
          </button>

          <button
            onClick={() => onNavigate("calculations")}
            className="bg-white rounded-2xl p-4 border border-border text-left active:scale-95 transition-transform duration-150"
          >
            <div className="w-9 h-9 rounded-xl bg-[hsl(47,96%,53%,0.15)] flex items-center justify-center mb-3">
              <Icon name="SendHorizonal" size={18} className="text-[hsl(47,80%,40%)]" />
            </div>
            <p className="font-semibold text-foreground text-sm">Запросить</p>
            <p className="text-xs text-muted-foreground">деньги</p>
          </button>

          <button
            onClick={() => onNavigate("trips")}
            className="bg-white rounded-2xl p-4 border border-border text-left active:scale-95 transition-transform duration-150"
          >
            <div className="w-9 h-9 rounded-xl bg-[hsl(47,96%,53%,0.15)] flex items-center justify-center mb-3">
              <Icon name="UserPlus" size={18} className="text-[hsl(47,80%,40%)]" />
            </div>
            <p className="font-semibold text-foreground text-sm">Пригласить</p>
            <p className="text-xs text-muted-foreground">участника</p>
          </button>
        </div>
      </div>

      {/* Members */}
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Участники</p>
          <button onClick={() => onNavigate("trips")} className="text-xs text-[hsl(47,80%,38%)] font-semibold">Управлять</button>
        </div>
        <div className="bg-white rounded-2xl border border-border p-4 flex flex-col gap-3">
          {[
            { name: "Алексей", initials: "АК", paid: 14200, share: 9600, isYou: true },
            { name: "Марина",  initials: "МС", paid: 12000, share: 9600, isYou: false },
            { name: "Серёжа",  initials: "СП", paid: 4800,  share: 9600, isYou: false },
            { name: "Катя",    initials: "КВ", paid: 7400,  share: 9600, isYou: false },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${m.isYou ? "bg-foreground text-white" : "bg-muted text-muted-foreground"}`}>
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{m.name}{m.isYou && <span className="text-muted-foreground font-normal"> (вы)</span>}</p>
                <p className="text-xs text-muted-foreground">заплатил ₽ {m.paid.toLocaleString()}</p>
              </div>
              <div className="text-right">
                {m.paid - m.share > 0
                  ? <span className="text-xs font-bold text-emerald-600">+₽ {(m.paid - m.share).toLocaleString()}</span>
                  : <span className="text-xs font-bold text-red-500">−₽ {Math.abs(m.paid - m.share).toLocaleString()}</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent expenses */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Последние траты</p>
          <button onClick={() => onNavigate("expenses")} className="text-xs text-[hsl(47,80%,38%)] font-semibold">Все траты</button>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { title: "Ресторан «Маяк»", amount: 5600, who: "Алекс", emoji: "🍽️", time: "Сегодня, 19:30" },
            { title: "Яхта на день",    amount: 8000, who: "Марина", emoji: "⛵", time: "Сегодня, 12:00" },
            { title: "Такси в аэропорт",amount: 1800, who: "Серёжа", emoji: "🚖", time: "Вчера, 08:15" },
          ].map((exp, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-lg flex-shrink-0">{exp.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{exp.title}</p>
                <p className="text-xs text-muted-foreground">{exp.who} · {exp.time}</p>
              </div>
              <p className="text-sm font-bold text-foreground flex-shrink-0">₽ {exp.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
