// Define the base URL for the API
export const baseUrl = import.meta.env.VITE_API_URL;

export const API_PATH = {
  POSTER: {
    ADD: "/poster/add",
    GET: "/poster/get",
    UPDATE: "/poster/update",
    DELETE: "/poster/delete",
  },
  IMAGE: {
    UPLOAD: "/api/image/upload",
  },
  GALLERY: {
    LOAD_ALL: "/api/gallery/load-all-galleries",
    CREATE: "/api/gallery/create-gallery",
    UPDATE: "/api/gallery/update-gallery",
    DELETE: "/api/gallery/delete-gallery",
  },
  POSTER: {
    LOAD_ALL: "/api/poster/load-all-posters",
    CREATE: "/api/poster/create-poster",
    UPDATE: "/api/poster/update-poster",
    DELETE: "/api/poster/delete-poster",
  },
  REVIEW: {
    LOAD_ALL: "/api/review/load-all-reviews",
    CREATE: "/api/review/create-review",
    UPDATE: "/api/review/update-review",
    DELETE: "/api/review/delete-review",
  },
  PRODUCT: {
    LOAD_ALL: "/api/product/load-all-products",
    CREATE: "/api/product/create-product",
    UPDATE: "/api/product/update-product",
    DELETE: "/api/product/delete-product",
  },
  USER: {
    LOGIN: "/api/user/login",
    CREATE: "/api/user/create-user",
    UPDATE: "/api/user/update-user",
    CHANGE_PASSWORD: "/api/user/change-password",
  },
};
