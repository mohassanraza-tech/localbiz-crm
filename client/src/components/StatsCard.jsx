const statusStyles = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-amber-100 text-amber-700',
  Qualified: 'bg-emerald-100 text-emerald-700',
  Closed: 'bg-slate-200 text-slate-700',
};

const StatsCard = ({ title, value, accent = 'indigo' }) => {
  const accents = {
    indigo: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    blue: 'border-blue-200 bg-blue-50 text-blue-700',
    amber: 'border-amber-200 bg-amber-50 text-amber-700',
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    slate: 'border-slate-200 bg-slate-50 text-slate-700',
  };

  return (
    <div className={`rounded-2xl border p-5 ${accents[accent]}`}>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
};

export { statusStyles };
export default StatsCard;
