import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Layout from '../components/Layout';
import StatsCard from '../components/StatsCard';
import LeadCard from '../components/LeadCard';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import getErrorMessage from '../utils/getErrorMessage';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, leadsRes] = await Promise.all([
          api.get('/leads/stats'),
          api.get('/leads'),
        ]);

        setStats(statsRes.data.data);
        setRecentLeads(leadsRes.data.data.slice(0, 3));
      } catch (err) {
        setError(getErrorMessage(err, 'Failed to load dashboard'));
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner label="Loading dashboard..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">Overview of your lead pipeline</p>
        </div>
        <Link
          to="/leads"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          View All Leads
        </Link>
      </div>

      <Alert message={error} onClose={() => setError('')} />

      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatsCard title="Total Leads" value={stats.total} accent="indigo" />
          <StatsCard title="New" value={stats.byStatus.New} accent="blue" />
          <StatsCard title="Contacted" value={stats.byStatus.Contacted} accent="amber" />
          <StatsCard title="Qualified" value={stats.byStatus.Qualified} accent="emerald" />
          <StatsCard title="Closed" value={stats.byStatus.Closed} accent="slate" />
        </div>
      )}

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Leads</h2>

        {recentLeads.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-slate-500">No leads yet. Create your first lead to get started.</p>
            <Link
              to="/leads"
              className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline"
            >
              Go to Leads →
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recentLeads.map((lead) => (
              <LeadCard key={lead._id} lead={lead} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Dashboard;
