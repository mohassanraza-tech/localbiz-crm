import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/Layout';
import LeadCard from '../components/LeadCard';
import LeadForm from '../components/LeadForm';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import getErrorMessage from '../utils/getErrorMessage';

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  businessType: '',
  status: 'New',
  source: 'WhatsApp',
};

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    setError('');

    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;

      const { data } = await api.get('/leads', { params });
      setLeads(data.data);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load leads'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await api.post('/leads', formData);
      setFormData(emptyForm);
      setShowForm(false);
      fetchLeads();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to create lead'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-sm text-slate-500">Manage and track all your business leads</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          {showForm ? 'Cancel' : '+ Add Lead'}
        </button>
      </div>

      <Alert message={error} onClose={() => setError('')} />

      {showForm && (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Add New Lead</h2>
          <LeadForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={submitting}
            submitLabel="Create Lead"
          />
        </div>
      )}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, phone, or email..."
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner label="Loading leads..." />
      ) : leads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-slate-500">No leads found. Try changing filters or add a new lead.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {leads.map((lead) => (
            <LeadCard key={lead._id} lead={lead} />
          ))}
        </div>
      )}

      <div className="mt-6 md:hidden">
        <Link
          to="/"
          className="block rounded-lg border border-slate-200 bg-white py-3 text-center text-sm font-medium text-slate-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </Layout>
  );
};

export default Leads;
