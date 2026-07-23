import ReviewDetails from '@/components/adminDashboard/reviews/details/ReviewDetails';

export default function Page({ params }: { params: { id: string } }) {
  return <ReviewDetails id={params.id} />;
}
