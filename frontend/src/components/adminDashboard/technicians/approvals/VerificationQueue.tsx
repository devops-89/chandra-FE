import { techniciansData } from "@/constants/admin/technicianData";

import VerificationCard from "./VerificationCard";

const VerificationQueue = () => {
  const pending = techniciansData.filter(
    (item) => item.status === "Pending"
  );

  return (
    <div className="space-y-4">
      {pending.map((tech) => (
        <VerificationCard
          key={tech.id}
          name={tech.name}
          experience={tech.experience}
          skills={tech.skills}
        />
      ))}
    </div>
  );
};

export default VerificationQueue;