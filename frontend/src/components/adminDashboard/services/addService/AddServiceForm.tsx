import BasicInfoStep from "./BasicInfoStep";
import DescriptionStep from "./DescriptionStep";
import PricingStep from "./PricingStep";
import PublishStep from "./PublishStep";
import RequirementsStep from "./RequirementsStep";

const AddServiceForm = () => {
  return (
    <div className="space-y-6 rounded-2xl border bg-white p-6">
      <BasicInfoStep />

      <DescriptionStep />

      <PricingStep />

      <RequirementsStep />

      <PublishStep />

      <div className="flex justify-end">
        <button className="rounded-xl bg-emerald-600 px-6 py-3 text-white">
          Publish Service
        </button>
      </div>
    </div>
  );
};

export default AddServiceForm;