export default function ActiveDelivery() {
  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto space-y-4">
      <div className="mb-2">
        <h1 className="text-xl font-extrabold text-zinc-900">Active Delivery</h1>
        <p className="text-sm text-zinc-400 mt-0.5">Your current order in progress</p>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-10 text-center">
        <p className="text-4xl mb-3">🗺️</p>
        <h2 className="font-extrabold text-zinc-900">Live delivery map coming in Task 7</h2>
        <p className="text-sm text-zinc-400 mt-2">
          Active order details, map, and delivery workflow will appear here.
        </p>
      </div>
    </div>
  );
}
