import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export interface ICreateProduct {
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
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

// Create product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: IProduct) => {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_API_URL}/products`,
      product
    );
    return response.data; // Return created product data
  }
);

// Fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/products`
    );
    return response.data.data;
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    await axios.delete(
      `${import.meta.env.VITE_REACT_APP_API_URL}/products/${id}`
    );
    return id; // Return the ID of the deleted product
  }
);

// Edit product
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (product: IProduct) => {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}/products/${product._id}`,
      product
    );
    return response.data; // Return updated product data
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products.";
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = [...state.products, action.payload];
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
          state.products[index] = action.payload; // Update the product in the state
        }
      });
  },
});

export const { setProducts, setStatus, setError } = productSlice.actions;
export default productSlice.reducer;
