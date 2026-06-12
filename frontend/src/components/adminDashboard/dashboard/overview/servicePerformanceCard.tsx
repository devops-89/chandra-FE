'use client';
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import {motion} from 'framer-motion';

export default function ServicePerformanceCard() {
  const services = [
    {
      name: 'Solar',
      value: 42,
    },
    {
      name: 'AC Repair',
      value: 28,
    },
    {
      name: 'Plumbing',
      value: 18,
    },
    {
      name: 'Electrical',
      value: 12,
    },
  ];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-2xl border border-slate-200 bg-white hover:shadow-lg p-5 cursor-default"
    >
    <Card
      elevation={0}
      className="p-6 rounded-2xl"
    >
      <h3 className="font-semibold text-slate-800 mb-6">
        Service Performance
      </h3>

      <div className="space-y-5">
        {services.map((service) => (
          <div key={service.name}>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-600">
                {service.name}
              </span>

              <span className="font-semibold text-slate-800">
                {service.value}%
              </span>
            </div>

            <LinearProgress
              variant="determinate"
              value={service.value}
              sx={{
                height: 8,
                borderRadius: 10,
                backgroundColor: '#e2e8f0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#059669',
                  borderRadius: 10,
                },
              }}
            />
          </div>
        ))}
      </div>
    </Card>
    </motion.div>
  );
}