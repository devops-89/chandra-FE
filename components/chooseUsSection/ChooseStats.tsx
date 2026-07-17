import { ChooseUs } from '@/constants/chooseUs/ChooseUs';

export function ChooseStats() {
  return (
    <div className="grid grid-cols-3 bg-emerald-600 rounded-b-2xl text-white">
      {ChooseUs.stats.map((item) => (
        <div
          key={item.label}
          className="p-6 text-center"
        >
          <h3 className="text-3xl font-bold">
            {item.value}
          </h3>

          <p className="mt-2 text-sm">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}