"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import axios from "axios";

// Define the User interface
export interface User {
  id: number;
  name: string;
  email: string;
}

// Fetch all users once
const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
  return data;
};

// Spinner Component
const Spinner = () => (
  <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div>
);

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 5;

  const { data = [], isLoading, error, isFetching } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Filter and paginate users on the client side
  const filteredUsers = useMemo(() => {
    return data.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const currentUsers = useMemo(() => {
    const start = (currentPage - 1) * usersPerPage;
    return filteredUsers.slice(start, start + usersPerPage);
  }, [currentPage, filteredUsers]);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>
        <h1 className="text-2xl mb-4">Users</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to the first page on new search
          }}
          className="border p-2 rounded mb-6 w-full"
        />

        {/* User List */}
        <ul>
          {isLoading && (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          )}
          {error && <li>Error fetching users.</li>}
          {!isLoading && !error && currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <li key={user.id} className="p-2 border-b last:border-none">
                {user.name} - {user.email}
              </li>
            ))
          ) : (
            !isLoading && !error && <li>No users found.</li>
          )}
        </ul>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Loading State on Page Change */}
        {isFetching && <p className="mt-2 text-sm text-gray-500">Fetching...</p>}
      </div>
    </div>
  );
}
