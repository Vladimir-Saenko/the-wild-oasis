/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CabinForm from "./CabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin-left: 2.4rem;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Capacity = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
    description,
  } = cabin;

  const [showForm, setShowForm] = useState(false);

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, creationCabin } = useCreateCabin();

  function handleCopyCabin() {
    creationCabin({
      name: `Copy ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image}></Img>
        <Cabin>{name}</Cabin>
        <Capacity>Up to {maxCapacity}</Capacity>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={handleCopyCabin} disabled={isDeleting | isCreating}>
            Copy
          </button>
          <button
            onClick={() => setShowForm((show) => !show)}
            disabled={isDeleting | isCreating}
          >
            Edit
          </button>
          <button
            onClick={() => deleteCabin(cabinId)}
            disabled={isDeleting | isCreating}
          >
            Delete
          </button>
        </div>
      </TableRow>
      {showForm && <CabinForm editCabin={cabin} />}
    </>
  );
}

export default CabinRow;
