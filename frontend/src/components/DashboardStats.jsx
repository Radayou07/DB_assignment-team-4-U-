function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      
      {/* Total Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm font-semibold">TOTAL PRODUCTS</span>
          <span className="text-green-500 text-sm font-bold">+4.5%</span>
        </div>
        <div className="text-3xl font-bold mt-2">1,284</div>
      </div>

      {/* Low Stock Items */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm font-semibold">LOW STOCK ITEMS</span>
          <span className="text-green-500 text-sm font-bold">+4.5%</span>
        </div>
        <div className="text-3xl font-bold mt-2">42</div>
      </div>

      {/* High Priority */}
      <div className="bg-orange-500 rounded-lg shadow p-6 text-white">
        <div className="text-sm font-semibold opacity-90">High Priority</div>
        <div className="text-3xl font-bold mt-2">23</div>
      </div>

      {/* Out of Stock */}
      <div className="bg-red-500 rounded-lg shadow p-6 text-white">
        <div className="text-sm font-semibold opacity-90">OUT OF STOCK</div>
        <div className="text-3xl font-bold mt-2">12</div>
      </div>

    </div>
  );
}

export default DashboardStats;