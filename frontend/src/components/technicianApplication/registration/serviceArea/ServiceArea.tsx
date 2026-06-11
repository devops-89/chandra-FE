'use client';

import AreaSelector from './AreaSelector';
import CoverageSummary from './CoverageSummary';
import { useServiceArea } from './hooks/useServiceArea';
import PincodeMapping from './PincodeMapping';
import PreferredAreasInput from './PreferredAreasInput';
import ServiceAreaFooter from './ServiceAreaFooter';
import ServiceAreaHeader from './ServiceAreaHeader';

interface ServiceAreaProps {
  onPrevious: () => void;
  onSubmit: (data: any) => void;
}

export default function ServiceArea({
  onPrevious,
  onSubmit,
}: ServiceAreaProps) {
  const {
    state,
    setRadius,
    addArea,
    removeArea,
    addPincode,
    removePincode,
  } = useServiceArea();

  const handleSubmit = () => {
    sessionStorage.setItem('serviceAreaData', JSON.stringify(state));
    onSubmit(state);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <ServiceAreaHeader />

        <AreaSelector value={state.radius} onChange={setRadius} />

        <PreferredAreasInput
          selectedAreas={state.preferredAreas}
          onAddArea={addArea}
          onRemoveArea={removeArea}
        />

        <PincodeMapping
          pincodes={state.pincodes}
          onAddPincode={addPincode}
          onRemovePincode={removePincode}
        />

        <ServiceAreaFooter
          onPrevious={onPrevious}
          onSubmit={handleSubmit}
        />
      </div>

      {/* Sticky Summary Sidebar */}
      <div className="hidden lg:block">
        <CoverageSummary
          radius={state.radius}
          areasCount={state.preferredAreas.length}
          pincodesCount={state.pincodes.length}
        />
      </div>

      {/* Mobile Summary (below content) */}
      <div className="lg:hidden">
        <CoverageSummary
          radius={state.radius}
          areasCount={state.preferredAreas.length}
          pincodesCount={state.pincodes.length}
        />
      </div>
    </div>
  );
}
