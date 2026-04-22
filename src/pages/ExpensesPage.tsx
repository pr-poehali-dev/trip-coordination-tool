import { useState } from "react";
import Icon from "@/components/ui/icon";

const categories = ["Все", "Еда", "Жильё", "Транспорт", "Развлечения", "Прочее"];

const expenses = [
  { id: 1, title: "Ресторан «Причал»", category: "Еда", amount: 4800, paidBy: "Алекс", date: "20 апр", emoji: "🍽️", participants: 4 },
  { id: 2, title: "Апартаменты", category: "Жильё", amount: 12000, paidBy: "Марина", date: "19 апр", emoji: "🏠", participants: 4 },
  { id: 3, title: "Такси из аэропорта", category: "Транспорт", amount: 1200, paidBy: "Серёжа", date: "18 апр", emoji: "🚖", participants: 3 },
  { id: 4, title: "Боулинг", category: "Развлечения", amount: 3600, paidBy: "Катя", date: "18 апр", emoji: "🎳", participants: 4 },
  { id: 5, title: "Продукты", category: "Еда", amount: 2300, paidBy: "Алекс", date: "17 апр", emoji: "🛒", participants: 4 },
];

export default function ExpensesPage() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [showAddForm, setShowAddForm] = useState(false);

  const filtered = activeCategory === "Все"
    ? expenses
    : expenses.filter(e => e.category === activeCategory);

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-12 pb-4">
        <p className="text-sm text-muted-foreground font-medium mb-1">Текущая поездка</p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Траты</h1>
      </div>

      <div className="mx-5 mb-5 bg-foreground text-white rounded-2xl p-5">
        <p className="text-sm text-white/60 mb-1">Общая сумма</p>
        <p className="text-3xl font-bold">₽ {total.toLocaleString()}</p>
        <div className="mt-3 flex items-center gap-4">
          <div>
            <p className="text-xs text-white/50">Моя доля</p>
            <p className="text-base font-semibold">₽ {Math.round(total / 4).toLocaleString()}</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <p className="text-xs text-white/50">Трат</p>
            <p className="text-base font-semibold">{filtered.length}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 px-5 mb-5 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? "bg-foreground text-white"
                : "bg-white text-muted-foreground border border-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="px-5 flex flex-col gap-3 mb-6">
        {filtered.map((expense) => (
          <div key={expense.id} className="bg-white rounded-2xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-xl flex-shrink-0">
                {expense.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm truncate">{expense.title}</p>
                <p className="text-xs text-muted-foreground">{expense.paidBy} · {expense.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-foreground">₽ {expense.amount.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">
                  ≈ ₽ {Math.round(expense.amount / expense.participants).toLocaleString()} / чел
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowAddForm(true)}
        className="fixed bottom-24 right-4 max-w-[calc(448px-1rem)] w-14 h-14 bg-[hsl(var(--accent))] text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform duration-150 z-40"
        style={{ right: "max(1rem, calc(50vw - 224px + 1rem))" }}
      >
        <Icon name="Plus" size={24} />
      </button>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowAddForm(false)}>
          <div
            className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-6 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
            <h3 className="text-lg font-bold mb-4">Новая трата</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Название"
                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors"
              />
              <input
                type="number"
                placeholder="Сумма ₽"
                className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors"
              />
              <select className="w-full px-4 py-3 rounded-xl border border-border bg-secondary text-foreground text-sm outline-none">
                {categories.slice(1).map(c => <option key={c}>{c}</option>)}
              </select>
              <button className="w-full bg-foreground text-white py-3 rounded-xl font-semibold text-sm mt-1">
                Добавить трату
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
