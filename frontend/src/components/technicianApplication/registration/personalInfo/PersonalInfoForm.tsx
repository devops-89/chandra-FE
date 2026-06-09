import BasicInfoFields from "./BasicInfoFields";
import ContinueButton from "./ContinueButton";
import EmailVerificationCard from "./EmailVerificationCard";
import MobileVerificationCard from "./MobileVerificationCard";
import PasswordField from "./PasswordField";

export default function PersonalInfoForm() {
  return (
    <div className="bg-white border rounded-3xl p-8">
      <div className="mb-8">
        <h1 className="text-5xl font-bold">
          Create your professional account
        </h1>

        <p className="text-gray-500 mt-4">
          Provide your basic information to start
          your journey with HiChandra.
        </p>
      </div>

      <div className="space-y-8">
        <BasicInfoFields />

        <PasswordField />

        <div className="space-y-5">
          <MobileVerificationCard />

          <EmailVerificationCard />
        </div>

        <ContinueButton />
      </div>
    </div>
  );
}