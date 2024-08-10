import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

// eslint-disable-next-line react/prop-types
function CabinForm({ editCabin = {} }) {
  const { id: editId, ...editValues } = editCabin;
  const isEditMode = Boolean(editId);

  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditMode ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, creationCabin } = useCreateCabin();

  const { isEditing, updatingCabin } = useUpdateCabin();

  const isWorking = isCreating | isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (!isEditMode)
      creationCabin(
        { ...data, image },
        {
          onSuccess: () => reset(),
        }
      );
    else
      updatingCabin(
        { cabinNewData: { ...data, image }, id: editId },
        {
          onSuccess: () => reset(),
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Cabin name"
        fieldName="name"
        errorMessage={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required.",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        fieldName="maxCapacity"
        errorMessage={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "Capacity shold be at least 1.",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        fieldName="regularPrice"
        errorMessage={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required.",
            min: {
              value: 0,
              message: "Price shold be at least 0",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Discount"
        fieldName="discounte"
        errorMessage={errors?.discounte?.message}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required.",
            validate: (value) =>
              Number(value) < Number(getValues().regularPrice),
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        fieldName="description"
        errorMessage={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required.",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label="Cabin photo"
        fieldName="image"
        errorMessage={errors?.image?.message}
      >
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image")}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditMode ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CabinForm;
