/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CabinForm from "./CabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import {
  HiDocumentDuplicate,
  HiMinusCircle,
  HiPencilSquare,
} from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { creationCabin } = useCreateCabin();

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
    <Table.Row>
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
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiDocumentDuplicate />}
                onClick={handleCopyCabin}
              >
                Clone
              </Menus.Button>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencilSquare />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiMinusCircle />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CabinForm editCabin={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabin"
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
