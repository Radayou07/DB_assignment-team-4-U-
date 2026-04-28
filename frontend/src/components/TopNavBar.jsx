// src/components/TopNavBar.jsx
import { useState } from 'react';

const TopNavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 right-0 left-60 h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md z-40 flex justify-between items-center px-6">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all outline-none"
            placeholder="Search inventory, orders, or suppliers..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-md transition-colors relative">
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-md transition-colors">
            <span className="material-symbols-outlined text-xl">history</span>
          </button>
        </div>
        <div className="h-8 w-px bg-slate-200 mx-0"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900 leading-none">Alex Rivera</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Ops Manager</p>
          </div>
          <img
            alt="Manager Avatar"
            className="w-9 h-9 rounded-full ring-2 ring-slate-100 group-hover:ring-slate-200 transition-all object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN_DL-FGjGYoODSgcd6F3koY6FSaDFeJml9tCPZTBg7GKq7gKKvtrdBGn5Bb3hWyodCBVYK15mKHkNx_CJaXR6soldraG0uz4z0Puv_6MxZpx1qRZjgdQBsuoxuLp509aiOGn0_Pz3qwgc2z02nv0D7Q4vSJ1MvGJnh1FP6QZVowFj_cqFMFUE6qc-QjxEU32qHGb_DT7X1I3izX8BX4KHM_rddvTQmB5JIgvVuXBzC5T9R_IipXzV9mXBkpe4_f3ikMXKbag84Q"
          />
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;