import { useState, useEffect } from 'react';
import axios from 'axios';

function StockBadge({ qty }) {
  let bg, color, label;
  if (qty < 20) { bg = '#fcebeb'; color = '#a32d2d'; label = 'Critical'; }
  else if (qty < 50) { bg = '#faeeda'; color = '#854f0b'; label = 'Low'; }
  else { bg = '#eaf3de'; color = '#3b6d11'; label = 'In Stock'; }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: bg, color, borderRadius: 20, padding: '3px 10px 3px 8px', fontSize: 12, fontWeight: 500 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
      {qty} · {label}
    </span>
  );
}

function ExpiryCell({ dateStr }) {
  const date = new Date(dateStr);
  const now = new Date();
  const daysLeft = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
  const expired = daysLeft < 0;
  const soon = daysLeft >= 0 && daysLeft < 90;
  const color = expired ? '#a32d2d' : soon ? '#854f0b' : 'var(--color-text-secondary)';
  return (
    <span style={{ fontSize: 13, color }}>
      {date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
      {expired && <span style={{ marginLeft: 4, fontSize: 11 }}>(Expired)</span>}
      {soon && !expired && <span style={{ marginLeft: 4, fontSize: 11 }}>({daysLeft}d)</span>}
    </span>
  );
}

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/products')
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(() => { setProducts(MOCK_DATA); setLoading(false); });
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = products
    .filter(p => [p.name, p.company, p.category_id].some(v => String(v).toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      if (!sortKey) return 0;
      const va = a[sortKey], vb = b[sortKey];
      return (va < vb ? -1 : va > vb ? 1 : 0) * (sortDir === 'asc' ? 1 : -1);
    });

  const totalValue = products.reduce((s, p) => s + p.price * p.product_quantity, 0);
  const lowStock = products.filter(p => p.product_quantity < 50).length;

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <span style={{ opacity: 0.3, fontSize: 10 }}>↕</span>;
    return <span style={{ fontSize: 10, color: 'var(--color-text-info)' }}>{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  const thStyle = (col) => ({
    padding: '10px 12px', textAlign: 'left', fontSize: 11, fontWeight: 500,
    color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em',
    cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
    borderBottom: '0.5px solid var(--color-border-tertiary)',
  });

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--color-text-secondary)', fontSize: 14 }}>
      Loading inventory…
    </div>
  );

  return (
    <div style={{ fontFamily: 'var(--font-sans)', padding: '1.5rem 0' }}>

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, margin: '0 0 4px', color: 'var(--color-text-primary)' }}>Product Inventory</h1>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--color-text-secondary)' }}>{products.length} products tracked</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: '1.5rem' }}>
        {[
          { label: 'Total SKUs', value: products.length },
          { label: 'Low Stock Items', value: lowStock, warn: lowStock > 0 },
          { label: 'Inventory Value', value: `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
        ].map(card => (
          <div key={card.label} style={{ background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', padding: '12px 16px' }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-secondary)' }}>{card.label}</p>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 500, color: card.warn ? 'var(--color-text-warning)' : 'var(--color-text-primary)' }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name, company, or category…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', boxSizing: 'border-box' }}
        />
      </div>

      {error && (
        <div style={{ padding: '10px 14px', background: 'var(--color-background-danger)', border: '0.5px solid var(--color-border-danger)', borderRadius: 'var(--border-radius-md)', fontSize: 13, color: 'var(--color-text-danger)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div style={{ border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: 700 }}>
            <colgroup>
              <col style={{ width: 52 }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '14%' }} />
              <col style={{ width: '16%' }} />
              <col style={{ width: '14%' }} />
              <col style={{ width: '14%' }} />
              <col style={{ width: '16%' }} />
            </colgroup>
            <thead style={{ background: 'var(--color-background-secondary)' }}>
              <tr>
                <th style={{ ...thStyle(), cursor: 'default' }}></th>
                {[['name','Name'],['price','Price'],['company','Company'],['expire','Expiry'],['category_id','Category'],['product_quantity','Stock']].map(([key, label]) => (
                  <th key={key} style={thStyle(key)} onClick={() => handleSort(key)}>
                    {label} <SortIcon col={key} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', fontSize: 13, color: 'var(--color-text-secondary)' }}>
                    No products match your search.
                  </td>
                </tr>
              ) : filtered.map((product, i) => (
                <tr key={product.id} style={{ borderTop: i === 0 ? 'none' : '0.5px solid var(--color-border-tertiary)', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-background-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '10px 8px 10px 12px' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: 36, height: 36, borderRadius: 'var(--border-radius-md)', objectFit: 'cover', display: 'block', border: '0.5px solid var(--color-border-tertiary)' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.name}
                    <span style={{ display: 'block', fontSize: 11, fontWeight: 400, color: 'var(--color-text-tertiary)', marginTop: 1 }}>#{product.id}</span>
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 13, color: 'var(--color-text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                    ${Number(product.price).toFixed(2)}
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 13, color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.company}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <ExpiryCell dateStr={product.expire} />
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 13, color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.category_id}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <StockBadge qty={product.product_quantity} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '8px 16px', borderTop: '0.5px solid var(--color-border-tertiary)', background: 'var(--color-background-secondary)', fontSize: 12, color: 'var(--color-text-secondary)' }}>
          Showing {filtered.length} of {products.length} products
        </div>
      </div>
    </div>
  );
}