/* eslint-disable no-unused-vars */
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoadingBookings, bookings } = useRecentBookings();

  const {
    isLoading: isLoadingStays,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();

  const { isLoading: isLoadingCabins, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const numCabins = cabins?.length || 0;

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  //

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        numCabins={numCabins}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
