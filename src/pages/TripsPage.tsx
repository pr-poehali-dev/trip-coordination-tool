import { useState } from "react";
import Icon from "@/components/ui/icon";

const trips = [
  {
    id: 1,
    name: "Сочи 2024",
    dates: "18–22 апреля",
    status: "active",
    emoji: "🌊",
    members: [
      { name: "Алекс", initials: "А", isYou: true },
      { name: "Марина", initials: "М" },
      { name: "Серёжа", initials: "С" },
      { name: "Катя", initials: "К" },
    ],
    totalBudget: 60000,
    spent: 48200,
  },
  {
    id: 2,
    name: "Казань",
    dates: "10–13 марта",
    status: "completed",
    emoji: "🕌",
    members: [
      { name: "Алекс", initials: "А", isYou: true },
      { name: "Марина", initials: "М" },
      { name: "Дима", initials: "Д" },
    ],
    totalBudget: 25000,
    spent: 21600,
  },
];

export default function TripsPage() {
  const [showInvite, setShowInvite] = useState(false);
  const [showNewTrip, setShowNewTrip] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<typeof trips[0] | null>(null);

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium mb-1">Ваши путешествия</p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Поездки</h1>
        </div>
        <button
          onClick={() => setShowNewTrip(true)}
          className="w-10 h-10 bg-foreground text-white rounded-full flex items-center justify-center active:scale-95 transition-transform duration-150"
        >
          <Icon name="Plus" size={20} />
        </button>
      </div>

      <div className="px-5 flex flex-col gap-4 mb-6">
        {trips.map((trip) => {
          const spentPercent = Math.min((trip.spent / trip.totalBudget) * 100, 100);
          return (
            <div key={trip.id} className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
                    {trip.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-foreground">{trip.name}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        trip.status === "active"
                          ? "bg-[hsl(var(--accent))/0.1] text-[hsl(var(--accent))]"
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        {trip.status === "active" ? "Активна" : "Завершена"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{trip.dates}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">Потрачено</span>
                    <span className="text-xs font-semibold text-foreground">
                      ₽ {trip.spent.toLocaleString()} / {trip.totalBudget.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[hsl(var(--accent))] rounded-full transition-all duration-500"
                      style={{ width: `${spentPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {trip.members.map((member, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 border-white ${
                          member.isYou ? "bg-[hsl(var(--accent))] text-white" : "bg-foreground text-white"
                        }`}
                      >
                        {member.initials}
                      </div>
                    ))}
                  </div>

                  {trip.status === "active" && (
                    <button
                      onClick={() => { setSelectedTrip(trip); setShowInvite(true); }}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[hsl(var(--accent))] bg-[hsl(158,64%,42%,0.08)] px-3 py-1.5 rounded-full"
                    >
                      <Icon name="UserPlus" size={14} />
                      Пригласить
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showInvite && selectedTrip && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowInvite(false)}>
          <div
            className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-6 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
            <h3 className="text-lg font-bold mb-1">Пригласить в поездку</h3>
            <p className="text-sm text-muted-foreground mb-5">{selectedTrip.name}</p>

            <div className="bg-secondary rounded-2xl p-4 mb-4">
              <p className="text-xs text-muted-foreground mb-1">Ссылка-приглашение</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground flex-1 truncate">trip.app/join/sochi2024</p>
                <button className="flex-shrink-0 p-2 bg-foreground text-white rounded-lg">
                  <Icon name="Copy" size={14} />
                </button>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-sm font-semibold text-foreground mb-3">Или добавьте по имени</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Имя или @username"
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors"
                />
                <button className="w-12 h-12 bg-[hsl(var(--accent))] text-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Send" size={16} />
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground mb-3">Участники ({selectedTrip.members.length})</p>
              <div className="flex flex-col gap-2">
                {selectedTrip.members.map((member, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${
                      member.isYou ? "bg-[hsl(var(--accent))] text-white" : "bg-foreground text-white"
                    }`}>
                      {member.initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {member.name} {member.isYou && <span className="text-muted-foreground font-normal">(вы)</span>}
                      </p>
                    </div>
                    {!member.isYou && (
                      <button className="text-muted-foreground hover:text-destructive transition-colors">
                        <Icon name="X" size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewTrip && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowNewTrip(false)}>
          <div
            className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-6 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
            <h3 className="text-lg font-bold mb-4">Новая поездка</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Название поездки"
                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Дата начала"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors"
                />
                <input
                  type="text"
                  placeholder="Дата конца"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors"
                />
              </div>
              <input
                type="number"
                placeholder="Бюджет ₽ (необязательно)"
                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors"
              />
              <button className="w-full bg-foreground text-white py-3 rounded-xl font-semibold text-sm mt-1">
                Создать поездку
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
