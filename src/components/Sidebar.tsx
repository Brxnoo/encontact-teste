import React, { useState } from 'react';

interface SubMenu {
  id: number;
  name: string;
}

interface MenuItem {
  id: number;
  name: string;
  subMenus: SubMenu[];
}

interface Props {
  menus: MenuItem[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  theme: 'light' | 'dark';
  t: (pt: string, en: string) => string;
}

const Sidebar: React.FC<Props> = ({ menus, selectedId, onSelect, theme, t }) => {
  const [expanded, setExpanded] = useState<number[]>([1, 2, 3]);

  const panel = theme === 'dark' ? '#16213e' : '#fff';
  const fg = theme === 'dark' ? '#fff' : '#1a1a2e';
  const hover = theme === 'dark' ? '#0f3460' : '#e8f0fe';

  const toggle = (id: number) =>
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div style={{ width: 240, minWidth: 240, background: panel, borderRight: '1px solid #ddd',
      overflowY: 'auto', flexShrink: 0, padding: '1rem 0' }}>
      <div style={{ padding: '0 1rem 0.5rem', fontWeight: 'bold',
        fontSize: '0.75rem', color: '#999', textTransform: 'uppercase' }}>
        {t('Menu', 'Menu')}
      </div>

      {menus.map(menu => (
        <div key={menu.id}>
          <div onClick={() => toggle(menu.id)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.5rem 1rem', cursor: 'pointer', color: fg,
              fontWeight: 'bold', fontSize: '0.9rem',
              background: expanded.includes(menu.id) ? hover : 'transparent' }}>
            <span>{menu.name}</span>
            <span style={{ fontSize: '0.7rem' }}>
              {expanded.includes(menu.id) ? '▼' : '▶'}
            </span>
          </div>

          {expanded.includes(menu.id) && menu.subMenus && menu.subMenus.map(sub => (
            <div key={sub.id}
              onClick={(e) => { e.stopPropagation(); onSelect(sub.id); }}
              style={{ padding: '0.4rem 1rem 0.4rem 2rem', cursor: 'pointer',
                color: selectedId === sub.id ? '#2E75B6' : fg,
                background: selectedId === sub.id ? hover : 'transparent',
                fontSize: '0.88rem',
                borderLeft: selectedId === sub.id ? '3px solid #2E75B6' : '3px solid transparent' }}>
              {sub.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;