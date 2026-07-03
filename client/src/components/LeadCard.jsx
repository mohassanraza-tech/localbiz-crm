import { Link } from 'react-router-dom';
import { statusStyles } from './StatsCard';

const LeadCard = ({ lead }) => {
  return (
    <Link
      to={`/leads/${lead._id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{lead.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{lead.businessType || 'Business'}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[lead.status]}`}
        >
          {lead.status}
        </span>
      </div>

      <div className="mt-4 space-y-1 text-sm text-slate-600">
        <p>Phone: {lead.phone}</p>
        {lead.email && <p>Email: {lead.email}</p>}
        <p>Source: {lead.source}</p>
      </div>
    </Link>
  );
};

export default LeadCard;
