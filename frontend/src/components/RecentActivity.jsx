// src/components/RecentActivity.jsx
const RecentActivity = () => {
  const activities = [
    {
      text: 'Shipment #TR-402 arrived at Warehouse A',
      time: '24 mins ago • System Log',
      person: 'Alex Rivera',
      icon: 'local_shipping',
      color: 'blue',
    },
    {
      text: 'New PO created for Global Steel Ltd.',
      time: '2 hours ago • Sarah Chen',
      person: 'Sarah Chen',
      icon: 'add_shopping_cart',
      color: 'emerald',
    },
    {
      text: 'Manual adjustment of SKU-88219',
      time: '5 hours ago • Alex Rivera',
      person: 'Alex Rivera',
      icon: 'inventory',
      color: 'amber',
    },
    {
      text: 'Order Cancelled by Client #0012',
      time: 'Yesterday • Support Team',
      person: 'Support Team',
      icon: 'priority_high',
      color: 'red',
    },
  ];

  const getIconStyles = (color) => {
    const styles = {
      blue: 'bg-blue-100 text-blue-600',
      emerald: 'bg-emerald-100 text-emerald-600',
      amber: 'bg-amber-100 text-amber-600',
      red: 'bg-red-100 text-red-600',
    };
    return styles[color] || styles.blue;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col flex-1">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 style={{ fontFamily: 'Inter, sans-serif' }} className="text-[20px] leading-[28px] font-semibold tracking-[-0.01em] text-slate-900">
            Recent Activity
          </h4>
          <p className="text-xs text-slate-500 mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
            Live operational updates
          </p>
        </div>
        <button className="p-1 hover:bg-slate-50 rounded transition-colors">
          <span className="material-symbols-outlined text-slate-400 text-xl">more_vert</span>
        </button>
      </div>
      <div className="flex-1 space-y-8 relative">
        {/* Timeline line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
        
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-4 relative z-10">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white ${getIconStyles(activity.color)}`}>
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                {activity.icon}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-900 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                {activity.text}
              </p>
              <p className="text-[11px] text-slate-400 mt-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-8 w-full py-2.5 bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[11px] uppercase tracking-widest rounded-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
        style={{ fontFamily: 'Inter, sans-serif' }}>
        View Historical Logs
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </button>
    </div>
  );
};

export default RecentActivity;