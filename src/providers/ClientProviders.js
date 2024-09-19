"use client";

import { CategoryProvider } from "@/context/CategoryContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function ClientProviders({ children }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <CategoryProvider>
                {children}
            </CategoryProvider>
        </QueryClientProvider>
    );
}
