export default function DeliveryDashboard() {
  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto space-y-4">
      <div className="mb-2">
        <h1 className="text-xl font-extrabold text-zinc-900">Dashboard</h1>
        <p className="text-sm text-zinc-400 mt-0.5">Your activity for today</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Deliveries", value: "8", icon: "🛵" },
          { label: "Earnings",   value: "₹—", icon: "💰" },
          { label: "Rating",     value: "—",  icon: "⭐" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-4 text-center">
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-lg font-extrabold text-zinc-900">{s.value}</p>
            <p className="text-[11px] text-zinc-400 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-10 text-center">
        <p className="text-4xl mb-3">📦</p>
        <h2 className="font-extrabold text-zinc-900">Delivery workflow coming in Task 7</h2>
        <p className="text-sm text-zinc-400 mt-2">
          Live order assignment, map, and delivery tracking will appear here.
        </p>
      </div>
    </div>
  );
}
