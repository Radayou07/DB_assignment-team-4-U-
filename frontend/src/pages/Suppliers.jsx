import { useState } from 'react';

// --- Data Mock ---
const suppliers = [
  {
    id: 'SUP-2901-X', name: 'Apex Semiconductors', category: 'High-Tech',
    email: 'm.zhang@apex-semi.com', phone: '+1 (555) 012-9981', location: 'Shenzhen, CN',
    rating: 4.9, status: 'Active', bgClass: 'bg-indigo-50', borderClass: 'border-indigo-100',
    imgId: '1'
  },
  {
    id: 'SUP-1104-Y', name: 'Global Logistics Corp', category: 'Logistics',
    email: 'support@global-log.com', phone: '+44 20 7946 0122', location: 'London, UK',
    rating: 4.2, status: 'Active', bgClass: 'bg-orange-50', borderClass: 'border-orange-100',
    imgId: '2'
  }
];

// --- Sub-components ---

const Sidebar = ({ isCollapsed }) => (
  <aside className={`fixed left-0 top-0 h-full w-60 border-r border-slate-800 bg-slate-900 dark:bg-slate-950 flex flex-col z-50 transition-transform duration-300 ease-in-out ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}`}>
    <div className="p-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
          <span className="material-symbols-outlined text-slate-900">inventory_2</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight text-white leading-none">Logistics Pro</span>
          <span className="font-sans text-[10px] uppercase tracking-widest text-slate-400 mt-1">Operations Hub</span>
        </div>
      </div>
    </div>
    
    <nav className="flex-1 px-4 mt-4 space-y-1">
      <NavItem icon="dashboard" label="Dashboard" />
      <NavItem icon="shopping_cart" label="Orders" />
      <NavItem icon="group" label="Suppliers" active />
      <NavItem icon="analytics" label="Analytics" />
    </nav>
    
    <div className="px-4 py-6 border-t border-slate-800 space-y-1">
      <NavItem icon="settings" label="Settings" />
      <NavItem icon="contact_support" label="Support" />
    </div>
  </aside>
);

const NavItem = ({ icon, label, active }) => (
  <a href="#" className={`px-4 py-3 flex items-center gap-3 transition-colors duration-150 rounded ${
    active ? 'bg-slate-800 text-white font-semibold border-l-4 border-slate-400 rounded-r' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
  }`}>
    <span className="material-symbols-outlined">{icon}</span>
    <span className="font-sans text-sm font-medium Inter">{label}</span>
  </a>
);

const Header = ({ isCollapsed, toggleSidebar }) => (
  <header className={`fixed top-0 right-0 h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex justify-between items-center px-6 z-40 transition-all duration-300 ease-in-out ${isCollapsed ? 'left-0' : 'left-60'}`}>
    <div className="flex items-center gap-4 flex-1">
      <button onClick={toggleSidebar} className="p-2 text-slate-500 hover:bg-slate-50 rounded-md transition-transform active:scale-95">
        <span className="material-symbols-outlined">menu</span>
      </button>
      <div className="relative w-full max-w-md">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
        <input type="text" placeholder="Search suppliers, categories, or IDs..." className="w-full bg-slate-50 border border-slate-200 rounded-md py-1.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-slate-900 outline-none" />
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-md transition-transform active:scale-95">
        <span className="material-symbols-outlined">notifications</span>
      </button>
      <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-md transition-transform active:scale-95">
        <span className="material-symbols-outlined">history</span>
      </button>
      <div className="h-8 w-px bg-slate-200 mx-1"></div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs font-bold text-slate-900">Alex Rivers</p>
          <p className="text-[10px] text-slate-500 font-medium">Ops Manager</p>
        </div>
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuASbrVxkXEkuhVv4yYAQeOt7WQZmC6bMpaQ9tdDKI3IznXU4iYsory5wUp3cHADPMn-db8BeeYYnkj5znQdXMDBA_Ns4dSD4UtQPjJZLZCFkZTEiQB_xrxMTRJUqpztRiM6BwlqOH1Oq4xh0zED2W2nBHgCJlXigOzvWx_3iVV9ajrVGV3nlzgrqsy3lzRk2xVXhcj-O-OA3loLrk7kfKKy8HZDd28fLzUvFRQ95h2kncbNr-w8Hh7NlIQsatFuYFiwgLqeNCKgGQ" alt="Alex Rivers" className="w-8 h-8 rounded-full border border-slate-200" />
      </div>
    </div>
  </header>
);

const StatCard = ({ title, icon, value, badgeText, badgeColor, subtext, highlightIconColor, progress, stars }) => (
  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <span className="text-slate-500 font-label-caps text-[11px] tracking-wider uppercase">{title}</span>
      <span className={`material-symbols-outlined ${highlightIconColor || 'text-slate-400'} text-[20px]`}>{icon}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="font-display-lg text-2xl text-slate-900">{value}</span>
      <span className={`text-[11px] font-bold ${badgeColor} px-1.5 py-0.5 rounded`}>{badgeText}</span>
    </div>
    
    {progress && (
      <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-slate-900 w-[70%]"></div>
      </div>
    )}
    
    {stars && (
      <div className="mt-3 flex gap-0.5">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="material-symbols-outlined text-amber-400 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        ))}
        <span className="material-symbols-outlined text-slate-200 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
      </div>
    )}
    
    {subtext && <p className="text-[10px] text-slate-400 mt-3 font-medium">{subtext}</p>}
  </div>
);

// --- Main Application Component ---

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="bg-background font-body-base text-on-background min-h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <Header isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      
      <main className={`pt-16 min-h-screen bg-surface p-6 flex flex-col transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-0' : 'ml-60'}`}>
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface">Suppliers Directory</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Manage global vendors, performance metrics, and procurement channels.</p>
          </div>
          <button className="bg-primary text-on-primary font-label-caps text-label-caps px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-sm hover:opacity-90 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[18px]">add</span>
            ADD NEW SUPPLIER
          </button>
        </div>

        {/* Dashboard Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Active Suppliers" icon="storefront" value="142" badgeText="+4.2%" badgeColor="text-emerald-600 bg-emerald-50" progress />
          <StatCard title="Avg. Performance" icon="trending_up" value="4.8" badgeText="/ 5.0" badgeColor="text-slate-400" stars />
          <StatCard title="Critical Alerts" icon="warning" value="3" badgeText="Risk High" badgeColor="text-red-600 bg-red-50" highlightIconColor="text-red-400" subtext="Shipment delays in North Region" />
          <StatCard title="Procurement Spend" icon="payments" value="$2.4M" badgeText="-12% YoY" badgeColor="text-emerald-600 bg-emerald-50" subtext="Budget Optimized" />
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-slate-200 rounded-xl mb-6 flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">
              <span className="material-symbols-outlined text-[18px]">filter_list</span> Filters
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex gap-1">
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-2">
                CATEGORY: ELECTRONICS <span className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
              </span>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-2">
                RATING: 4.5+ <span className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 font-medium">Showing 1-10 of 142 suppliers</span>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <button className="p-2 bg-slate-50 text-slate-900 border-r border-slate-200">
                <span className="material-symbols-outlined text-[18px]">list</span>
              </button>
              <button className="p-2 text-slate-400 hover:bg-slate-50">
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
            </div>
          </div>
        </div>

        {/* Suppliers Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Supplier Name', 'Category', 'Contact Info', 'Location', 'Performance', 'Status', ''].map(header => (
                  <th key={header} className="px-6 py-4 font-label-caps text-label-caps text-slate-500">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {suppliers.map(sup => (
                <tr key={sup.id} className="data-table-row transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${sup.bgClass} flex items-center justify-center border ${sup.borderClass} overflow-hidden`}>
                        <img src={`http://googleusercontent.com/profile/picture/${sup.imgId}`} alt="Logo" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-tabular-nums text-sm font-bold text-slate-900">{sup.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium">ID: {sup.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[11px] font-bold rounded uppercase tracking-wider ${sup.category === 'High-Tech' ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-700'}`}>{sup.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-body-sm font-medium text-slate-700">{sup.email}</p>
                      <p className="text-[11px] text-slate-400">{sup.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{sup.location}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-tabular-nums text-sm font-bold text-slate-900">{sup.rating}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                           <span key={i} className={`material-symbols-outlined text-[14px] ${i < Math.floor(sup.rating) ? 'text-amber-400' : 'text-slate-200'}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {sup.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
              <span>Rows per page:</span>
              <select className="bg-transparent border-none text-slate-900 font-bold focus:ring-0 cursor-pointer">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-500">1-10 of 142</span>
              <div className="flex gap-1">
                <button className="p-1 text-slate-400 hover:text-slate-900 disabled:opacity-30 transition-colors" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="p-1 text-slate-900 hover:bg-slate-200 rounded transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Insights Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Heatmap Card */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[380px]">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-none">Performance Heatmap</h3>
                <p className="text-[11px] text-slate-500 mt-1">Geographical distribution of vendor reliability</p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-colors uppercase tracking-wider">
                VIEW FULL REPORT
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
            <div className="flex-1 p-5">
              <div className="relative h-full w-full bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative text-center">
                  <div className="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center mb-3 mx-auto text-slate-400">
                    <span className="material-symbols-outlined text-2xl">public</span>
                  </div>
                  <p className="text-sm text-slate-600 font-semibold">Global Distribution View</p>
                  <p className="text-[11px] text-slate-400 mt-1">Interactive data layer loading...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resiliency Card */}
          <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[380px]">
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold rounded border border-emerald-500/20 uppercase tracking-widest">Global Status</span>
              </div>
              <h3 className="text-xl font-bold text-white leading-tight">Supply Chain Resiliency</h3>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">Current risk score is optimized at 84%. No major disruptions detected in Tier 1 suppliers within the last 24 hours.</p>
              
              <div className="mt-auto pt-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Risk Level</span>
                    <span className="text-[10px] font-bold text-emerald-400">LOW</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[16%]"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 bg-white/5 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTt9BtHoJi01NY0NiN5EqvwbU3DoPg04-t-X_MjmEh8yUbSgYbATOnPWMUQz14wPxCHhsyUh8H5v0ro19Rt7R3YAt7mUlCVJYBxDkhrIka_luLuqgRPZvVZO-uX1QkK1bwlke6Bt2seFKVmGSgEvu8HclopLW_N1h8gKC6Io97EjWRnBkYnYLUHErYoUqyWOG0dWKrEKE164cSF6_UYnwBc_p8csHyFvs-PmOoR4t6xymom1dtE56XMGBLszT680jJ2-9NLoKYyg" alt="Team" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" />
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkz3i7blKQH95FuVS7Og6p9g2bNyYlXZyGvB3jqxOrTvZ_LJPJBk-VkIxguM7DA37L_3swLCMpwT_PWYVdYRayxtKstRKJZFaGGWZTkD_fS7GTuIMI78O8GrrlMKGsUyaGlx4WytZzV0fUcZl3xxuDml7MJzLlzYC4W1Ie7J8MYJBkCkJAISU-0A8nbnWAmoJx51EAuU4HrQ9IpKo-d4P5IHzdZ9XC36dJN-Zof0KYY12oWrvie72d3PFJKvG4ibJwRi6EOtBULg" alt="Team" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white uppercase tracking-tight">Ops Team</span>
                    <span className="text-[9px] text-slate-500">7 active monitors</span>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-1 group uppercase tracking-widest">
                  MANAGE
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-6 pb-6 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">SYSTEMS NOMINAL</span>
              </div>
              <span className="h-3 w-px bg-slate-200 hidden md:block"></span>
              <p className="text-[11px] text-slate-400 font-medium">Last database sync: 2 mins ago</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <a href="#" className="text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-tight">Documentation</a>
                <a href="#" className="text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-tight">API Status</a>
              </div>
              <span className="h-3 w-px bg-slate-200 hidden md:block"></span>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight">© 2024 Logistics Pro v4.2.1</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}