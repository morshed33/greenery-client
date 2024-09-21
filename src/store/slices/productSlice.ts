import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define interfaces
export interface IProduct {
  _id?: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  rating: number;
  category: string;
  description: string;
}

interface ProductState {
  products: IProduct[];
  productDetails: IProduct | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pagination: {
    total: number;
    limit: number;
    page: number;
  };
}

const initialState: ProductState = {
  products: [],
  productDetails: null,
  status: "idle",
  error: null,
  pagination: {
    total: 0,
    limit: 10,
    page: 1,
  },
};

// Thunks for async actions
// Fetch all products with query params
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (query: Record<string, unknown>) => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/products`,
      { params: query }
    );
    return response.data.data;
  }
);

// Fetch single product
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id: string) => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/products/${id}`
    );
    return response.data.data;
  }
);

// Create product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: IProduct, { dispatch }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/products`,
      product
    );
    dispatch(fetchProducts({}));
    return response.data.data;
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, { dispatch }) => {
    await axios.delete(
      `${import.meta.env.VITE_REACT_APP_API_URL}/products/${id}`
    );
    dispatch(fetchProducts({}));
    return id;
  }
);

// Edit product
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (product: IProduct, { dispatch }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/products/${product._id}`,
      product
    );
    dispatch(fetchProducts({}));
    return response.data.data;
  }
);

// Product Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearProductDetails(state) {
      state.productDetails = null;
    },
    setPagination(state, action) {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products.";
      })
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
        state.productDetails = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetails = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch product.";
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create product.";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });
  },
});

export const {
  setProducts,
  setStatus,
  setError,
  clearProductDetails,
  setPagination,
} = productSlice.actions;
export default productSlice.reducer;
