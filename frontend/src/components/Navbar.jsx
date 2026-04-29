import { NavLink } from 'react-router-dom';

function Navbar () {

    const navItems = [
        {name: 'Home', path: '/'},
        {name: 'Inventories', path: '/inventories'},
        {name: 'Products', path: '/products'},
        {name: 'Orders', path: '/orders'},
        {name: 'Customers', path: '/customers'},
        {name: 'Suppliers', path: '/suppliers'},
        {name: 'Analysis', path: '/analysis'}
    ];

    return (
    <nav className="border-b border-gray-200 bg-white">
      {/* flex makes items go horizontal (side by side) */}
      <ul className="flex">
        {navItems.map((item) => (
          <li key={item.name}>
            {/* NavLink automatically knows which route is active */}
            <NavLink
              to={item.path}
              className={({ isActive }) =>  // 👈 This function checks if link is active
                `px-6 py-3 font-medium transition-colors block
                ${isActive
                  ? 'text-blue-600 border-b-2 border-blue-600'  // Active style
                  : 'text-gray-500 hover:text-gray-700'          // Inactive style
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;