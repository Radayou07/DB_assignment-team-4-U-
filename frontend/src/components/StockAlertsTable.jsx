// src/components/StockAlertsTable.jsx
const StockAlertsTable = () => {
  const alerts = [
    {
      name: 'Precision Ball Bearings X2',
      warehouse: 'Warehouse B-04',
      sku: 'SKU-49210',
      stock: 12,
      status: 'CRITICAL',
      statusColor: 'bg-red-50 text-red-700 ring-red-600/10',
    },
    {
      name: 'Titanium Casting M4',
      warehouse: 'Warehouse A-12',
      sku: 'SKU-88219',
      stock: 45,
      status: 'LOW STOCK',
      statusColor: 'bg-amber-50 text-amber-700 ring-amber-600/10',
    },
    {
      name: 'Alloy Rivets (Bulk)',
      warehouse: 'Warehouse C-01',
      sku: 'SKU-20911',
      stock: 1200,
      status: 'RE-EVALUATE',
      statusColor: 'bg-blue-50 text-blue-700 ring-blue-600/10',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex-1">
      <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
        <div>
          <h4 style={{ fontFamily: 'Inter, sans-serif' }} className="text-[20px] leading-[28px] font-semibold tracking-[-0.01em] text-slate-900">
            Critical Stock Alerts
          </h4>
          <p className="text-xs text-slate-500 mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
            3 items require immediate attention
          </p>
        </div>
        <button className="text-xs text-slate-600 hover:text-slate-900 font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 transition-all"
          style={{ fontFamily: 'Inter, sans-serif' }}>
          View All Alerts
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif' }}>Item Name</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif' }}>SKU</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif' }}>Stock Level</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif' }}>Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right"
                style={{ fontFamily: 'Inter, sans-serif' }}>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {alerts.map((alert, index) => (
              <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {alert.name}
                    </span>
                    <span className="text-[11px] text-slate-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {alert.warehouse}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm font-mono" style={{ fontFamily: 'monospace' }}>
                  {alert.sku}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-900 text-sm font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {alert.stock.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
                      units
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold ring-1 ring-inset ${alert.statusColor}`}
                    style={{ fontFamily: 'Inter, sans-serif' }}>
                    {alert.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-900 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={{ fontFamily: 'Inter, sans-serif' }}>
                    {alert.status === 'RE-EVALUATE' ? 'Details' : 'Restock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockAlertsTable;