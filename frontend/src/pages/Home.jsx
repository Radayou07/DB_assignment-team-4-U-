// src/pages/Dashboard.jsx
import KPIGrid from '../components/KPIGrid';
import InventoryTurnoverChart from '../components/InventoryTurnoverChart';
import StockAlertsTable from '../components/StockAlertsTable';
import RecentActivity from '../components/RecentActivity';
import RegionalHubMap from '../components/RegionalHubMap';

const Dashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-[30px] leading-[38px] font-bold tracking-[-0.02em] text-slate-900">Operations Dashboard</h2>
          <p className="text-[14px] leading-[20px] text-slate-500">Inventory overview for North American Region</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded hover:bg-slate-50 flex items-center gap-2 text-sm shadow-sm transition-all">
            <span className="material-symbols-outlined text-sm">download</span>
            Export Report
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white font-semibold rounded hover:bg-slate-800 flex items-center gap-2 text-sm shadow-md transition-all">
            <span className="material-symbols-outlined text-sm">add</span>
            New Shipment
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <KPIGrid />

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6 items-stretch">
        {/* Main Analytics Section */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <InventoryTurnoverChart />
          <StockAlertsTable />
        </div>

        {/* Right Sidebar Widgets */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <RecentActivity />
          <RegionalHubMap />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 text-slate-400">
          <span className="material-symbols-outlined text-lg">verified_user</span>
          <p className="text-xs font-medium">Enterprise Security Enabled • System Version 4.8.2-b</p>
        </div>
        <div className="flex items-center gap-8">
          <a className="text-xs text-slate-500 hover:text-slate-900 transition-colors" href="#">Privacy Policy</a>
          <a className="text-xs text-slate-500 hover:text-slate-900 transition-colors" href="#">Terms of Service</a>
          <a className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-bold" href="#">API Documentation</a>
          <div className="text-[10px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-wider">
            Server Status: Online
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;