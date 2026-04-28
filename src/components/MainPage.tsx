import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ItemList from './ItemList';

interface Props {
  onLogout: () => void;
}

interface MenuItem {
  id: number;
  name: string;
  subMenus: { id: number; name: string }[];
}

interface Item {
  id: number;
  name: string;
  subject: string;
  owner: string;
  users: string[];
  menuId: number;
}

const MainPage: React.FC<Props> = ({ onLogout }) => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const t = (pt: string, en: string) => lang === 'pt' ? pt : en;

 useEffect(() => {
    fetch('https://corsproxy.io/?http://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/menus')
      .then(r => r.json())
      .then(data => {
        console.log('menus:', data);
        setMenus(data);
      });
  }, []);

  useEffect(() => {
    if (selectedMenuId === null) return;
    fetch(`https://corsproxy.io/?http://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr/items/${selectedMenuId}`)
      .then(r => r.json())
      .then(data => {
        const list = data.subMenuItems || (Array.isArray(data) ? data : [data]);
        setItems(list);
      });
  }, [selectedMenuId]);

  const archiveItems = (ids: number[]) => {
    setItems(prev => prev.filter(i => !ids.includes(i.id)));
  };

  const bg = theme === 'dark' ? '#1a1a2e' : '#f0f2f5';
  const fg = theme === 'dark' ? '#fff' : '#1a1a2e';
  const panel = theme === 'dark' ? '#16213e' : '#fff';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: bg, color: fg }}>
      {/* TOPBAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.5rem 1rem', background: panel, borderBottom: '1px solid #ddd', flexShrink: 0 }}>
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{ width: 36, height: 36, borderRadius: '50%', background: '#2E75B6',
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', cursor: 'pointer', userSelect: 'none' }}
          >
            OA
          </div>
          {showUserMenu && (
            <div style={{ position: 'absolute', top: 44, left: 0, background: panel,
              border: '1px solid #ccc', borderRadius: 6, padding: '0.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 100, minWidth: 120 }}>
              <div
                onClick={onLogout}
                style={{ cursor: 'pointer', padding: '0.4rem 0.8rem', borderRadius: 4,
                  color: 'red', fontWeight: 'bold' }}
              >
                {t('Sair', 'Logout')}
              </div>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setLang(l => l === 'pt' ? 'en' : 'pt')}
            style={{ padding: '0.3rem 0.8rem', borderRadius: 4, border: '1px solid #ccc',
              cursor: 'pointer', background: panel, color: fg }}>
            {lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
          </button>
          <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            style={{ padding: '0.3rem 0.8rem', borderRadius: 4, border: '1px solid #ccc',
              cursor: 'pointer', background: panel, color: fg }}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      {/* BODY */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: window.innerWidth < 600 ? 'column' : 'row' }}>
        <Sidebar
          menus={menus}
          selectedId={selectedMenuId}
          onSelect={setSelectedMenuId}
          theme={theme}
          t={t}
        />
        <ItemList
          items={items}
          onArchive={archiveItems}
          theme={theme}
          t={t}
        />
      </div>
    </div>
  );
};

export default MainPage;