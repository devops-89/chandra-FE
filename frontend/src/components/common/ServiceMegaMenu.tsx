import Link from 'next/link';

import { servicesMenu } from '@/constants/navigation/servicesMenu';

const ServiceMegaMenu = () => {
  return (
    <div
      className="
        w-96
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-2xl
        shadow-slate-900/8
        ring-1
        ring-slate-950/5
      "
    >
      {/* Premium Header */}
      <div className="border-b border-slate-100/50 px-5 py-4">
        <h3
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.12em]
            text-slate-500
          "
        >
          Popular Services
        </h3>
      </div>

      {/* Service Items */}
      <div className="divide-y divide-slate-100/60">
        {servicesMenu.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="
              group
              flex
              items-start
              gap-4
              px-5
              py-4
              transition-all
              duration-200
              hover:bg-linear-to-r
              hover:from-emerald-50/50
              hover:to-transparent
            "
          >
            {/* Icon Container - Premium treatment */}
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-emerald-100/60
                text-lg
                transition-all
                duration-200
                group-hover:bg-emerald-200/70
              "
            >
              {service.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4
                className="
                  text-sm
                  font-semibold
                  text-slate-900
                  transition-colors
                  duration-200
                  group-hover:text-emerald-700
                "
              >
                {service.title}
              </h4>

              <p
                className="
                  mt-1
                  text-xs
                  leading-relaxed
                  text-slate-600
                  transition-colors
                  duration-200
                  group-hover:text-slate-700
                "
              >
                {service.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Premium CTA Footer */}
      <Link
        href="/services"
        className="
          group
          block
          border-t
          border-slate-100/50
          px-5
          py-4
          transition-all
          duration-200
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            transition-colors
            duration-200
          "
        >
          <span
            className="
              text-sm
              font-medium
              text-emerald-700
              transition-colors
              duration-200
              group-hover:text-emerald-800
            "
          >
            View All Services
          </span>

          {/* Arrow with animation */}
          <svg
            className="
              h-4
              w-4
              text-emerald-700
              transition-all
              duration-300
              group-hover:translate-x-1
              group-hover:text-emerald-800
            "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Link>
    </div>
  );
};

export default ServiceMegaMenu;