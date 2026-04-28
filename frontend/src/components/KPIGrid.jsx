// src/components/KPIGrid.jsx
const KPICard = ({ title, value, icon, trend, trendValue, subtitle, progress, statusColor = 'emerald' }) => {
  const getTrendStyles = () => {
    switch(trend) {
      case 'up': return {
        badge: 'bg-emerald-50 text-emerald-600',
        icon: 'trending_up'
      };
      case 'down': return {
        badge: 'bg-red-50 text-red-600',
        icon: 'trending_down'
      };
      default: return {
        badge: 'bg-slate-50 text-slate-600',
        icon: 'horizontal_rule'
      };
    }
  };

  const trendStyles = getTrendStyles();

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-slate-50 rounded-lg">
          <span className="material-symbols-outlined text-slate-600 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            {icon}
          </span>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${trendStyles.badge}`}>
          <span className="material-symbols-outlined text-[10px]">{trendStyles.icon}</span>
          <span style={{ fontFamily: 'Inter, sans-serif' }}>{trendValue}</span>
        </span>
      </div>
      <p className="text-[12px] leading-[16px] font-semibold tracking-[0.05em] text-slate-500 mb-1 uppercase"
        style={{ fontFamily: 'Public Sans, sans-serif' }}>
        {title}
      </p>
      <h3 className="text-[30px] leading-[38px] font-bold tracking-[-0.02em] text-slate-900"
        style={{ fontFamily: 'Inter, sans-serif' }}>
        {value}
      </h3>
      {subtitle && (
        <p className="text-[11px] text-slate-500 mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          {subtitle}
        </p>
      )}
      {progress && (
        <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-slate-900" style={{ width: progress }}></div>
        </div>
      )}
    </div>
  );
};

const KPIGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <KPICard
        title="Total Sales (MTD)"
        value="$482,900"
        icon="payments"
        trend="up"
        trendValue="+12.5%"
        progress="75%"
      />
      <KPICard
        title="Total Orders"
        value="1,248"
        icon="inventory_2"
        trend="stable"
        trendValue="Stable"
        subtitle="Target: 1,500 units/mo"
      />
      <KPICard
        title="Active Suppliers"
        value="42"
        icon="precision_manufacturing"
        trend="up"
        trendValue="+3 New"
        subtitle="98% fulfillment rate"
      />
      <KPICard
        title="Inventory Value"
        value="$2.4M"
        icon="account_balance_wallet"
        trend="down"
        trendValue="-2.1%"
        subtitle="Net change since June"
      />
    </div>
  );
};

export default KPIGrid;