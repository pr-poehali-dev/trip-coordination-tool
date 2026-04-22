import Icon from "@/components/ui/icon";

type Tab = "home" | "expenses" | "trips" | "calculations";

interface HomePageProps {
  onNavigate: (tab: Tab) => void;
}

const recentTrips = [
  { id: 1, name: "Сочи 2024", members: 4, totalSpent: 48200, myShare: 12050, emoji: "🌊" },
  { id: 2, name: "Казань", members: 3, totalSpent: 21600, myShare: 7200, emoji: "🕌" },
];

const quickStats = [
  { label: "Активных поездок", value: "2", icon: "MapPin" },
  { label: "Долгов", value: "₽ 3 200", icon: "TrendingDown" },
  { label: "Вам должны", value: "₽ 5 400", icon: "TrendingUp" },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-12 pb-6">
        <p className="text-sm text-muted-foreground font-medium mb-1">Добро пожаловать</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Привет, Алекс 👋</h1>
      </div>

      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-3 border border-border">
              <Icon name={stat.icon} size={18} className="text-[hsl(var(--accent))] mb-2" />
              <p className="text-base font-bold text-foreground leading-none">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mb-6">
        <div
          onClick={() => onNavigate("trips")}
          className="bg-foreground text-white rounded-2xl p-5 cursor-pointer active:scale-95 transition-transform duration-150"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white/70">Быстрые действия</span>
            <Icon name="Zap" size={16} className="text-[hsl(var(--accent))]" />
          </div>
          <p className="text-xl font-bold mb-1">Новая поездка</p>
          <p className="text-sm text-white/60">Пригласите друзей и начните считать траты</p>
          <div className="mt-4 flex items-center gap-1 text-[hsl(var(--accent))] text-sm font-semibold">
            <span>Создать</span>
            <Icon name="ArrowRight" size={16} />
          </div>
        </div>
      </div>

      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">Последние поездки</h2>
          <button
            onClick={() => onNavigate("trips")}
            className="text-sm text-[hsl(var(--accent))] font-semibold"
          >
            Все
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {recentTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => onNavigate("trips")}
              className="bg-white rounded-2xl p-4 border border-border cursor-pointer active:scale-[0.98] transition-transform duration-150"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-xl flex-shrink-0">
                  {trip.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{trip.name}</p>
                  <p className="text-xs text-muted-foreground">{trip.members} участника</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-foreground">₽ {trip.myShare.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">моя доля</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mb-6">
        <div className="bg-white rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--accent))/0.1] flex items-center justify-center">
              <Icon name="Users" size={16} className="text-[hsl(var(--accent))]" />
            </div>
            <p className="font-semibold text-foreground">Активные участники</p>
          </div>
          <div className="flex -space-x-2">
            {["А", "М", "С", "К"].map((letter, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-foreground text-white flex items-center justify-center text-sm font-semibold border-2 border-white"
              >
                {letter}
              </div>
            ))}
            <div className="w-9 h-9 rounded-full bg-secondary text-muted-foreground flex items-center justify-center text-xs font-semibold border-2 border-white">
              +2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
