import { useState } from "react";
import Icon from "@/components/ui/icon";

const categories = [
  { id: "all",     label: "Все",          emoji: "📋" },
  { id: "food",    label: "Еда",          emoji: "🍽️" },
  { id: "stay",    label: "Жильё",        emoji: "🏠" },
  { id: "move",    label: "Транспорт",    emoji: "🚖" },
  { id: "fun",     label: "Развлечения",  emoji: "🎭" },
  { id: "other",   label: "Прочее",       emoji: "📦" },
];

const expenses = [
  { id: 1, title: "Ресторан «Маяк»",     cat: "food",  amount: 5600,  paidBy: "Алекс",  date: "Сегодня",    emoji: "🍽️", participants: 4, fromCard: false },
  { id: 2, title: "Яхта на день",        cat: "fun",   amount: 8000,  paidBy: "Марина", date: "Сегодня",    emoji: "⛵",  participants: 4, fromCard: false },
  { id: 3, title: "Такси из аэропорта",  cat: "move",  amount: 1800,  paidBy: "Серёжа", date: "Вчера",      emoji: "🚖",  participants: 3, fromCard: true  },
  { id: 4, title: "Апартаменты",         cat: "stay",  amount: 12000, paidBy: "Марина", date: "19 мая",     emoji: "🏠",  participants: 4, fromCard: true  },
  { id: 5, title: "Боулинг + бар",       cat: "fun",   amount: 4200,  paidBy: "Катя",   date: "19 мая",     emoji: "🎳",  participants: 4, fromCard: false },
  { id: 6, title: "Продукты в Пятёрочке",cat: "food",  amount: 2300,  paidBy: "Алекс",  date: "18 мая",     emoji: "🛒",  participants: 4, fromCard: false },
  { id: 7, title: "Аренда авто",         cat: "move",  amount: 4500,  paidBy: "Алекс",  date: "18 мая",     emoji: "🚗",  participants: 4, fromCard: true  },
];

const splitOptions = [
  { id: "equal",  label: "Поровну",     icon: "Equal" },
  { id: "custom", label: "Вручную",     icon: "Sliders" },
  { id: "me",     label: "Только я",    icon: "User" },
];

const members = ["Алексей", "Марина", "Серёжа", "Катя"];

export default function ExpensesPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [showAdd, setShowAdd]   = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [addStep, setAddStep]   = useState<"main" | "split">("main");
  const [splitMode, setSplitMode] = useState("equal");
  const [selectedMembers, setSelectedMembers] = useState<string[]>(members);

  const filtered = activeCat === "all" ? expenses : expenses.filter(e => e.cat === activeCat);
  const total = filtered.reduce((s, e) => s + e.amount, 0);
  const myShare = Math.round(total / 4);

  const toggleMember = (m: string) =>
    setSelectedMembers(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);

  return (
    <div className="animate-fade-in pb-4">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <p className="text-sm text-muted-foreground mb-0.5">Сочи 2025 · 4 участника</p>
        <h1 className="text-2xl font-bold text-foreground">Траты</h1>
      </div>

      {/* Summary */}
      <div className="mx-5 mb-5 bg-foreground text-white rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 0%, hsl(47 96% 53%) 0%, transparent 55%)" }} />
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-white/50 mb-1">Общая сумма</p>
              <p className="text-3xl font-bold">₽ {total.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/50 mb-1">Моя доля</p>
              <p className="text-xl font-bold text-[hsl(var(--accent))]">₽ {myShare.toLocaleString()}</p>
            </div>
          </div>
          <div className="h-px bg-white/10 mb-4" />
          <div className="flex gap-5">
            <div>
              <p className="text-xs text-white/50">Трат</p>
              <p className="text-base font-bold">{filtered.length}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Я заплатил</p>
              <p className="text-base font-bold">₽ {expenses.filter(e => e.paidBy === "Алекс").reduce((s, e) => s + e.amount, 0).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-white/50">Мне должны</p>
              <p className="text-base font-bold text-[hsl(var(--accent))]">₽ 3 200</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 px-5 mb-4 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`flex-shrink-0 px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeCat === cat.id
                ? "bg-foreground text-white"
                : "bg-white text-muted-foreground border border-border"
            }`}
          >
            <span className="text-base leading-none">{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Add buttons */}
      <div className="px-5 mb-4 flex gap-2">
        <button
          onClick={() => { setShowAdd(true); setAddStep("main"); }}
          className="flex-1 py-3 bg-[hsl(var(--accent))] text-foreground rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Icon name="Plus" size={16} />
          Добавить трату
        </button>
        <button
          onClick={() => setShowScan(true)}
          className="px-4 py-3 bg-white border border-border text-foreground rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Icon name="ScanLine" size={16} />
          Чек
        </button>
      </div>

      {/* Expense list */}
      <div className="px-5 flex flex-col gap-2.5">
        {filtered.map((exp) => (
          <div key={exp.id} className="bg-white rounded-2xl border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-xl flex-shrink-0">
                {exp.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground text-sm truncate">{exp.title}</p>
                  {exp.fromCard && (
                    <span className="flex-shrink-0 text-[9px] bg-[hsl(47,96%,53%,0.12)] text-[hsl(47,80%,38%)] px-1.5 py-0.5 rounded-md font-bold border border-[hsl(47,96%,53%,0.2)]">
                      T‑Card
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{exp.paidBy} · {exp.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-foreground">₽ {exp.amount.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">
                  ≈ ₽ {Math.round(exp.amount / exp.participants).toLocaleString()} / чел
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---- SHEET: Add Expense ---- */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowAdd(false)}>
          <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />

            {addStep === "main" && (
              <>
                <h3 className="text-lg font-bold mb-5">Новая трата</h3>
                <div className="flex flex-col gap-3">
                  {/* Amount big input */}
                  <div className="bg-muted rounded-2xl p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-2">Сумма</p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-2xl font-bold text-muted-foreground">₽</span>
                      <input
                        type="number"
                        placeholder="0"
                        className="text-4xl font-bold bg-transparent outline-none text-center w-40 text-foreground"
                      />
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Название (ресторан, такси...)"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors"
                  />

                  {/* Category picker */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 font-medium">Категория</p>
                    <div className="grid grid-cols-3 gap-2">
                      {categories.slice(1).map(cat => (
                        <button key={cat.id} className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border ${cat.id === "food" ? "bg-foreground text-white border-foreground" : "bg-muted text-foreground border-border"}`}>
                          <span>{cat.emoji}</span> {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Who paid */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 font-medium">Кто заплатил</p>
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                      {members.map((m, i) => (
                        <button key={m} className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold ${i === 0 ? "bg-foreground text-white border-foreground" : "bg-muted text-foreground border-border"}`}>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? "bg-white text-foreground" : "bg-foreground text-white"}`}>
                            {m[0]}
                          </div>
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setAddStep("split")}
                    className="w-full py-3 bg-[hsl(var(--accent))] text-foreground rounded-xl font-bold text-sm mt-1"
                  >
                    Далее — разделить →
                  </button>
                </div>
              </>
            )}

            {addStep === "split" && (
              <>
                <button onClick={() => setAddStep("main")} className="flex items-center gap-1 text-sm text-muted-foreground mb-4 font-medium">
                  <Icon name="ChevronLeft" size={16} /> Назад
                </button>
                <h3 className="text-lg font-bold mb-5">Разделить трату</h3>

                {/* Split mode */}
                <div className="flex gap-2 mb-5">
                  {splitOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setSplitMode(opt.id)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${splitMode === opt.id ? "bg-foreground text-white" : "bg-muted text-foreground border border-border"}`}
                    >
                      <Icon name={opt.icon} size={13} /> {opt.label}
                    </button>
                  ))}
                </div>

                {/* Members to split */}
                <p className="text-xs text-muted-foreground mb-3 font-medium">Кто участвует в трате</p>
                <div className="flex flex-col gap-2 mb-5">
                  {members.map((m) => {
                    const selected = selectedMembers.includes(m);
                    return (
                      <button key={m} onClick={() => toggleMember(m)} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${selected ? "border-[hsl(var(--accent))] bg-[hsl(47,96%,53%,0.06)]" : "border-border bg-muted"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${selected ? "bg-[hsl(var(--accent))] text-foreground" : "bg-border text-muted-foreground"}`}>
                          {m[0]}
                        </div>
                        <span className="flex-1 text-sm font-semibold text-left text-foreground">{m}</span>
                        {splitMode === "equal" && selected && (
                          <span className="text-sm font-bold text-foreground">₽ {Math.round(5600 / selectedMembers.length).toLocaleString()}</span>
                        )}
                        {splitMode === "custom" && selected && (
                          <input
                            type="number"
                            placeholder="₽"
                            className="w-20 text-right px-2 py-1 rounded-lg border border-border bg-white text-sm font-bold outline-none"
                            onClick={e => e.stopPropagation()}
                          />
                        )}
                        {!selected && <Icon name="Plus" size={14} className="text-muted-foreground" />}
                        {selected && <Icon name="Check" size={14} className="text-[hsl(47,80%,38%)]" />}
                      </button>
                    );
                  })}
                </div>

                <div className="bg-[hsl(47,96%,53%,0.08)] border border-[hsl(47,96%,53%,0.2)] rounded-xl p-3 flex items-center gap-2 mb-4">
                  <Icon name="Info" size={15} className="text-[hsl(47,80%,38%)] flex-shrink-0" />
                  <p className="text-xs text-[hsl(47,80%,38%)] font-medium">
                    Участники получат запрос на оплату прямо в Т-Банке
                  </p>
                </div>

                <button
                  onClick={() => setShowAdd(false)}
                  className="w-full py-3 bg-foreground text-white rounded-xl font-bold text-sm"
                >
                  Сохранить трату
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ---- SHEET: Scan receipt ---- */}
      {showScan && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowScan(false)}>
          <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
            <h3 className="text-lg font-bold mb-1">Сканировать чек</h3>
            <p className="text-sm text-muted-foreground mb-5">ИИ распознает позиции и предложит разделить</p>

            <div className="bg-muted rounded-2xl h-44 flex flex-col items-center justify-center gap-3 mb-5 border-2 border-dashed border-border">
              <Icon name="Camera" size={32} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-medium">Направьте камеру на чек</p>
              <p className="text-xs text-muted-foreground">или загрузите фото из галереи</p>
            </div>

            {/* Mock recognized receipt */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Пример распознанного чека</p>
              <div className="border border-border rounded-2xl overflow-hidden">
                <div className="bg-muted px-4 py-2 flex items-center justify-between">
                  <p className="text-xs font-bold text-foreground">Ресторан «Маяк»</p>
                  <p className="text-xs text-muted-foreground">5 600 ₽</p>
                </div>
                {[
                  { name: "Стейк рибай", price: 2200 },
                  { name: "Паста Карбонара", price: 890 },
                  { name: "Вино Каберне 0.5л", price: 1400 },
                  { name: "Тирамису × 2", price: 560 },
                  { name: "Кофе", price: 550 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2.5 border-t border-border">
                    <p className="text-sm text-foreground">{item.name}</p>
                    <p className="text-sm font-semibold text-foreground">₽ {item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setShowScan(false); setShowAdd(true); setAddStep("split"); }}
              className="w-full py-3 bg-[hsl(var(--accent))] text-foreground rounded-xl font-bold text-sm"
            >
              Разделить чек между участниками
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
