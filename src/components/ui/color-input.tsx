
'use client';
import { useState, useEffect, useRef } from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';
import tinycolor from 'tinycolor2';

type ColorInputProps = {
  hslValue: string; // e.g., "224 71.4% 4.1%"
  onChange: (newHslValue: string) => void;
  className?: string;
};

// Helper to check if a string is a valid CSS color
const isValidColor = (color: string) => {
  if (!color) return false;
  const s = new Option().style;
  s.color = color;
  // An empty string means the color is invalid
  return s.color !== '';
};

const toHslString = (color: tinycolor.Instance) => {
    const hsl = color.toHsl();
    return `${Math.round(hsl.h)} ${Math.round(hsl.s * 100)}% ${Math.round(hsl.l * 100)}%`;
};

export function ColorInput({ hslValue, onChange, className }: ColorInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [previewColor, setPreviewColor] = useState('');

  // Debounce timer ref
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Effect to sync internal state when the external HSL value changes
  useEffect(() => {
    const color = tinycolor(`hsl(${hslValue.replace(/ /g, ', ')})`);
    const hex = color.toHexString();
    setInputValue(hex);
    setPreviewColor(hex);
  }, [hslValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColorValue = e.target.value;
    setInputValue(newColorValue);

    // Clear previous debounce timer
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    // Set a new debounce timer
    debounceTimeout.current = setTimeout(() => {
        if (isValidColor(newColorValue)) {
            const color = tinycolor(newColorValue);
            const newHslString = toHslString(color);
            setPreviewColor(color.toHexString());
            onChange(newHslString);
        }
    }, 300); // 300ms debounce
  };
  
   const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColorValue = e.target.value;
     // Clear any pending debounce from text input
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    setInputValue(newColorValue);
    setPreviewColor(newColorValue);
    const color = tinycolor(newColorValue);
    const newHslString = toHslString(color);
    onChange(newHslString);
  };
  
  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
    }
  }, []);


  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative h-10 w-12 shrink-0">
        <div 
          className="absolute inset-0 rounded-md border" 
          style={{ backgroundColor: previewColor }}
        />
        <Input
          type="color"
          value={previewColor}
          onChange={handlePickerChange}
          className="h-full w-full cursor-pointer p-0 opacity-0"
        />
      </div>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className={cn('font-mono text-sm', !isValidColor(inputValue) && inputValue !== '' && 'border-destructive ring-destructive ring-1')}
        placeholder="#RRGGBB, green, rgb(0,255,0)..."
      />
    </div>
  );
}
