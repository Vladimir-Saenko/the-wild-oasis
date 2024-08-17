import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

import CabinForm from "./CabinForm";

function AddCabin() {
  const [isOpenModal, setIsOpewnModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpewnModal((show) => !show)}>
        Add new Cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpewnModal(false)}>
          <CabinForm onCloseModal={() => setIsOpewnModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
