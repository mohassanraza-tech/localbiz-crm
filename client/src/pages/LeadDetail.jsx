import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/Layout';
import LeadForm from '../components/LeadForm';
import { statusStyles } from '../components/StatsCard';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [formData, setFormData] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addingNote, setAddingNote] = useState(false);
  const [error, setError] = useState('');

  const fetchLead = async () => {
    setLoading(true);
    setError('');

    try {
      const { data } = await api.get(`/leads/${id}`);
      setLead(data.data);
      setFormData({
        name: data.data.name,
        phone: data.data.phone,
        email: data.data.email || '',
        businessType: data.data.businessType || '',
        status: data.data.status,
        source: data.data.source,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load lead');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const { data } = await api.put(`/leads/${id}`, formData);
      setLead(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update lead');
    } finally {
      setSaving(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setAddingNote(true);
    setError('');

    try {
      const { data } = await api.post(`/leads/${id}/notes`, { text: noteText });
      setLead(data.data);
      setNoteText('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add note');
    } finally {
      setAddingNote(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;

    try {
      await api.delete(`/leads/${id}`);
      navigate('/leads');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete lead');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-64 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        </div>
      </Layout>
    );
  }

  if (!lead) {
    return (
      <Layout>
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error || 'Lead not found'}
        </div>
        <Link to="/leads" className="mt-4 inline-block text-indigo-600 hover:underline">
          ← Back to Leads
        </Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <Link to="/leads" className="text-sm font-medium text-indigo-600 hover:underline">
          ← Back to Leads
        </Link>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{lead.name}</h1>
            <p className="text-sm text-slate-500">{lead.businessType || 'Business lead'}</p>
          </div>
          <span
            className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[lead.status]}`}
          >
            {lead.status}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Lead Details</h2>
          <LeadForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleUpdate}
            loading={saving}
            submitLabel="Update Lead"
          />
          <button
            onClick={handleDelete}
            className="mt-4 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete Lead
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Follow-up Notes</h2>

          <form onSubmit={handleAddNote} className="mb-6">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={3}
              placeholder="Add a follow-up note..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
            <button
              type="submit"
              disabled={addingNote}
              className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {addingNote ? 'Adding...' : 'Add Note'}
            </button>
          </form>

          {lead.notes?.length === 0 ? (
            <p className="text-sm text-slate-500">No notes yet. Add your first follow-up note.</p>
          ) : (
            <div className="space-y-4">
              {lead.notes
                .slice()
                .reverse()
                .map((note) => (
                  <div key={note._id} className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-800">{note.text}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      {note.addedBy?.name || 'User'} •{' '}
                      {new Date(note.createdAt).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LeadDetail;
