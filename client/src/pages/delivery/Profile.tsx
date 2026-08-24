export default function DeliveryProfile() {
  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto space-y-4">
      <div className="mb-2">
        <h1 className="text-xl font-extrabold text-zinc-900">Profile</h1>
        <p className="text-sm text-zinc-400 mt-0.5">Your agent profile and settings</p>
      </div>

      {/* Agent card */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white font-extrabold text-xl flex items-center justify-center shrink-0">
          R
        </div>
        <div>
          <p className="font-extrabold text-zinc-900">Rahul Sharma</p>
          <p className="text-sm text-zinc-400">Agent ID: DA-4821</p>
          <p className="text-xs text-orange-500 font-semibold mt-0.5">⭐ 4.8 Rating</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-10 text-center">
        <p className="text-4xl mb-3">👤</p>
        <h2 className="font-extrabold text-zinc-900">Profile settings coming soon</h2>
        <p className="text-sm text-zinc-400 mt-2">
          Vehicle details, bank account, and preferences will appear here.
        </p>
      </div>
    </div>
  );
}
