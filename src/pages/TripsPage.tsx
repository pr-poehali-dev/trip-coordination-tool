import { useState } from "react";
import Icon from "@/components/ui/icon";

type Phase = "planning" | "active" | "completed";

interface Trip {
  id: number;
  name: string;
  emoji: string;
  dates: string;
  daysLeft?: number;
  phase: Phase;
  members: { name: string; initials: string; isYou?: boolean; confirmed?: boolean; phone?: string }[];
  budget?: number;
  spent?: number;
  destination?: string;
}

const trips: Trip[] = [
  {
    id: 1,
    name: "Сочи 2025",
    emoji: "🌊",
    dates: "18–22 мая 2025",
    daysLeft: 26,
    phase: "planning",
    destination: "Сочи, Краснодарский край",
    budget: 60000,
    spent: 0,
    members: [
      { name: "Алексей", initials: "АК", isYou: true, confirmed: true },
      { name: "Марина",  initials: "МС", confirmed: true, phone: "+7 916 123-45-67" },
      { name: "Серёжа",  initials: "СП", confirmed: false, phone: "+7 905 987-65-43" },
      { name: "Катя",    initials: "КВ", confirmed: true, phone: "+7 903 456-78-90" },
    ],
  },
  {
    id: 2,
    name: "Казань",
    emoji: "🕌",
    dates: "10–13 марта 2025",
    phase: "completed",
    budget: 25000,
    spent: 21600,
    members: [
      { name: "Алексей", initials: "АК", isYou: true },
      { name: "Марина",  initials: "МС" },
      { name: "Дима",    initials: "ДО" },
    ],
  },
];

const phaseLabels: Record<Phase, { label: string; color: string; bg: string }> = {
  planning:  { label: "Планирование", color: "text-blue-600",   bg: "bg-blue-50 border-blue-100" },
  active:    { label: "В поездке",    color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
  completed: { label: "Завершена",    color: "text-muted-foreground", bg: "bg-muted border-border" },
};

const planningSteps = [
  { icon: "MapPin",    label: "Направление",   done: true,  value: "Сочи" },
  { icon: "Calendar",  label: "Даты",          done: true,  value: "18–22 мая" },
  { icon: "Wallet",    label: "Бюджет",         done: true,  value: "₽ 60 000" },
  { icon: "Users",     label: "Участники",      done: false, value: "1 не подтвердил" },
  { icon: "CreditCard",label: "Предоплаты",     done: false, value: "Нет" },
];

export default function TripsPage() {
  const [showNew, setShowNew] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showPrepaySheet, setShowPrepaySheet] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newTripStep, setNewTripStep] = useState(1);

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const activeTrip = trips.find(t => t.phase === "planning");

  return (
    <div className="animate-fade-in pb-4">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-0.5">Ваши путешествия</p>
          <h1 className="text-2xl font-bold text-foreground">Поездки</h1>
        </div>
        <button
          onClick={() => { setShowNew(true); setNewTripStep(1); }}
          className="bg-[hsl(var(--accent))] text-foreground px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 active:scale-95 transition-transform duration-150"
        >
          <Icon name="Plus" size={16} />
          Новая
        </button>
      </div>

      {/* Planning checklist for active trip */}
      {activeTrip && (
        <div className="mx-5 mb-5 bg-white rounded-2xl border border-border overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-border flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Подготовка к поездке</p>
              <p className="font-bold text-foreground">{activeTrip.name} {activeTrip.emoji}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[hsl(var(--accent))]">{activeTrip.daysLeft}</p>
              <p className="text-xs text-muted-foreground leading-none">дней</p>
            </div>
          </div>
          <div className="px-4 py-3 flex flex-col gap-2.5">
            {planningSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? "bg-[hsl(var(--accent))]" : "bg-muted"}`}>
                  {step.done
                    ? <Icon name="Check" size={12} className="text-foreground" />
                    : <span className="text-[10px] text-muted-foreground font-bold">{i + 1}</span>
                  }
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                </div>
                <p className={`text-xs font-semibold ${step.done ? "text-muted-foreground" : "text-[hsl(47,80%,38%)]"}`}>{step.value}</p>
              </div>
            ))}
          </div>
          <div className="px-4 pb-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => { setSelectedTrip(activeTrip); setShowInvite(true); }}
              className="py-2.5 rounded-xl bg-[hsl(47,96%,53%,0.12)] text-[hsl(47,80%,38%)] text-sm font-semibold flex items-center justify-center gap-1.5"
            >
              <Icon name="UserPlus" size={15} />
              Пригласить
            </button>
            <button
              onClick={() => setShowPrepaySheet(true)}
              className="py-2.5 rounded-xl bg-foreground text-white text-sm font-semibold flex items-center justify-center gap-1.5"
            >
              <Icon name="CreditCard" size={15} />
              Предоплата
            </button>
          </div>
        </div>
      )}

      {/* Trip list */}
      <div className="px-5 flex flex-col gap-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Все поездки</p>
        {trips.map((trip) => {
          const phase = phaseLabels[trip.phase];
          const pct = trip.budget && trip.spent !== undefined ? Math.round((trip.spent / trip.budget) * 100) : 0;
          return (
            <div key={trip.id} className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl flex-shrink-0">
                    {trip.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-foreground">{trip.name}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${phase.bg} ${phase.color}`}>
                        {phase.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{trip.dates}</p>
                  </div>
                </div>

                {trip.budget !== undefined && trip.spent !== undefined && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-muted-foreground">Бюджет</span>
                      <span className="text-xs font-semibold">₽ {trip.spent.toLocaleString()} / {trip.budget.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[hsl(var(--accent))] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {trip.members.map((m, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border-2 border-white ${m.isYou ? "bg-foreground text-white" : m.confirmed === false ? "bg-muted text-muted-foreground" : "bg-secondary text-foreground"}`}>
                        {m.initials}
                      </div>
                    ))}
                  </div>
                  {trip.phase === "planning" && (
                    <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                      <Icon name="Clock" size={12} />
                      <span className="font-semibold">1 ожидает</span>
                    </div>
                  )}
                  {trip.phase === "completed" && (
                    <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      <Icon name="CheckCircle" size={12} />
                      <span className="font-semibold">Закрыта</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- SHEET: Invite ---- */}
      {showInvite && selectedTrip && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowInvite(false)}>
          <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
            <h3 className="text-lg font-bold mb-1">Пригласить в поездку</h3>
            <p className="text-sm text-muted-foreground mb-5">{selectedTrip.name} {selectedTrip.emoji}</p>

            {/* Link */}
            <div className="bg-muted rounded-2xl p-4 mb-4">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Ссылка-приглашение</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono text-foreground flex-1 truncate">tinkoff.ru/trip/sochi2025abc</p>
                <button
                  onClick={handleCopyLink}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copiedLink ? "bg-emerald-500 text-white" : "bg-foreground text-white"}`}
                >
                  {copiedLink ? "Скопировано!" : "Копировать"}
                </button>
              </div>
            </div>

            {/* Share via T-Bank */}
            <div className="mb-5">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Отправить через Т-Банк</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {["💬 Чат", "📱 SMS", "📤 Поделиться"].map((item) => (
                  <button key={item} className="flex-shrink-0 px-4 py-2 bg-[hsl(47,96%,53%,0.12)] text-[hsl(47,80%,38%)] rounded-xl text-sm font-semibold border border-[hsl(47,96%,53%,0.2)]">
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Members */}
            <div>
              <p className="text-sm font-bold text-foreground mb-3">Участники ({selectedTrip.members.length})</p>
              <div className="flex flex-col gap-3">
                {selectedTrip.members.map((m, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${m.isYou ? "bg-foreground text-white" : m.confirmed === false ? "bg-amber-100 text-amber-700" : "bg-muted text-foreground"}`}>
                      {m.initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        {m.name}
                        {m.isYou && <span className="text-muted-foreground font-normal"> (вы)</span>}
                      </p>
                      {m.phone && <p className="text-xs text-muted-foreground">{m.phone}</p>}
                    </div>
                    {m.confirmed === false && (
                      <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100 font-semibold">Ожидает</span>
                    )}
                    {m.confirmed === true && !m.isYou && (
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 font-semibold">Принял</span>
                    )}
                    {!m.isYou && (
                      <button className="text-muted-foreground ml-1">
                        <Icon name="X" size={15} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add new */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="+7 или @username в Т-Банке"
                  className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-muted text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors"
                />
                <button className="w-11 h-11 bg-[hsl(var(--accent))] text-foreground rounded-xl flex items-center justify-center font-bold">
                  <Icon name="Plus" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---- SHEET: Prepay ---- */}
      {showPrepaySheet && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowPrepaySheet(false)}>
          <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
            <h3 className="text-lg font-bold mb-1">Совместная предоплата</h3>
            <p className="text-sm text-muted-foreground mb-5">Собрать деньги до поездки — жильё, билеты, аренда</p>

            <div className="flex flex-col gap-3 mb-5">
              {[
                { label: "Апартаменты «Морская 14»", amount: 24000, paid: 3, total: 4, icon: "🏠" },
                { label: "Аренда авто 4 дня",         amount: 16000, paid: 1, total: 4, icon: "🚗" },
              ].map((item, i) => (
                <div key={i} className="border border-border rounded-2xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">₽ {item.amount.toLocaleString()} на всех · {item.paid}/{item.total} оплатили</p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-[hsl(var(--accent))] rounded-full" style={{ width: `${(item.paid / item.total) * 100}%` }} />
                  </div>
                  <button className="w-full py-2 bg-[hsl(var(--accent))] text-foreground text-sm font-bold rounded-xl">
                    Оплатить ₽ {Math.round(item.amount / item.total).toLocaleString()}
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full py-3 bg-foreground text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              <Icon name="Plus" size={16} />
              Добавить предоплату
            </button>
          </div>
        </div>
      )}

      {/* ---- SHEET: New Trip (multi-step) ---- */}
      {showNew && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowNew(false)}>
          <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-5">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`flex-1 h-1 rounded-full transition-all ${s <= newTripStep ? "bg-[hsl(var(--accent))]" : "bg-muted"}`} />
              ))}
            </div>

            {newTripStep === 1 && (
              <>
                <h3 className="text-lg font-bold mb-1">Куда едем?</h3>
                <p className="text-sm text-muted-foreground mb-5">Шаг 1 из 3 — основная информация</p>
                <div className="flex flex-col gap-3">
                  <input type="text" placeholder="Название поездки" className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors" />
                  <input type="text" placeholder="Направление (город, страна)" className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Начало" className="px-4 py-3 rounded-xl border border-border bg-muted text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors" />
                    <input type="text" placeholder="Конец" className="px-4 py-3 rounded-xl border border-border bg-muted text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors" />
                  </div>
                  <button onClick={() => setNewTripStep(2)} className="w-full py-3 bg-[hsl(var(--accent))] text-foreground rounded-xl font-bold text-sm mt-1">
                    Далее →
                  </button>
                </div>
              </>
            )}

            {newTripStep === 2 && (
              <>
                <h3 className="text-lg font-bold mb-1">Бюджет и участники</h3>
                <p className="text-sm text-muted-foreground mb-5">Шаг 2 из 3</p>
                <div className="flex flex-col gap-3">
                  <input type="number" placeholder="Общий бюджет ₽ (необязательно)" className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors" />
                  <div className="border border-border rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-2">Разделение трат</p>
                    <div className="flex gap-2">
                      {["Поровну", "По факту", "Вручную"].map((opt) => (
                        <button key={opt} className={`flex-1 py-2 rounded-lg text-xs font-semibold ${opt === "Поровну" ? "bg-foreground text-white" : "bg-muted text-muted-foreground"}`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Добавить участника" className="flex-1 px-4 py-3 rounded-xl border border-border bg-muted text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors" />
                    <button className="w-12 h-12 bg-[hsl(var(--accent))] text-foreground rounded-xl flex items-center justify-center font-bold">
                      <Icon name="Plus" size={18} />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setNewTripStep(1)} className="flex-1 py-3 bg-muted text-foreground rounded-xl font-bold text-sm">← Назад</button>
                    <button onClick={() => setNewTripStep(3)} className="flex-1 py-3 bg-[hsl(var(--accent))] text-foreground rounded-xl font-bold text-sm">Далее →</button>
                  </div>
                </div>
              </>
            )}

            {newTripStep === 3 && (
              <>
                <h3 className="text-lg font-bold mb-1">Готово к запуску!</h3>
                <p className="text-sm text-muted-foreground mb-5">Шаг 3 из 3 — подтверждение</p>
                <div className="bg-muted rounded-2xl p-4 mb-4">
                  <div className="flex flex-col gap-2">
                    {[["Поездка", "Сочи 2025 🌊"], ["Даты", "18–22 мая 2025"], ["Бюджет", "₽ 60 000"], ["Участников", "4"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{k}</span>
                        <span className="text-xs font-semibold text-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-5 p-3 bg-[hsl(47,96%,53%,0.08)] border border-[hsl(47,96%,53%,0.2)] rounded-xl">
                  <Icon name="Sparkles" size={16} className="text-[hsl(47,80%,38%)] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[hsl(47,80%,38%)] font-medium">Участники получат уведомление в Т-Банке и смогут подтвердить участие</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setNewTripStep(2)} className="flex-1 py-3 bg-muted text-foreground rounded-xl font-bold text-sm">← Назад</button>
                  <button onClick={() => setShowNew(false)} className="flex-1 py-3 bg-foreground text-white rounded-xl font-bold text-sm">Создать поездку</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
