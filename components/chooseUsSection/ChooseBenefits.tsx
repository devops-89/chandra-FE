import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { ChooseUs } from '@/constants/chooseUs/ChooseUs';

export function ChooseBenefits() {
  return (
    <div className="space-y-6 p-6">
      {ChooseUs.benefits.map((item) => (
        <div
          key={item}
          className="flex items-start gap-4"
        >
          <CheckCircleIcon
            sx={{
              color: '#009966',
              fontSize: 30,
            }}
          />

          <p className="text-lg text-slate-700">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}