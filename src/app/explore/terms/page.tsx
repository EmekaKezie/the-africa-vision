"use client";
import ReduxProvider from "@/component/common/ReduxProvider";
import UnauthenticatedLayout from "@/component/common/UnauthenticatedLayout";
import PgTermsAndCondition from "@/component/core/PgTermsAndCondition";

function ExploreTermsPage() {
  return (
    <UnauthenticatedLayout>
        <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <PgTermsAndCondition />
    </UnauthenticatedLayout>
  );
}

export default ReduxProvider(ExploreTermsPage);
