// components/DashboardContent.jsx
import KPIGrid from './KPIGrid';
import InventoryTurnoverChart from './InventoryTurnoverChart';
import StockAlertsTable from './StockAlertsTable';
import RecentActivity from './RecentActivity';
import RegionalHubMap from './RegionalHubMap';
import DashboardFooter from './DashboardFooter';

const DashboardContent = () => {
  return (
    <main className="ml-60 pt-16 min-h-screen">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-display-lg text-display-lg text-on-surface">Operations Dashboard</h2>
            <p className="text-on-surface-variant font-body-base">Inventory overview for North American Region</p>
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
        <DashboardFooter />
      </div>
    </main>
  );
};

export default DashboardContent;