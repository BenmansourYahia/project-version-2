import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Rechercher...',
  onFilterPress
}) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      padding: '8px 16px',
    }}>
      <div style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: '8px 12px',
        borderRadius: 12,
        border: `1px solid ${isFocused ? theme.colors.primary : theme.colors.border}`,
        background: theme.colors.surface,
        gap: 8,
      }}>
        <Search size={20} color={theme.colors.textSecondary} />
        <input
          style={{
            flex: 1,
            fontSize: 16,
            color: theme.colors.text,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            padding: '4px 0',
          }}
          value={value}
          onChange={e => onChangeText(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {value.length > 0 && (
          <button onClick={handleClear} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <X size={20} color={theme.colors.textSecondary} />
          </button>
        )}
      </div>
      {onFilterPress && (
        <button
          style={{
            padding: 8,
            borderRadius: 8,
            border: `1px solid ${theme.colors.border}`,
            background: theme.colors.surface,
            marginLeft: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={onFilterPress}
        >
          <Filter size={20} color={theme.colors.text} />
        </button>
      )}
    </div>
  );
} 