'use client';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

export interface BreadcrumbTab {
  id: string;
  label: string;
  count: number;
  dotColor: string;
}

interface Props {
  tabs: BreadcrumbTab[];
  active: string;
  onChange: (id: string) => void;
}

const AdminBreadcrumbTabs = ({ tabs, active, onChange }: Props) => (
  <Breadcrumbs
    aria-label="admin tabs"
    separator=""
    sx={{
      '& .MuiBreadcrumbs-ol': {
        flexWrap: 'nowrap',
        overflowX: 'auto',
        gap: '4px',
        pb: '2px',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      },
      '& .MuiBreadcrumbs-separator': { display: 'none' },
      '& .MuiBreadcrumbs-li': { display: 'flex' },
    }}
  >
    {tabs.map((tab) => {
      const isActive = active === tab.id;
      return (
        <Typography
          key={tab.id}
          component="button"
          onClick={() => onChange(tab.id)}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '12px',
            px: '14px',
            py: '8px',
            fontSize: '0.8125rem',
            fontWeight: 500,
            fontFamily: 'inherit',
            transition: 'all 0.2s ease',
            backgroundColor: isActive ? '#059669' : 'transparent',
            color: isActive ? '#fff' : '#64748b',
            boxShadow: isActive ? '0 1px 4px rgba(5,150,105,0.3)' : 'none',
            '&:hover': {
              backgroundColor: isActive ? '#047857' : '#f1f5f9',
              color: isActive ? '#fff' : '#1e293b',
            },
          }}
        >
          {/* dot */}
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              flexShrink: 0,
              backgroundColor: isActive ? 'rgba(255,255,255,0.7)' : tab.dotColor,
              transition: 'background-color 0.2s ease',
            }}
          />

          {tab.label}

          {/* count badge */}
          <span
            style={{
              borderRadius: '999px',
              padding: '1px 6px',
              fontSize: '0.6875rem',
              fontWeight: 700,
              lineHeight: 1.4,
              backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#f1f5f9',
              color: isActive ? '#fff' : '#64748b',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.count}
          </span>
        </Typography>
      );
    })}
  </Breadcrumbs>
);

export default AdminBreadcrumbTabs;
