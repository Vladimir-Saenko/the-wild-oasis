import supabase, { supabaseUrl } from "./supabase";

const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/`;

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins not loaded.");
  }

  return data;
}

const randomStr = Math.random().toString(36); // toString(36) - [0-9] + [a-z]

export async function createCabin(newCabin) {
  // Создание имени файла для картинки из случайных цифр, латинских букв и исходного имени
  const imageName = `_${randomStr.slice(2, 9)}-${newCabin.image.name}`;
  const hasImage =
    typeof newCabin.image === "string"
      ? true
      : newCabin.image?.name.startsWith(supabaseUrl);

  console.log(newCabin.image);
  console.log(`imageName=${imageName}; hasImage=${hasImage}`);

  // 1. Создание домика
  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        ...newCabin,
        image: hasImage ? newCabin.image : `${imagePath}${imageName}`,
      },
    ])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created.");
  }

  // 2. Если нет ошибки, то загружаем картинку
  if (!hasImage) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // 3. Если файл не загрузился, то удаляем домик из БД
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);

      console.log(storageError);
      throw new Error(
        "Cabin image could not be uploaded and cabin was not created."
      );
    }
  }

  return data;
}

export async function updateCabin(cabinNewData, editId) {
  const { image } = cabinNewData;
  // Проверяем, изменяется ли картинка
  const imageName = !image.toString().startsWith(supabaseUrl)
    ? `_${randomStr.slice(2, 9)}-${cabinNewData.image.name}`
    : image.slice(imagePath.length);

  console.log(image, imageName);

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabinNewData, image: `${imagePath}${imageName}` })
    .eq("id", editId)
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be updated.");
  }

  // Если картинка изменилась, загружаем её в хранилище
  if (image !== `${imagePath}${imageName}`) {
    const { error: updateImageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabinNewData.image);

    // Если картинка не загрузилась, выкидываем уведомленмие
    if (updateImageError) {
      console.log(updateImageError);
      throw new Error(
        "Cabin image could not be updated! Upload the image again."
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted.");
  }

  return null;
}
