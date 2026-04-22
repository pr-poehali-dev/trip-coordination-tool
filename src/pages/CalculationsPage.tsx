import { useState } from "react";
import Icon from "@/components/ui/icon";

const settlements = [
  { from: "Серёжа", to: "Алекс", amount: 3200, fromInitials: "С", toInitials: "А" },
  { from: "Катя", to: "Марина", amount: 2100, fromInitials: "К", toInitials: "М" },
  { from: "Дима", to: "Алекс", amount: 1800, fromInitials: "Д", toInitials: "А" },
];

const myDebts = [
  { person: "Марина", amount: 3200, type: "owe", initials: "М" },
  { person: "Серёжа", amount: 5400, type: "owed", initials: "С" },
];

const tripSummary = [
  { person: "Алекс", paid: 7100, share: 6000, balance: 1100, initials: "А", isYou: true },
  { person: "Марина", paid: 12000, share: 6000, balance: 6000, initials: "М" },
  { person: "Серёжа", paid: 1200, share: 6000, balance: -4800, initials: "С" },
  { person: "Катя", paid: 3600, share: 6000, balance: -2400, initials: "К" },
];

export default function CalculationsPage() {
  const [activeTab, setActiveTab] = useState<"summary" | "settlements">("summary");

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-12 pb-4">
        <p className="text-sm text-muted-foreground font-medium mb-1">Финансовый итог</p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Расчёты</h1>
      </div>

      <div className="px-5 mb-5 grid grid-cols-2 gap-3">
        {myDebts.map((debt) => (
          <div key={debt.person} className={`rounded-2xl p-4 ${
            debt.type === "owe" ? "bg-red-50 border border-red-100" : "bg-emerald-50 border border-emerald-100"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                debt.type === "owe" ? "bg-red-200 text-red-700" : "bg-emerald-200 text-emerald-700"
              }`}>
                {debt.initials}
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                {debt.type === "owe" ? "Вы должны" : "Вам должны"}
              </p>
            </div>
            <p className={`text-xl font-bold ${debt.type === "owe" ? "text-red-600" : "text-emerald-600"}`}>
              ₽ {debt.amount.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">{debt.person}</p>
          </div>
        ))}
      </div>

      <div className="px-5 mb-5">
        <div className="flex gap-1 bg-secondary p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("summary")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "summary" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Сводка
          </button>
          <button
            onClick={() => setActiveTab("settlements")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === "settlements" ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Переводы
          </button>
        </div>
      </div>

      {activeTab === "summary" && (
        <div className="px-5 flex flex-col gap-3 animate-fade-in">
          {tripSummary.map((person) => (
            <div key={person.person} className="bg-white rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  person.isYou ? "bg-[hsl(var(--accent))] text-white" : "bg-foreground text-white"
                }`}>
                  {person.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">
                    {person.person} {person.isYou && <span className="text-muted-foreground font-normal">(вы)</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">Заплатил: ₽ {person.paid.toLocaleString()}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`font-bold text-base ${
                    person.balance > 0 ? "text-emerald-600" : person.balance < 0 ? "text-red-500" : "text-muted-foreground"
                  }`}>
                    {person.balance > 0 ? "+" : ""}₽ {person.balance.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-muted-foreground">баланс</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "settlements" && (
        <div className="px-5 flex flex-col gap-3 animate-fade-in">
          <p className="text-sm text-muted-foreground">Минимальное количество переводов для закрытия долгов</p>
          {settlements.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-foreground text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {s.fromInitials}
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1 h-px bg-border relative">
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                      <span className="text-xs font-bold text-foreground">₽ {s.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <Icon name="ArrowRight" size={14} className="text-muted-foreground flex-shrink-0" />
                </div>
                <div className="w-9 h-9 rounded-full bg-[hsl(var(--accent))] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {s.toInitials}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-muted-foreground">{s.from} → {s.to}</p>
                <button className="flex items-center gap-1 text-xs font-semibold text-[hsl(var(--accent))] bg-[hsl(158,64%,42%,0.08)] px-3 py-1.5 rounded-full">
                  <Icon name="Check" size={12} />
                  Отметить
                </button>
              </div>
            </div>
          ))}

          <div className="bg-foreground text-white rounded-2xl p-4 flex items-center gap-3 mt-2">
            <Icon name="Sparkles" size={20} className="text-[hsl(var(--accent))] flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold">Всего 3 перевода</p>
              <p className="text-xs text-white/60">чтобы закрыть все долги в группе</p>
            </div>
          </div>
        </div>
      )}

      <div className="h-6" />
    </div>
  );
}
