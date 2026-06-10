'use client';

import { useState } from 'react';

import { SERVICE_AREA_TEXT } from '@/constants/technicianApplication/serviceAreaOptions';
import { getLocalitySuggestions } from '@/data/technicianOnboarding/serviceAreaData';
import type { PreferredAreasInputProps } from '@/types/technicianOnboarding/serviceArea.types';

export default function PreferredAreasInput({
  selectedAreas,
  onAddArea,
  onRemoveArea,
}: PreferredAreasInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.trim()) {
      const results = getLocalitySuggestions(value);
      setSuggestions(results.filter((area) => !selectedAreas.includes(area)));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (area: string) => {
    onAddArea(area);
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      handleSelectSuggestion(inputValue.trim());
    }
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-xl border-2 border-orange-400">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <span className="material-symbols-outlined">my_location</span>
        {SERVICE_AREA_TEXT.preferredAreasLabel}
      </h2>

      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
          placeholder={SERVICE_AREA_TEXT.preferredAreasPlaceholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
        />

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSelectSuggestion(suggestion)}
                type="button"
                className="w-full text-left px-4 py-2 hover:bg-emerald-50 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedAreas.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedAreas.map((area) => (
            <div
              key={area}
              className="flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-sm"
            >
              <span>{area}</span>
              <button
                onClick={() => onRemoveArea(area)}
                type="button"
                className="text-emerald-700 hover:text-emerald-900"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
