export const apiUser = "http://localhost:3000/api/user";
export const apiPost = "http://localhost:3000/api/post";
export const apiComment = "http://localhost:3000/api/comment";
export const apiLike = "http://localhost:3000/api/like";

// Mettre un headers à nos requêtes
export const setHeaders = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
