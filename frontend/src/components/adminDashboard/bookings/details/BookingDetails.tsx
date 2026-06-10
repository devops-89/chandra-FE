import BookingTimeline from "./BookingTimeline";
import CustomerInfo from "./CustomerInfo";
import PaymentInfo from "./PaymentInfo";
import TechnicianInfo from "./TechnicianInfo";

const BookingDetails = () => {
  return (
    <div className="space-y-6">
      <BookingTimeline />

      <div className="grid gap-6 lg:grid-cols-3">
        <CustomerInfo />
        <TechnicianInfo />
        <PaymentInfo />
      </div>
    </div>
  );
};

export default BookingDetails;