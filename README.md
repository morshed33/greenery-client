# Greenery Frontend [Live Demo](https://gc-lime.vercel.app/).

## Introduction

The frontend for Greenery, a modern plant-selling e-commerce platform. Built with React and styled using Tailwind CSS, the application provides users with a clean, responsive interface for browsing and purchasing plants. Features include product filtering, sorting, pagination, and a shopping cart system.

## Features

- **Product Browsing**: Users can view a list of available plants.
- **Search and Filter**: Users can search for plants by name and filter by categories.
- **Sorting and Pagination**: Products can be sorted by price, name, or category.
- **Responsive Design**: Optimized for desktop, tablet, and mobile views.
- **Animations**: Smooth transitions and interactive UI elements powered by Tailwind CSS animations.

## Technology Stack

- **React**: Core framework for building the UI.
- **Redux**: State management for managing cart, products, and other global states.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **shadCN UI**: Customizable React components for building user interfaces.
- **React Router Dom**: Handles routing between different pages (e.g., home, products, details).
- **Axios**: HTTP client to fetch data from the backend.
- **React Slick**: Carousel for product display.

## Installation Guideline

### Prerequisites

- **Node.js**: Make sure Node.js is installed. You can download it from [here](https://nodejs.org/en/).

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/morshed33/greenery-client.git
   cd greenery-client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create an environment file**:

   In the root directory, create a `.env` file and add the following environment variables:

   ```bash
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. **Access the app**:

   Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Usage

- Browse products, apply filters, and view product details.
- Add products to the cart, modify quantities, and proceed to checkout (without payment integration).
- Use sorting options and category filters to explore the product catalog.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
