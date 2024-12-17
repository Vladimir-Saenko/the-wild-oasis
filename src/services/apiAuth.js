/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);

  return null;
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const avatarFileName = `avatar-${data.user.id}-${Math.round(
    Math.random() * 1000000000
  )}-${avatar.name}`;

  const { error: errorAvatar } = await supabase.storage
    .from("avatars")
    .upload(avatarFileName, avatar);
  if (errorAvatar) throw new Error(errorAvatar.message);

  //Update avatar in User
  const { data: updatedUser, errorUpdatedUser } = supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarFileName}`,
    },
  });

  if (errorUpdatedUser) throw new Error(errorUpdatedUser.message);

  return updatedUser;
}
