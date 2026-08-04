'use client';

import { Box, CircularProgress,Typography } from '@mui/material';
import { CheckCircle, ChevronLeft, ClipboardList, Clock, DollarSign, Info, PenTool, ShieldAlert,Tag, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { AdminControllers } from '@/api/adminControllers';
import type { AdminService } from '@/types/admin/service.types';

export default function ServiceDetailsPageWrapper({ serviceId }: { serviceId: number }) {
  const router = useRouter();
  const [service, setService] = useState<AdminService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchService() {
      try {
        setLoading(true);
        const data = await AdminControllers.getServiceByIdForAdmin(serviceId);
        setService(data);
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch service details');
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, [serviceId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !service) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">{error || 'Service not found'}</Typography>
        <button
          onClick={() => router.push('/admin/services')}
          className="mt-4 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Back to Services
        </button>
      </Box>
    );
  }

  const pricing = (service as any).pricingRule || {};
  const specs = service.specifications || [];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Service Details</h1>
          <p className="text-sm text-slate-500 mt-1">Viewing all information for this service</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/services')}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Services
          </button>
          <button
            onClick={() => router.push(`/admin/services/edit/${service.id}`)}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            <PenTool size={16} />
            Edit Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column - Main Info */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Basic Info Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="rounded-lg bg-blue-50 p-2">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Basic Information</h2>
            </div>
            
            <div className="flex gap-6 items-start">
              {/* Image Preview & Status */}
              <div className="shrink-0 flex flex-col items-center gap-3">
                <div className="h-32 w-32 rounded-xl border border-slate-200 bg-slate-50 p-2 flex items-center justify-center overflow-hidden">
                  {(service as any).iconDownloadUrl || (service as any).iconUrl || service.image ? (
                     
                    <img 
                      src={(service as any).iconDownloadUrl || (service as any).iconUrl || service.image} 
                      alt={service.name} 
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='8' fill='%23e2e8f0'/%3E%3Cpath d='M16 30 Q24 18 32 30' stroke='%2394a3b8' stroke-width='2' fill='none'/%3E%3Ccircle cx='20' cy='22' r='3' fill='%2394a3b8'/%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center">
                      <Info size={24} className="mb-2 opacity-20" />
                      <span className="text-xs">No Icon</span>
                    </div>
                  )}
                </div>
                
                {/* Status Tab under Image */}
                <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${
                  service.isActive 
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700' 
                    : 'border-red-200 bg-red-50 text-red-600'
                }`}>
                  {service.isActive ? <CheckCircle size={14} className="text-emerald-500"/> : <ShieldAlert size={14} className="text-red-500"/>}
                  {service.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
              
              {/* Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Service Name</h3>
                  <p className="text-lg font-medium text-slate-800">{service.name}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Description</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{service.description || 'No description provided.'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="rounded-lg bg-indigo-50 p-2">
                <ClipboardList className="h-5 w-5 text-indigo-500" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Booking Specifications</h2>
            </div>
            
            {specs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-8 text-center">
                <p className="text-sm text-slate-500">No specifications required for booking.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {specs.map((spec: any, idx: number) => (
                  <div key={spec.id || idx} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded shadow-sm border border-slate-200">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-slate-700">{spec.name}</span>
                        {spec.isRequired && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Required</span>
                        )}
                      </div>
                    </div>
                    
                    {spec.type === 'select' && spec.values && spec.values.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {spec.values.map((val: string, i: number) => (
                          <span key={i} className="inline-flex items-center rounded-lg bg-white border border-slate-200 px-3 py-1 text-xs text-slate-600 shadow-sm">
                            {val}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Pricing */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="rounded-lg bg-emerald-50 p-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Pricing Rules</h2>
            </div>

            <div className="space-y-4">
              {pricing.isServiceBasePriceApplied && (
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Tag size={16} />
                    <span className="text-sm font-medium">Base Price</span>
                  </div>
                  <span className="text-lg font-bold text-slate-800">₹{pricing.serviceBasePrice || '0.00'}</span>
                </div>
              )}
              
              {pricing.isPerHourRateApplied && (
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={16} />
                    <span className="text-sm font-medium">Per Hour Rate</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {pricing.perHourRate ? `₹${pricing.perHourRate}/hr` : '-'}
                  </span>
                </div>
              )}

              {pricing.isDistanceKmApplied && (
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Truck size={16} />
                    <span className="text-sm font-medium">Per KM Rate</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {pricing.perKmRate ? `₹${pricing.perKmRate}/km` : '-'}
                  </span>
                </div>
              )}

              {pricing.isPlatformFeeApplied && (
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="text-sm font-medium">Platform Fee</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {pricing.platformFee ? `₹${pricing.platformFee}` : '-'}
                  </span>
                </div>
              )}

              {pricing.isGstApplied && (
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="text-sm font-medium">GST</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {pricing.gst ? `${pricing.gst}%` : '-'}
                  </span>
                </div>
              )}

              {pricing.isEmergencyApplied && (
                <div className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-2 text-red-600">
                    <ShieldAlert size={16} />
                    <span className="text-sm font-medium">Emergency Charge</span>
                  </div>
                  <span className="text-sm font-semibold text-red-600">
                    {pricing.emergencyCharge ? `₹${pricing.emergencyCharge}` : '-'}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-4 mt-2 border-t border-slate-200 gap-2">
                <span className="text-sm font-bold text-slate-800">Total Estimated Amount:</span>
                <span className="text-lg font-extrabold text-emerald-600">
                  ₹{(
                    (pricing.isServiceBasePriceApplied ? parseFloat(pricing.serviceBasePrice || '0') : 0) +
                    (pricing.isPlatformFeeApplied ? parseFloat(pricing.platformFee || '0') : 0) +
                    (pricing.isEmergencyApplied ? parseFloat(pricing.emergencyCharge || '0') : 0)
                  ) * (1 + (pricing.isGstApplied ? parseFloat(pricing.gst || '0') / 100 : 0)) === 0 
                    ? '0.00' 
                    : ((
                        (pricing.isServiceBasePriceApplied ? parseFloat(pricing.serviceBasePrice || '0') : 0) +
                        (pricing.isPlatformFeeApplied ? parseFloat(pricing.platformFee || '0') : 0) +
                        (pricing.isEmergencyApplied ? parseFloat(pricing.emergencyCharge || '0') : 0)
                      ) * (1 + (pricing.isGstApplied ? parseFloat(pricing.gst || '0') / 100 : 0))).toFixed(2)
                  }
                  { (pricing.isPerHourRateApplied || pricing.isDistanceKmApplied) && <span className="text-sm font-normal text-slate-500 ml-1">+ variables</span> }
                </span>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
