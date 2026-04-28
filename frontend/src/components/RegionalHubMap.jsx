// src/components/RegionalHubMap.jsx
const RegionalHubMap = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[320px]">
      <div className="p-5 border-b border-slate-100">
        <h5 className="text-sm font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
          Regional Hub Monitoring
        </h5>
        <p className="text-xs text-slate-500 mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
          Real-time status for Chicago cluster
        </p>
      </div>
      <div className="flex-1 w-full bg-slate-200 relative group overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-S8B_QPKHf4vqqk4jImGoaPeUGX8y0vKSEsXVIA5cGcKW3Q8QYWdvNK6HUfIK1dP8aiwvPtvp_OQxYQdEpE_CfcahpKIDeZ_4zKY_xXseCq38amtlLzyykWXVW5abzxXy5NUDJe-jK_qvk8pu6RXCuP4aAYBnp5D_0ZZjPX05nocwhU947v15zvsdto7nRiIccdsSs2vr31umqACCZ0N3aaPybxiMStF5bzNSTXEtcik8u9xx4Fbv_UskOmlVa7HLQLu4z9dDwg')`,
            filter: 'grayscale(0.4) contrast(1.1)',
          }}
        />
        <div className="absolute inset-0 bg-slate-900/30 flex flex-col justify-center items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-white/20 blur-xl rounded-full animate-pulse"></div>
            <div className="p-3 bg-white/30 backdrop-blur-md rounded-full border border-white/50 relative z-10">
              <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-900 border border-white/50 shadow-sm"
          style={{ fontFamily: 'Inter, sans-serif' }}>
          LIVE MAP
        </div>
      </div>
      <div className="p-4 bg-slate-50/50 flex items-center justify-between">
        <div>
          <h6 className="text-xs font-bold text-slate-900" style={{ fontFamily: 'Inter, sans-serif' }}>
            Chicago Central Hub
          </h6>
          <p className="text-[10px] text-slate-500 mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
            88% Capacity • 14 Active Bays
          </p>
        </div>
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
      </div>
    </div>
  );
};

export default RegionalHubMap;