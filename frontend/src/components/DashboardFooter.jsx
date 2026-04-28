// components/DashboardFooter.jsx

const DashboardFooter = () => {
  const footerLinks = [
    { label: 'Privacy Policy', href: '#', bold: false },
    { label: 'Terms of Service', href: '#', bold: false },
    { label: 'API Documentation', href: '#', bold: true },
  ];

  return (
    <footer className="mt-12 py-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-4 text-slate-400">
        <span className="material-symbols-outlined text-lg">verified_user</span>
        <p className="text-xs font-medium">Enterprise Security Enabled • System Version 4.8.2-b</p>
      </div>
      <div className="flex items-center gap-8">
        {footerLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={`text-xs text-slate-500 hover:text-slate-900 transition-colors ${link.bold ? 'font-bold' : ''}`}
          >
            {link.label}
          </a>
        ))}
        <div className="text-[10px] font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-wider">
          Server Status: Online
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;