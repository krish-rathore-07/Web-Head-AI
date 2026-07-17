import api from "./api";

export const updateProfile = async (
  name
) => {
  const response = await api.patch(
    "/api/users/me",
    {
      name,
    }
  );

  return response.data;
};

export const changePassword = async (data) => {

    await api.patch(
        "/api/users/me/password",
        data
    );

};

export const deleteAccount = async (password) => {
  await api.delete("/api/users/me", {
    data: {
      password,
    },
  });
};
