/* eslint-disable no-unused-vars */
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreackfast, setAddBreackfast] = useState(false);

  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { isCheckingIn, checkin } = useCheckin();
  const { isLoading: isLoadingSettings, settings } = useSettings();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfast = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreackfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
      });
    } else checkin({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />,
      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={addBreackfast}
            onChange={() => {
              setAddBreackfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breackfast"
            disabled={isLoadingSettings}
          >
            Add breackfast for {formatCurrency(optionalBreakfast)}?
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid(!confirmPaid)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid a total amount of{" "}
          {hasBreakfast
            ? formatCurrency(totalPrice)
            : addBreackfast
            ? `${formatCurrency(
                totalPrice + optionalBreakfast
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfast
              )})`
            : formatCurrency(totalPrice)}
          .
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
