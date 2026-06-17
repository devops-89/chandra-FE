'use client';

import JobCard from './JobCard';

const jobs = [
  {
    id: 1,
    serviceType: 'AC Deep Cleaning',
    customerName: 'Arjun K.',
    distance: '2.4 km away',
    payout: '₹850',
    time: '2:30 PM',
    variant: 'green' as const,
  },

  {
    id: 2,
    serviceType: 'Kitchen Plumbing',
    customerName: 'Sarah M.',
    distance: '4.1 km away',
    payout: '₹450',
    time: '4:00 PM',
    variant: 'blue' as const,
  },
];

export default function NearbyJobsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          serviceType={job.serviceType}
          customerName={job.customerName}
          distance={job.distance}
          payout={job.payout}
          time={job.time}
          variant={job.variant}
        />
      ))}
    </div>
  );
}