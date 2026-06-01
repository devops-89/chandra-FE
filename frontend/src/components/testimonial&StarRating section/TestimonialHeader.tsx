import { SliderControls } from './SliderControls';

export function TestimonialHeader() {
  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-4xl font-bold tracking-[-0.04em] text-slate-950 md:text-5xl">
          Real Stories from{' '}
          <span className="text-emerald-600">
            Real Users
          </span>
        </h2>

        <p className="mt-4 text-lg text-slate-950">
          Success Stories: Better Decisions Through Better Organization
        </p>
      </div>

      <SliderControls />
    </div>
  );
}