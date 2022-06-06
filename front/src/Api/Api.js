export const apiUser = "https://localhost:5000/api/user";
export const apiPost = "https://localhost:5000/api/post";
export const apiComment = "https://localhost:5000/api/comment";
export const apiLike = "https://localhost:5000/api/like";

// Mettre un headers à nos requêtes
export const setHeaders = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
