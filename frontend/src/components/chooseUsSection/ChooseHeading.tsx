import { ChooseUs } from '@/constants/chooseUs/ChooseUs';

export function ChooseHeading() {
  return (
    <div className="mb-12 text-center">
      <p className="text-lg text-black">
        {ChooseUs.paragraph}
      </p>

      <h2 className="mt-3 text-4xl text-background font-bold md:text-5xl">
        {ChooseUs.heading}
      </h2>
    </div>
  );
}