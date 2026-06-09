'use client';

import { useState } from 'react';

import type { BrandExpertiseInputProps } from '@/types/technicianApplication/skillTagging.types';

import BrandTag from './BrandTag';

export default function BrandExpertiseInput({
  tags,
  onAddTag,
  onRemoveTag,
}: BrandExpertiseInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">Brand Expertise</h3>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter brand name and press Enter"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <BrandTag
            key={tag}
            name={tag}
            onRemove={() => onRemoveTag(tag)}
          />
        ))}
      </div>
    </div>
  );
}
