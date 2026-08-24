export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-zinc-900">Dashboard</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Welcome back, Sharma's Kitchen
        </p>
      </div>

      {/* Stats placeholder grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Today's Orders", value: "—", color: "orange" },
          { label: "Revenue",        value: "—", color: "green"  },
          { label: "Avg. Rating",    value: "—", color: "amber"  },
          { label: "Active Riders",  value: "—", color: "blue"   },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm"
          >
            <p className="text-xs font-semibold text-zinc-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-extrabold text-zinc-200">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Coming soon */}
      <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center shadow-sm">
        <p className="text-5xl mb-4">📊</p>
        <h2 className="text-lg font-extrabold text-zinc-900">
          Dashboard content coming in Day 2
        </h2>
        <p className="text-zinc-400 text-sm mt-2">
          Orders, revenue charts, and live activity will appear here.
        </p>
      </div>
    </div>
  );
}
