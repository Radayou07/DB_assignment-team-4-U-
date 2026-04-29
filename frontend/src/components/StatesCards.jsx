function StatsCards() {
  const stats = [
    {
      title: 'TOTAL PRODUCTS',
      value: '1,284',
      change: '+4.5%',
      changeColor: 'text-green-500',
      bgColor: 'bg-white',
      icon: '📦'
    },
    {
      title: 'LOW STOCK ITEMS',
      value: '42',
      change: '+4.5%',
      changeColor: 'text-green-500',
      bgColor: 'bg-white',
      icon: '⚠️'
    },
    {
      title: 'HIGH PRIORITY',
      value: '23',
      change: null,
      bgColor: 'bg-orange-500',
      textColor: 'text-white',
      icon: '🔴'
    },
    {
      title: 'OUT OF STOCK',
      value: '12',
      change: null,
      bgColor: 'bg-red-500',
      textColor: 'text-white',
      icon: '❌'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} ${stat.textColor || 'text-gray-900'} 
                      rounded-lg shadow-sm p-6`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
            {stat.change && (
              <span className={`${stat.changeColor} text-sm font-semibold`}>
                {stat.change}
              </span>
            )}
          </div>
          <div className="text-3xl font-bold mb-1">{stat.value}</div>
          <div className={`text-sm ${stat.textColor || 'text-gray-500'} font-medium`}>
            {stat.title}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards();