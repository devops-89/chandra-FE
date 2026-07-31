'use client';
import type { LucideIcon } from 'lucide-react';
import { Car, Hammer, Search, Shield, Wrench } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ServiceControllers } from '@/api/serviceControllers';
import { markStepComplete } from '@/lib/onboarding/onboardingProgress';
import type { AdminService } from '@/types/admin/service.types';
import type { BrandExpertiseEntry, SkillsEquipmentState } from '@/types/technicianApplication/skillTagging.types';

import BrandExpertiseInput from './BrandExpertiseInput';
import SkillTaggingFooter from './SkillTaggingFooter';

// ─── Constants ────────────────────────────────────────────────────────────────

const LANGUAGES = [
  'English', 'Hindi', 'Tamil', 'Telugu',
  'Kannada', 'Malayalam', 'Marathi', 'Bengali',
];

interface EquipmentOption {
  key: keyof Pick<SkillsEquipmentState, 'hasLadder' | 'hasACGauges' | 'hasSafetyEquipment' | 'hasVehicle'>;
  label: string;
  icon: LucideIcon;
}

const EQUIPMENT_OPTIONS: EquipmentOption[] = [
  { key: 'hasLadder', label: 'Ladder', icon: Hammer },
  { key: 'hasACGauges', label: 'AC Gauges', icon: Wrench },
  { key: 'hasSafetyEquipment', label: 'Safety Equipment', icon: Shield },
  { key: 'hasVehicle', label: 'Vehicle', icon: Car },
];

const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const INITIAL_STATE: SkillsEquipmentState = {
  yearsOfExperience: '',
  languages: [],
  services: [],
  brandExpertise: [],
  hasLadder: false,
  hasACGauges: false,
  hasSafetyEquipment: false,
  hasVehicle: false,
  gst: '',
};

const INITIAL_VISIBLE_SERVICES = 6;

// ─── Section label helper ────────────────────────────────────────────────────

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SkillTaggingPage() {
  const router = useRouter();

  // ── Form state ─────────────────────────────────────────────────────────────
  const [state, setState] = useState<SkillsEquipmentState>(INITIAL_STATE);
  const [gstError, setGstError] = useState<string | null>(null);
  const hasRestoredDraft = useRef(false);

  // ── Services from API ──────────────────────────────────────────────────────
  const [services, setServices] = useState<AdminService[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState<string | null>(null);

  // ── UX States for Services ─────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllServices, setShowAllServices] = useState(false);

  const loadServices = useCallback(async () => {
    setServicesLoading(true);
    setServicesError(null);
    try {
      const data = await ServiceControllers.getAllServices();
      setServices(data);
    } catch {
      setServicesError('Failed to load services. Please try again.');
    } finally {
      setServicesLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    let restoreTimer: number | undefined;

    const fetchServices = async () => {
      try {
        const data = await ServiceControllers.getAllServices();
        if (active) {
          setServices(data);
        }
      } catch {
        if (active) {
          setServicesError('Failed to load services. Please try again.');
        }
      } finally {
        if (active) {
          setServicesLoading(false);
        }
      }
    };

    fetchServices();

    // Restore from session storage if available
    const saved = sessionStorage.getItem('skillsEquipmentData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<SkillsEquipmentState>;
        restoreTimer = window.setTimeout(() => {
          if (active) {
            setState((prev) => ({ ...prev, ...parsed }));
            hasRestoredDraft.current = true;
          }
        }, 0);
      } catch {
        hasRestoredDraft.current = true;
        // ignore malformed data
      }
    } else {
      hasRestoredDraft.current = true;
    }

    return () => {
      active = false;
      if (restoreTimer) {
        window.clearTimeout(restoreTimer);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasRestoredDraft.current) return;
    sessionStorage.setItem('skillsEquipmentData', JSON.stringify(state));
  }, [state]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const toggleService = (serviceId: number) => {
    setState((prev) => {
      const exists = prev.services.some((s) => s.serviceId === serviceId);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s.serviceId !== serviceId)
          : [...prev.services, { serviceId }],
      };
    });
  };

  const toggleLanguage = (lang: string) => {
    setState((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const toggleEquipment = (key: keyof Pick<SkillsEquipmentState, 'hasLadder' | 'hasACGauges' | 'hasSafetyEquipment' | 'hasVehicle'>) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddBrand = (entry: BrandExpertiseEntry) => {
    setState((prev) => ({ ...prev, brandExpertise: [...prev.brandExpertise, entry] }));
  };

  const handleRemoveBrand = (brandName: string) => {
    setState((prev) => ({
      ...prev,
      brandExpertise: prev.brandExpertise.filter((b) => b.brandName !== brandName),
    }));
  };

  const handleGstChange = (value: string) => {
    const upper = value.toUpperCase();
    setState((prev) => ({ ...prev, gst: upper }));
    if (upper === '') {
      setGstError(null);
    } else if (!GST_REGEX.test(upper)) {
      setGstError('Invalid GST format. Example: 22AAAAA0000A1Z5');
    } else {
      setGstError(null);
    }
  };

  const canProceed = useMemo(() => {
    return (
      state.services.length > 0 &&
      state.yearsOfExperience !== '' &&
      state.yearsOfExperience !== null &&
      state.yearsOfExperience !== undefined &&
      Number(state.yearsOfExperience) >= 0 &&
      state.languages.length > 0 &&
      gstError === null
    );
  }, [state.services, state.yearsOfExperience, state.languages, gstError]);

  const handleNext = () => {
    if (!canProceed) return;
    sessionStorage.setItem('skillsEquipmentData', JSON.stringify(state));
    markStepComplete(1);
    router.push('/technician/onboarding/document-upload');
  };

  // ── Filtered & Visible Services ───────────────────────────────────────────
  const filteredServices = services.filter((svc) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = svc.name?.toLowerCase().includes(query) ?? false;
    const descMatch = svc.description?.toLowerCase().includes(query) ?? false;
    return nameMatch || descMatch;
  });

  const visibleServices = showAllServices
    ? filteredServices
    : filteredServices.slice(0, INITIAL_VISIBLE_SERVICES);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Page heading */}
      <div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
          Skills &amp; Equipments
        </h1>
        <p className="text-gray-600">
          Tell us about your expertise. This helps us match you with the right jobs.
        </p>
      </div>

      {/* ── 1. Services ───────────────────────────────────────────────────── */}
      <section>
        <SectionTitle
          title="Services"
          subtitle="Select all services you are certified to perform."
        />

        {/* Search Input */}
        {!servicesLoading && !servicesError && services.length > 0 && (
          <div className="relative mb-6 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        )}

        {servicesLoading && (
          <div className="flex items-center justify-center h-32 text-gray-500 text-sm">
            Loading services…
          </div>
        )}

        {!servicesLoading && servicesError && (
          <div className="flex flex-col items-center justify-center h-32 gap-3 text-center">
            <p className="text-red-500 text-sm">{servicesError}</p>
            <button
              type="button"
              onClick={loadServices}
              className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!servicesLoading && !servicesError && services.length === 0 && (
          <p className="text-gray-500 text-sm">No services available at this time.</p>
        )}

        {!servicesLoading && !servicesError && services.length > 0 && filteredServices.length === 0 && (
          <p className="text-gray-500 text-sm">No services match your search query.</p>
        )}

        {!servicesLoading && !servicesError && visibleServices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleServices.map((svc) => {
              const isSelected = state.services.some((s) => s.serviceId === svc.id);
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => toggleService(svc.id)}
                  className={`group relative w-full text-left rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between min-h-35 ${isSelected
                    ? 'border-2 border-emerald-700 bg-emerald-50'
                    : 'border border-gray-100'
                    }`}
                >
                  {/* Selected badge */}
                  {isSelected && (
                    <div className="absolute right-4 top-4">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700">
                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 pr-8 ${isSelected ? 'text-emerald-800' : 'text-gray-900'}`}>
                      {svc.name}
                    </h3>
                    <div className="min-h-12">
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {svc.description || ''}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Show More / Show Less Button */}
        {!servicesLoading && !servicesError && filteredServices.length > INITIAL_VISIBLE_SERVICES && (
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={() => setShowAllServices(!showAllServices)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {showAllServices ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </section>

      {/* ── 2. Years of Experience ────────────────────────────────────────── */}
      <section>
        <SectionTitle
          title="Years of Experience"
          subtitle="How many years have you been working in this field?"
        />
        <input
          type="number"
          min={0}
          max={60}
          value={state.yearsOfExperience}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              yearsOfExperience: e.target.value === '' ? '' : Number(e.target.value),
            }))
          }
          placeholder="e.g. 5"
          className="w-full max-w-xs h-12 border border-slate-300 rounded-xl px-4 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
        />
      </section>

      {/* ── 3. Languages ─────────────────────────────────────────────────── */}
      <section>
        <SectionTitle
          title="Languages"
          subtitle="Select the languages you can communicate in with customers."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LANGUAGES.map((lang) => {
            const checked = state.languages.includes(lang);
            return (
              <label
                key={lang}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-all duration-200 ${checked
                  ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
                  }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleLanguage(lang)}
                  className="accent-emerald-700 h-4 w-4 shrink-0"
                />
                <span className="text-sm font-medium">{lang}</span>
              </label>
            );
          })}
        </div>
      </section>

      {/* ── 4. Brand Expertise ────────────────────────────────────────────── */}
      <section>
        <SectionTitle
          title="Brand Expertise"
          subtitle="Add brands you have specific expertise with."
        />
        <BrandExpertiseInput
          tags={state.brandExpertise}
          onAddTag={handleAddBrand}
          onRemoveTag={handleRemoveBrand}
        />
      </section>

      {/* ── 5. Business Details ──────────────────────────────────────────── */}
      <section>
        <SectionTitle
          title="Business Details"
          subtitle="Optional business information for your technician profile."
        />
        <div className="max-w-md space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            GST Number{' '}
            <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={state.gst}
            onChange={(e) => handleGstChange(e.target.value)}
            placeholder="22AAAAA0000A1Z5"
            maxLength={15}
            className={`w-full h-12 border rounded-xl px-4 text-base focus:outline-none focus:ring-2 transition ${
              gstError
                ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                : 'border-slate-300 focus:ring-emerald-500 focus:border-transparent'
            }`}
          />
          {gstError ? (
            <p className="text-xs text-red-500 mt-1">{gstError}</p>
          ) : (
            <p className="text-xs text-gray-400 mt-1">
              Leave blank if you are not GST registered.
            </p>
          )}
        </div>
      </section>

      {/* ── 6. Equipments ────────────────────────────────────────────────── */}
      <section>
        <SectionTitle
          title="Equipments"
          subtitle="Which equipment do you own and bring to job sites?"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EQUIPMENT_OPTIONS.map(({ key, label, icon: Icon }) => {
            const checked = state[key] as boolean;
            return (
              <label
                key={key}
                className={`flex items-center gap-4 rounded-2xl border p-5 cursor-pointer transition-all duration-200 ${checked
                  ? 'border-emerald-700 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
                  }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleEquipment(key)}
                  className="accent-emerald-700 h-5 w-5 shrink-0"
                />
                <Icon className={`h-6 w-6 shrink-0 transition-colors ${checked ? 'text-emerald-700' : 'text-gray-500'}`} />
                <span className={`font-medium ${checked ? 'text-emerald-800' : 'text-gray-800'}`}>
                  {label}
                </span>
              </label>
            );
          })}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <SkillTaggingFooter onNext={handleNext} disabled={!canProceed} />
    </div>
  );
}
