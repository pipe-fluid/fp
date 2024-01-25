import { ManagedEmployee } from "~/utils/types";
import { formatDate } from "~/helpers/format-date";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Review } from "@prisma/client";
import { Card } from "../ui/card";

export interface ReviewDashboardCardProps {
  label: string;
  isReviewComplete: boolean;
  managedEmployees: ManagedEmployee[];
}

export function ReviewDashboardCard({
  label,
  isReviewComplete,
  managedEmployees,
}: ReviewDashboardCardProps) {
  const navigate = useNavigate();

  const navigateToReview = (
    employeeId: string,
    reviewId: string,
    isComplete: boolean
  ) => {
    if (isComplete)
      navigate(`/reviews/employee/${employeeId}/review/isComplete/${reviewId}`);

    if (!isComplete) {
      if (reviewId)
        navigate(`/reviews/employee/${employeeId}/review/${reviewId}`);
      else navigate(`/reviews/employee/${employeeId}/review/latest`);
    }
  };

  const renderOngoingReviewButton = (employee: any) => {
    const ongoingReview = employee.reviews.find(
      (review: Review) => !review.isComplete
    );
    return (
      <Button
        onClick={() => navigateToReview(employee.id, ongoingReview?.id, false)}
      >
        {!ongoingReview ? "New Review" : "Continue"}
      </Button>
    );
  };

  const renderEmployeeReview = (employee: any) => {
    if (isReviewComplete) {
      return employee.reviews
        .filter((review: Review) => review.isComplete)
        .map((completedReview: any) => (
          <div key={completedReview.id}>
            <p>
              {formatDate(completedReview.updatedAt)} - {completedReview.name}
            </p>
            <Button
              onClick={() =>
                navigateToReview(employee.id, completedReview.id, true)
              }
            >
              View Details
            </Button>
          </div>
        ));
    } else {
      return renderOngoingReviewButton(employee);
    }
  };

  const renderEmployeeCard = (employee: any) => {
    const finishedReviewsOfSupervisor = employee.reviews.filter(
      (review: Review) => review.isComplete === isReviewComplete
    );

    if (isReviewComplete && finishedReviewsOfSupervisor.length === 0) {
      return null;
    }

    const reviewName =
      finishedReviewsOfSupervisor.length > 0
        ? finishedReviewsOfSupervisor[0].name
        : "Not published";

    console.log(finishedReviewsOfSupervisor);
    return (
      <li key={employee.id}>
        <Card>
          {employee.fullName} - {reviewName}
          {renderEmployeeReview(employee)}
        </Card>
      </li>
    );
  };

  return (
    <Card title={label}>
      <ul>{managedEmployees?.map(renderEmployeeCard)}</ul>
    </Card>
  );
}
