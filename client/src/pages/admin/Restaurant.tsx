export default function AdminRestaurant() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-zinc-900">Restaurant</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Manage your restaurant profile and operating hours.
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center shadow-sm">
        <p className="text-5xl mb-4">🏠</p>
        <h2 className="text-lg font-extrabold text-zinc-900">
          Restaurant settings coming soon
        </h2>
        <p className="text-zinc-400 text-sm mt-2">
          Update your profile, photos, cuisine, and opening hours here.
        </p>
      </div>
    </div>
  );
}
