'use client';

import { useState } from 'react';

import type { BrandExpertiseEntry, BrandExpertiseInputProps } from '@/types/technicianApplication/skillTagging.types';

import BrandTag from './BrandTag';

export default function BrandExpertiseInput({
  tags,
  onAddTag,
  onRemoveTag,
}: BrandExpertiseInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const brand = inputValue.trim();
      // Avoid duplicate brand names
      if (!tags.some((t) => t.brandName.toLowerCase() === brand.toLowerCase())) {
        const entry: BrandExpertiseEntry = { brandName: brand };
        onAddTag(entry);
      }
      setInputValue('');
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">Brand Expertise</h3>
      <p className="text-sm text-gray-500">Type a brand name and press Enter to add.</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. Samsung, Daikin, Bosch"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <BrandTag
            key={tag.brandName}
            name={tag.brandName}
            onRemove={() => onRemoveTag(tag.brandName)}
          />
        ))}
      </div>
    </div>
  );
}
