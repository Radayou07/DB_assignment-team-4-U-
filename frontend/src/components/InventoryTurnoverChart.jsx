// src/components/InventoryTurnoverChart.jsx
import { useState } from 'react';

const InventoryTurnoverChart = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June'];
  const barHeights = ['40%', '55%', '45%', '70%', '85%', '60%'];
  const values = ['4.2x', '5.5x', '4.5x', '7.0x', '8.9x', '6.0x'];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h4 style={{ fontFamily: 'Inter, sans-serif' }} className="text-[20px] leading-[28px] font-semibold tracking-[-0.01em] text-slate-900">
            Inventory Turnover Trend
          </h4>
          <p className="text-xs text-slate-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            Average efficiency across all warehouse hubs
          </p>
        </div>
        <select className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-600 outline-none focus:ring-2 focus:ring-slate-200"
          style={{ fontFamily: 'Inter, sans-serif' }}>
          <option>Last 6 Months</option>
          <option>Last Year</option>
        </select>
      </div>
      <div className="relative h-64 flex items-end justify-between gap-3 px-2">
        {months.map((month, index) => (
          <div key={month} className="relative flex-1 group">
            <div
              className={`w-full rounded-t-lg transition-all hover:bg-slate-200 ${
                index === 4 ? 'bg-slate-900 shadow-lg shadow-slate-900/10' : 'bg-slate-100'
              }`}
              style={{ height: barHeights[index] }}
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                style={{ fontFamily: 'Inter, sans-serif' }}>
                {month}: {values[index]}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between px-2 mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest border-t border-slate-50 pt-4"
        style={{ fontFamily: 'Inter, sans-serif' }}>
        {months.map((month) => (
          <span key={month}>{month.substring(0, 3)}</span>
        ))}
      </div>
    </div>
  );
};

export default InventoryTurnoverChart;