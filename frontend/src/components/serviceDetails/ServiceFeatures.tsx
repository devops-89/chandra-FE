interface ServiceFeaturesProps {
  features: string[];
}

export default function ServiceFeatures({
  features,
}: ServiceFeaturesProps) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2
          className="
            text-center
            text-3xl
            font-bold
            text-slate-900
          "
        >
          What's Included
        </h2>

        <div
          className="
            mt-12
            grid
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {features.map((feature) => (
            <div
              key={feature}
              className="
                rounded-3xl
                bg-white
                p-6
                shadow-md
              "
            >
              <div className="flex items-center gap-3">
                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-emerald-100
                    text-emerald-600
                  "
                >
                  ✓
                </span>

                <p
                  className="
                    font-medium
                    text-slate-800
                  "
                >
                  {feature}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}