# Ticket-Master

A modern web application built with Next.js and TypeScript for seamless ticket reservation and management.

## Description

Ticket-Master is a comprehensive platform designed to simplify the process of booking tickets for various events, including buses, trains, flights, movies, and other events. Built with Next.js and TypeScript, this project leverages the power of React, Radix UI, Tailwind CSS, and Zustand to deliver a fast, accessible, and user-friendly experience. This project was created as a semester project for Web Technologies.

## Features

*   **Ticket Booking:** Easily search and book tickets for buses, trains, flights, movies, and events.
*   **User Authentication:** Secure user registration, login, and authentication.
*   **Admin Dashboard:** A dedicated admin panel for managing events, users, and sales data.
*   **Responsive Design:** A fully responsive layout that adapts to different screen sizes and devices.
*   **UI Components:** Utilizes Shadcn UI for accessible and customizable UI components.
*   **State Management:** Zustand for efficient and scalable state management.
*   **Optimized Images:** Next.js Image component for optimized image loading and performance.
*   **Debouncing:** Implemented debouncing to improve performance and reduce unnecessary API calls.
*   **Route Protection:** Admin and Auth verification to protect routes.

## Technologies Used

*   **Programming Language:** TypeScript
*   **Framework:** Next.js
*   **UI Library:** React
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn UI
*   **State Management:** Zustand

## Installation

Follow these steps to set up the project locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/zohaibsaeed117/Ticket-Master.git
    cd Ticket-Master
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Configure environment variables:**

    Create a `.env.local` file in the root directory and add any necessary environment variables.  Example:

    ```
    NEXT_PUBLIC_API_URL=your_api_endpoint
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Open your browser and navigate to `http://localhost:3000` to view the application.

5. **Backend**
    For backend visit this https://github.com/zohaibsaeed117/Ticket-Master-Server

## Usage

### Basic Usage

1.  **Navigate to the Home page:**

    The home page (`/`) displays the landing section with a hero component.

2.  **Explore available tickets:**

    Use the navigation to browse tickets for buses, trains, flights, movies, and events.

3.  **Admin Dashboard:**

    Access the admin dashboard by navigating to `/admin`. Note: Admin verification is required.
## Project Structure

```
Ticket-Master/
├── src/                   # Source code directory
│   ├── app/               # Next.js app router directory
│   │   ├── about/         # About page
│   │   ├── admin/         # Admin pages
│   │   ├── contact/       # Contact page
│   │   ├── explore/       # Explore page
│   │   ├── login/         # Login page
│   │   ├── signup/        # Signup page
│   │   ├── page.tsx       # Home page
│   │   └── ...
│   ├── components/        # React components
│   │   ├── AdminVerify.tsx # Admin verification component
│   │   ├── AuthVerify.tsx  # Authentication verification component
│   │   ├── EventCard.tsx   # Event card component
│   │   ├── Loader.tsx      # Loader component
│   │   ├── MovieCard.tsx   # Movie card component
│   │   ├── RichTextBox.tsx # Rich text editor component
│   │   └── ...
│   ├── data/              # Static data
│   │   └── Cities.json    # List of cities
│   ├── hooks/             # Custom React hooks
│   │   ├── use-mobile.tsx # Mobile detection hook
│   │   └── useOutsideClick.ts # Outside click detection hook
│   ├── lib/               # Utility functions
│   │   ├── debounce.ts    # Debounce function
│   │   └── utils.ts       # Utility functions (cn)
│   ├── store/             # Zustand store
│   │   └── Store.js       # User store
│   └── styles/            # Global styles
│       └── global.css
├── components.json        # Shadcn UI configuration
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── README.md              # Project documentation
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Contributing

We welcome contributions to Ticket-Master! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, concise messages.
4.  Submit a pull request to the main branch.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
