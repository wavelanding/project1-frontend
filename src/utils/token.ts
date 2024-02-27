// both local and aws works this way
export const setToken = (token: string) => {};

export const getToken = () => {
  return "";
};

export const clearToken = () => localStorage.clear();

// local version
// const TOKEN = "token";

// export const setToken = (token: string) => localStorage.setItem(TOKEN, token);

// export const getToken = () => {
//   const token = localStorage.getItem(TOKEN);
//   return token ? `Bearer ${token}` : "";
// };

// export const clearToken = () => localStorage.clear();
