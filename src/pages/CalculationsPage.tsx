import { useState } from "react";
import Icon from "@/components/ui/icon";

const members = [
  { name: "Алексей", initials: "АК", isYou: true,  paid: 14200, share: 9600 },
  { name: "Марина",  initials: "МС", isYou: false, paid: 12000, share: 9600 },
  { name: "Серёжа",  initials: "СП", isYou: false, paid: 4800,  share: 9600 },
  { name: "Катя",    initials: "КВ", isYou: false, paid: 7400,  share: 9600 },
];

const transfers = [
  { from: "Серёжа", fromI: "СП", to: "Алексей", toI: "АК", amount: 3200, status: "pending"   as const },
  { from: "Катя",   fromI: "КВ", to: "Марина",  toI: "МС", amount: 1200, status: "sent"      as const },
  { from: "Серёжа", fromI: "СП", to: "Марина",  toI: "МС", amount: 1000, status: "received"  as const },
];

type TStatus = "pending" | "sent" | "received";

const statusMeta: Record<TStatus, { label: string; color: string; bg: string; border: string }> = {
  pending:  { label: "Ожидает",   color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-100" },
  sent:     { label: "Отправлен", color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-100"  },
  received: { label: "Получен",   color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
};

export default function CalculationsPage() {
  const [activeTab, setActiveTab] = useState<"balance" | "transfers">("balance");
  const [showRequest, setShowRequest] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [markedDone, setMarkedDone] = useState<number[]>([]);

  const myBalance = members.find(m => m.isYou)!;
  const iOweTo   = members.filter(m => !m.isYou && m.paid > m.share);
  const oweMeTo  = members.filter(m => !m.isYou && m.paid < m.share);

  const handleRequest = () => {
    setTimeout(() => setRequestSent(true), 600);
  };

  return (
    <div className="animate-fade-in pb-4">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <p className="text-sm text-muted-foreground mb-0.5">Сочи 2025</p>
        <h1 className="text-2xl font-bold text-foreground">Расчёты</h1>
      </div>

      {/* My balance card */}
      <div className="mx-5 mb-5">
        <div className={`rounded-2xl p-5 ${myBalance.paid - myBalance.share >= 0 ? "bg-emerald-500" : "bg-red-500"} text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 0%, white 0%, transparent 60%)" }} />
          <div className="relative">
            <p className="text-sm text-white/70 mb-1">Мой баланс</p>
            <p className="text-4xl font-bold mb-3">
              {myBalance.paid - myBalance.share >= 0 ? "+" : "−"}₽ {Math.abs(myBalance.paid - myBalance.share).toLocaleString()}
            </p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-white/60">Заплатил</p>
                <p className="text-base font-bold">₽ {myBalance.paid.toLocaleString()}</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div>
                <p className="text-xs text-white/60">Моя доля</p>
                <p className="text-base font-bold">₽ {myBalance.share.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Owed/owe mini cards */}
      <div className="px-5 mb-5 grid grid-cols-2 gap-3">
        <div className="bg-white border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingUp" size={15} className="text-emerald-500" />
            <p className="text-xs text-muted-foreground font-medium">Мне должны</p>
          </div>
          <p className="text-xl font-bold text-emerald-600">₽ 3 200</p>
          <p className="text-xs text-muted-foreground mt-0.5">1 человек</p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingDown" size={15} className="text-muted-foreground" />
            <p className="text-xs text-muted-foreground font-medium">Я должен</p>
          </div>
          <p className="text-xl font-bold text-foreground">₽ 0</p>
          <p className="text-xs text-muted-foreground mt-0.5">всё оплачено</p>
        </div>
      </div>

      {/* Request money CTA */}
      <div className="px-5 mb-5">
        <button
          onClick={() => { setShowRequest(true); setRequestSent(false); }}
          className="w-full bg-[hsl(var(--accent))] text-foreground py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform pulse-yellow"
        >
          <Icon name="SendHorizonal" size={18} />
          Запросить деньги в Т-Банке
        </button>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="flex gap-1 bg-muted p-1 rounded-xl">
          {[{ id: "balance", label: "Сводка" }, { id: "transfers", label: "Переводы" }].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "balance" | "transfers")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${activeTab === tab.id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Balance tab */}
      {activeTab === "balance" && (
        <div className="px-5 flex flex-col gap-2.5 animate-fade-in">
          {members.map((m) => {
            const balance = m.paid - m.share;
            return (
              <div key={m.name} className="bg-white rounded-2xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${m.isYou ? "bg-foreground text-white" : "bg-muted text-foreground"}`}>
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {m.name}{m.isYou && <span className="text-muted-foreground font-normal"> (вы)</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      заплатил ₽ {m.paid.toLocaleString()} · доля ₽ {m.share.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-base font-bold ${balance > 0 ? "text-emerald-600" : balance < 0 ? "text-red-500" : "text-muted-foreground"}`}>
                      {balance > 0 ? "+" : balance < 0 ? "−" : ""}₽ {Math.abs(balance).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {balance > 0 ? "переплатил" : balance < 0 ? "недоплатил" : "в балансе"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Optimal splits hint */}
          <div className="bg-[hsl(47,96%,53%,0.08)] border border-[hsl(47,96%,53%,0.2)] rounded-2xl p-4 flex items-start gap-3 mt-1">
            <Icon name="Lightbulb" size={18} className="text-[hsl(47,80%,38%)] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-foreground mb-0.5">Оптимальный расчёт</p>
              <p className="text-xs text-muted-foreground">Нужно всего <strong>2 перевода</strong> чтобы закрыть все долги в группе — перейдите на вкладку «Переводы»</p>
            </div>
          </div>
        </div>
      )}

      {/* Transfers tab */}
      {activeTab === "transfers" && (
        <div className="px-5 flex flex-col gap-3 animate-fade-in">
          <p className="text-xs text-muted-foreground">Минимальное количество переводов для закрытия всех долгов</p>

          {transfers.map((t, i) => {
            const done = markedDone.includes(i);
            const meta = statusMeta[done ? "received" : t.status];
            return (
              <div key={i} className={`bg-white rounded-2xl border border-border overflow-hidden transition-opacity ${done ? "opacity-60" : ""}`}>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-muted text-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {t.fromI}
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 relative h-px bg-border">
                        <div className={`absolute inset-0 bg-[hsl(var(--accent))] transition-all ${done || t.status !== "pending" ? "opacity-100" : "opacity-0"}`} />
                      </div>
                      <span className="text-xs font-bold text-foreground bg-white border border-border px-2 py-0.5 rounded-full">
                        ₽ {t.amount.toLocaleString()}
                      </span>
                      <div className="flex-1 relative h-px bg-border" />
                    </div>
                    <div className="w-9 h-9 rounded-full bg-foreground text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {t.toI}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{t.from} → {t.to}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${meta.bg} ${meta.border} ${meta.color}`}>
                        {done ? "Получен" : meta.label}
                      </span>
                      {!done && t.status === "pending" && (
                        <button
                          onClick={() => setMarkedDone(prev => [...prev, i])}
                          className="text-[10px] px-2.5 py-1 bg-foreground text-white rounded-full font-bold"
                        >
                          Отметить
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="bg-foreground text-white rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--accent))] flex items-center justify-center flex-shrink-0">
              <Icon name="Sparkles" size={18} className="text-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold">Итого 3 перевода</p>
              <p className="text-xs text-white/60">вместо 6 при ручном расчёте</p>
            </div>
          </div>
        </div>
      )}

      {/* ---- SHEET: Request money ---- */}
      {showRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowRequest(false)}>
          <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />

            {!requestSent ? (
              <>
                <h3 className="text-lg font-bold mb-1">Запрос денег</h3>
                <p className="text-sm text-muted-foreground mb-5">Участники получат уведомление в Т-Банке</p>

                <div className="flex flex-col gap-3 mb-5">
                  {oweMeTo.length === 0 && (
                    <div className="flex items-center gap-3 p-4 border border-border rounded-2xl">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold">СП</div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">Серёжа</p>
                        <p className="text-xs text-muted-foreground">+7 905 987-65-43</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground">₽ 3 200</p>
                        <p className="text-[10px] text-muted-foreground">к оплате</p>
                      </div>
                    </div>
                  )}
                  {/* Always show as demo */}
                  <div className="flex items-center gap-3 p-4 border border-border rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold">СП</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">Серёжа</p>
                      <p className="text-xs text-muted-foreground">Клиент Т-Банка</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">₽ 3 200</p>
                      <p className="text-[10px] text-muted-foreground">к оплате</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[hsl(47,96%,53%,0.08)] border border-[hsl(47,96%,53%,0.2)] rounded-xl p-3 mb-5 flex items-start gap-2">
                  <Icon name="Zap" size={15} className="text-[hsl(47,80%,38%)] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[hsl(47,80%,38%)] font-medium">
                    Если участник — клиент Т-Банка, перевод произойдёт в один клик. Иначе — через СБП.
                  </p>
                </div>

                <button
                  onClick={handleRequest}
                  className="w-full py-3.5 bg-[hsl(var(--accent))] text-foreground rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                >
                  <Icon name="SendHorizonal" size={16} />
                  Отправить запрос
                </button>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Запрос отправлен!</h3>
                <p className="text-sm text-muted-foreground mb-6">Серёжа получил уведомление в Т-Банке и может перевести деньги в один клик</p>
                <button onClick={() => setShowRequest(false)} className="w-full py-3 bg-foreground text-white rounded-xl font-bold text-sm">
                  Готово
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
