// src/components/SideNavBar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideNavBar = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', path: '/', icon: 'dashboard', label: 'Dashboard' },
    { id: 'inventory', path: '/inventory', icon: 'inventory_2', label: 'Inventory' },
    { id: 'orders', path: '/orders', icon: 'shopping_cart', label: 'Orders' },
    { id: 'suppliers', path: '/suppliers', icon: 'group', label: 'Suppliers' },
    { id: 'analytics', path: '/analytics', icon: 'analytics', label: 'Analytics' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-60 border-r border-slate-800 bg-slate-900 flex flex-col overflow-y-auto z-50">
      <div className="px-6 py-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded bg-white flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-900 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              package_2
            </span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white leading-tight">Logistics Pro</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Operations Hub</p>
          </div>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setActiveNav(item.id)}
              className={`${
                activeNav === item.id
                  ? 'bg-slate-800 text-white font-semibold border-l-4 border-slate-400'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              } px-4 py-3 flex items-center gap-3 transition-colors duration-150 no-underline`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t border-slate-800 px-6 py-6 space-y-1">
        <Link to="/settings" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800 px-4 py-3 flex items-center gap-3 transition-colors duration-150 no-underline">
          <span className="material-symbols-outlined text-xl">settings</span>
          <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm">Settings</span>
        </Link>
        <Link to="/support" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800 px-4 py-3 flex items-center gap-3 transition-colors duration-150 no-underline">
          <span className="material-symbols-outlined text-xl">contact_support</span>
          <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm">Support</span>
        </Link>
      </div>
    </aside>
  );
};

export default SideNavBar;