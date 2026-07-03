import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 md:pb-0">
      <Navbar />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 flex border-t border-slate-200 bg-white md:hidden">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex-1 py-3 text-center text-sm font-medium ${
              isActive ? 'text-indigo-600' : 'text-slate-600'
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/leads"
          className={({ isActive }) =>
            `flex-1 py-3 text-center text-sm font-medium ${
              isActive ? 'text-indigo-600' : 'text-slate-600'
            }`
          }
        >
          Leads
        </NavLink>
      </nav>
    </div>
  );
};

export default Layout;
