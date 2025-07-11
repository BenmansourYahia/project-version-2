import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function FilterModal({
  visible,
  onClose,
  title,
  options,
  selectedOptions,
  onApply,
  multiSelect = true
}) {
  const { theme } = useTheme();
  const [tempSelected, setTempSelected] = useState(selectedOptions);

  useEffect(() => {
    setTempSelected(selectedOptions);
  }, [selectedOptions, visible]);

  const handleOptionToggle = (option) => {
    if (multiSelect) {
      if (tempSelected.includes(option)) {
        setTempSelected(tempSelected.filter(item => item !== option));
      } else {
        setTempSelected([...tempSelected, option]);
      }
    } else {
      setTempSelected([option]);
    }
  };

  const handleApply = () => {
    onApply(tempSelected);
    onClose();
  };

  const handleClear = () => {
    setTempSelected([]);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      zIndex: 1000
    }}>
      <div style={{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80vh',
        width: '100%',
        background: theme.colors.surface,
        overflow: 'hidden',
        boxShadow: '0 -2px 16px rgba(0,0,0,0.15)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          borderBottom: `1px solid ${theme.colors.border}`
        }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: theme.colors.text }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} color={theme.colors.text} />
          </button>
        </div>
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          {options.map((option) => (
            <button
              key={option}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: 16,
                border: 'none',
                borderBottom: `1px solid ${theme.colors.border}`,
                background: tempSelected.includes(option) ? `${theme.colors.primary}10` : 'transparent',
                cursor: 'pointer'
              }}
              onClick={() => handleOptionToggle(option)}
            >
              <span style={{ fontSize: 16, color: theme.colors.text }}>{option}</span>
              {tempSelected.includes(option) && (
                <Check size={20} color={theme.colors.primary} />
              )}
            </button>
          ))}
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 20,
          borderTop: `1px solid ${theme.colors.border}`,
          gap: 12
        }}>
          <button
            style={{
              flex: 1,
              padding: '12px 0',
              borderRadius: 8,
              border: `1px solid ${theme.colors.border}`,
              background: 'none',
              color: theme.colors.text,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer'
            }}
            onClick={handleClear}
          >
            Effacer
          </button>
          <button
            style={{
              flex: 1,
              padding: '12px 0',
              borderRadius: 8,
              border: 'none',
              background: theme.colors.primary,
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer'
            }}
            onClick={handleApply}
          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
} 