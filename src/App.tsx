import { useState } from "react";
import Icon from "@/components/ui/icon";
import HomePage from "@/pages/HomePage";
import ExpensesPage from "@/pages/ExpensesPage";
import TripsPage from "@/pages/TripsPage";
import CalculationsPage from "@/pages/CalculationsPage";

type Tab = "home" | "expenses" | "trips" | "calculations";

const tabs = [
  { id: "home" as Tab, label: "Главная", icon: "Home" },
  { id: "expenses" as Tab, label: "Траты", icon: "Wallet" },
  { id: "trips" as Tab, label: "Поездки", icon: "MapPin" },
  { id: "calculations" as Tab, label: "Расчёты", icon: "Calculator" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  const renderPage = () => {
    switch (activeTab) {
      case "home": return <HomePage onNavigate={setActiveTab} />;
      case "expenses": return <ExpensesPage />;
      case "trips": return <TripsPage />;
      case "calculations": return <CalculationsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      <main className="flex-1 overflow-y-auto pb-20">
        {renderPage()}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-border z-50 safe-area-bottom">
        <div className="grid grid-cols-4 py-2 px-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-200 ${activeTab === tab.id ? "bg-[hsl(var(--accent))]" : ""}`}>
                <Icon
                  name={tab.icon}
                  size={20}
                  className={`transition-transform duration-200 ${activeTab === tab.id ? "scale-110 text-foreground" : ""}`}
                />
              </div>
              <span className={`text-[10px] font-semibold leading-none ${activeTab === tab.id ? "text-foreground" : "text-muted-foreground"}`}>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}