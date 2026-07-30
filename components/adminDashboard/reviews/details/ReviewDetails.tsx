'use client';

import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ReviewControllers } from '@/api/reviewControllers';
export interface ReviewData {
  id: string;
  reviewerName: string;
  reviewForName: string;
  serviceName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'Published' | 'Hidden';
  type: 'Customer' | 'Technician';
}

const ReviewDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const [review, setReview] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'Published' | 'Hidden'>('Published');
  const [lastAction, setLastAction] = useState<string | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await ReviewControllers.getAllReviews();
        if (response.data?.success) {
          const fetchedReviews = response.data.data.reviews || [];

          let found: ReviewData | null = null;
          fetchedReviews.forEach((r: any) => {
            if (r.customerReview && `${r.bookingId}-customer` === id) {
              found = {
                id: `${r.bookingId}-customer`,
                reviewerName: r.customerReview.reviewer?.name || 'Unknown',
                reviewForName: r.customerReview.reviewFor?.name || 'Unknown',
                serviceName: r.service?.name || 'Unknown',
                rating: r.customerReview.rating || 0,
                comment: r.customerReview.review || '',
                date: new Date(r.reviewedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                status: 'Published',
                type: 'Customer'
              };
            }
            if (r.technicianReview && `${r.bookingId}-technician` === id) {
              found = {
                id: `${r.bookingId}-technician`,
                reviewerName: r.technicianReview.reviewer?.name || 'Unknown',
                reviewForName: r.technicianReview.reviewFor?.name || 'Unknown',
                serviceName: r.service?.name || 'Unknown',
                rating: r.technicianReview.rating || 0,
                comment: r.technicianReview.review || '',
                date: new Date(r.reviewedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                status: 'Published',
                type: 'Technician'
              };
            }
          });
          setReview(found);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <CircularProgress sx={{ color: '#059669' }} />
      </div>
    );
  }

  if (!review) {
    return (
      <div className="text-center py-20 text-slate-500">
        Review not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Review Details</h1>
          <p className="text-slate-500">View and manage review</p>
        </div>
        <button
          onClick={() => router.back()}
          className="rounded-lg border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Back
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm border border-slate-100 max-w-2xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 border border-slate-100">
            <span className="text-sm font-medium text-slate-500">Current status</span>
            <span
              className={`rounded-full px-3 py-0.5 text-xs font-semibold ${status === 'Published'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
                }`}
            >
              {status}
            </span>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Review Type:</h4>
            <p className="mt-1 text-slate-600 font-medium">{review.type} Review</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Reviewer:</h4>
            <p className="mt-1 text-slate-600">{review.reviewerName}</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Reviewed for:</h4>
            <p className="mt-1 text-slate-600">{review.reviewForName}</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Service:</h4>
            <p className="mt-1 text-slate-600">{review.serviceName}</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Rating:</h4>
            <p className="mt-1 text-amber-500">{'⭐'.repeat(review.rating)}</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Review:</h4>
            <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600 italic">
              &ldquo;{review.comment}&rdquo;
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => { setStatus('Published'); setLastAction('Review published successfully.'); }}
              disabled={status === 'Published'}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Publish
            </button>

            <button
              onClick={() => { setStatus('Hidden'); setLastAction('Review hidden from public view.'); }}
              disabled={status === 'Hidden'}
              className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Hide Review
            </button>
          </div>

          {lastAction && (
            <p className="text-xs font-medium text-slate-500">
              ✓ {lastAction}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
