import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchProducts } from "@/store/slices/productSlice";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Tabs, TabsTrigger, TabsList } from "../ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import PlantSpinner from "../PlantSpinner";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, error, pagination } = useAppSelector(
    (state) => state.products
  );

  // is loading
  const loading = useAppSelector(
    (state) => state.products.status === "loading"
  );
  const totalProducts = pagination.total || 0;

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("price asc"); // Default sort
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch products when dependencies change
  useEffect(() => {
    dispatch(
      fetchProducts({
        searchTerm,
        sortBy,
        page,
        limit,
        category: selectedCategory,
      })
    );
  }, [dispatch, searchTerm, selectedCategory, sortBy, page]);

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1); // Reset to first page on category change
  };

  const handleSortChange = (criteria: string) => {
    setSortBy(criteria);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      {/* Search, Tabs, and Sort - Responsive Layout */}
      <div className="grid grid-cols-5 gap-4 w-full my-10">
        {/* Search and Sort for small screens */}
        <div className="col-span-3 sm:col-span-1 sm:col-start-1 sm:col-end-2">
          <Input
            placeholder="Search plants 🪴..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-green-200 border-green-400 focus:outline-none focus:ring focus:ring-green-300 rounded-md"
          />
        </div>

        {/* Tabs for categories */}
        <div className="md:mx-auto col-span-5 sm:col-span-3 row-start-1 sm:col-start-2 overflow-x-auto rounded-md">
          <Tabs
            className=""
            defaultValue=""
            onValueChange={handleCategoryChange}
          >
            <TabsList className="bg-green-700 text-green-100 rounded-md">
              <TabsTrigger value="">All</TabsTrigger>
              <TabsTrigger value="flower">Flowers</TabsTrigger>
              <TabsTrigger value="indoor">Indoor Plants</TabsTrigger>
              <TabsTrigger value="outdoor">Outdoor Plants</TabsTrigger>
              <TabsTrigger value="succulent">Succulents</TabsTrigger>
              <TabsTrigger value="herbs">Herbs</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full bg-green-200 border-green-400"
              >
                🪴
                <span className="capitalize ms-2">
                  {sortBy.split(" ")[0]}{" "}
                  {sortBy.split(" ")[1] === "asc" ? `Ascending` : `Descending`}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-green-200">
              <DropdownMenuLabel>Sort 🪴 By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={sortBy === "price asc"}
                onCheckedChange={() => handleSortChange("price asc")}
              >
                Price: Low to High
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "price desc"}
                onCheckedChange={() => handleSortChange("price desc")}
              >
                Price: High to Low
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "rating asc"}
                onCheckedChange={() => handleSortChange("rating asc")}
              >
                Rating: Low to High
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "rating desc"}
                onCheckedChange={() => handleSortChange("rating desc")}
              >
                Rating: High to Low
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center my-10">
          <PlantSpinner /> {/* Simple loading animation */}
        </div>
      ) : error ? (
        <div className="text-center text-red-600 my-10">
          <p>Failed to load products. Please try again later.</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center my-10 text-gray-600">
          <p>No products found for this category or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div
                onClick={() => handleProductClick(product._id!)}
                className="cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-600 mt-1">
                  Price: ${product.price.toFixed(2)}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-gray-600">{product.rating}</span>
                </div>
                <button
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all duration-300"
                  onClick={() => alert("Added to cart!")}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalProducts > 0 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {page > 1 ? (
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(page - 1)}
                  />
                ) : (
                  <span className="opacity-50 cursor-not-allowed">
                    Previous
                  </span>
                )}
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(idx + 1)}
                    className={page === idx + 1 ? "font-bold" : ""}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                {page < totalPages ? (
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(page + 1)}
                  />
                ) : (
                  <span className="opacity-50 cursor-not-allowed">Next</span>
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductList;
