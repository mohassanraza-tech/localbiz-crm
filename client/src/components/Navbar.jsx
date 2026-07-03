import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          LocalBiz CRM
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-slate-600 sm:block">
            {user?.name} ({user?.role})
          </span>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
