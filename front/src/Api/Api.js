// export const apiUser = "https://groupomaniatonymarques.herokuapp.com/api/user";
// export const apiPost = "https://groupomaniatonymarques.herokuapp.com/api/post";
// export const apiComment =
//   "https://groupomaniatonymarques.herokuapp.com/api/comment";
// export const apiLike = "https://groupomaniatonymarques.herokuapp.com/api/like";
export const apiUser = "http://localhost:5000/api/user";
export const apiPost = "http://localhost:5000/api/post";
export const apiComment = "http://localhost:5000/api/comment";
export const apiLike = "http://localhost:5000/api/like";

// Mettre un headers à nos requêtes
export const setHeaders = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
