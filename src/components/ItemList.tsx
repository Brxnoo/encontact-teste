import React, { useState } from 'react';

interface Item {
  id: number;
  name: string;
  subject: string;
  owner: string;
  users: string[];
  menuId: number;
}

interface Props {
  items: Item[];
  onArchive: (ids: number[]) => void;
  theme: 'light' | 'dark';
  t: (pt: string, en: string) => string;
}

const Avatar: React.FC<{ initials: string; size?: number; checked?: boolean; onClick?: () => void }> =
  ({ initials, size = 32, checked, onClick }) => (
    <div onClick={onClick} style={{
      width: size, height: size, borderRadius: '50%',
      background: checked ? '#2E75B6' : '#e0e0e0',
      color: checked ? 'white' : '#333',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 'bold', cursor: onClick ? 'pointer' : 'default',
      border: checked ? '2px solid #1a5a9a' : '2px solid transparent',
      flexShrink: 0, userSelect: 'none'
    }}>
      {checked ? '✓' : initials}
    </div>
  );

const ItemList: React.FC<Props> = ({ items, onArchive, theme, t }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  const panel = theme === 'dark' ? '#16213e' : '#fff';
  const fg = theme === 'dark' ? '#fff' : '#1a1a2e';
  const border = theme === 'dark' ? '#0f3460' : '#eee';
  const subFg = theme === 'dark' ? '#aaa' : '#666';

  const toggleSelect = (id: number) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const toggleAll = () =>
    setSelected(selected.length === items.length ? [] : items.map(i => i.id));

  const handleArchive = () => { onArchive(selected); setSelected([]); };

  const getInitials = (name: string) =>
    name ? name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : 'OA';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: panel }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.6rem 1rem', borderBottom: `1px solid ${border}`, flexShrink: 0 }}>
        <input type="checkbox"
          checked={selected.length === items.length && items.length > 0}
          onChange={toggleAll} style={{ cursor: 'pointer' }} />
        <button onClick={handleArchive} disabled={selected.length === 0}
          style={{ padding: '0.3rem 0.8rem', borderRadius: 4, border: '1px solid #ccc',
            cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
            background: selected.length > 0 ? '#2E75B6' : '#ccc',
            color: 'white', fontWeight: 'bold', fontSize: '0.85rem' }}>
          {t('Arquivar', 'Archive')} {selected.length > 0 ? `(${selected.length})` : ''}
        </button>
        <button style={{ padding: '0.3rem 0.8rem', borderRadius: 4,
          border: '1px solid #ccc', cursor: 'pointer', background: panel, color: fg }}>
          {t('Atribuir', 'Assign')}
        </button>
        <button style={{ padding: '0.3rem 0.8rem', borderRadius: 4,
          border: '1px solid #ccc', cursor: 'pointer', background: panel, color: fg }}>
          {t('Agendar', 'Schedule')}
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {items.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: subFg }}>
            {t('Selecione um item no menu', 'Select an item from the menu')}
          </div>
        ) : items.map(item => {
          const isSelected = selected.includes(item.id);
          const isHovered = hovered === item.id;
          const showCheckbox = isSelected || isHovered;
          return (
            <div key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => toggleSelect(item.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1rem', borderBottom: `1px solid ${border}`,
                background: isSelected ? (theme === 'dark' ? '#0f3460' : '#e8f0fe')
                  : isHovered ? (theme === 'dark' ? '#1a2a4a' : '#f5f8ff') : panel,
                cursor: 'pointer', transition: 'background 0.15s' }}>
              <Avatar initials={getInitials(item.owner || 'OA')} size={36}
                checked={showCheckbox ? isSelected : undefined}
                onClick={() => toggleSelect(item.id)} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 'bold', color: fg, fontSize: '0.9rem',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name}
                </div>
                <div style={{ color: subFg, fontSize: '0.82rem',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.subject}
                </div>
                <div style={{ color: subFg, fontSize: '0.78rem', marginTop: 2 }}>
                  📥 {t('Caixa de entrada', 'Inbox')}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column',
                alignItems: 'flex-end', gap: '0.3rem', flexShrink: 0 }}>
                <span style={{ fontSize: '0.75rem', color: subFg }}>
                  {t('Hoje', 'Today')}, 11:42
                </span>
                <div style={{ display: 'flex', gap: '0.2rem' }}>
                  {(item.users || ['OA', 'OA']).slice(0, 3).map((u: string, i: number) => (
                    <Avatar key={i} initials={getInitials(u)} size={22} checked={isSelected} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemList;