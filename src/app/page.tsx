

// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import axios from "axios";

// // Define the User interface for type safety
// export interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// // Fetch Users with Pagination and Search
// const fetchUsers = async (page: number, search: string): Promise<User[]> => {
//   const { data } = await axios.get("https://jsonplaceholder.typicode.com/users", {
//     params: {
//       _limit: 5,    // Limit to 5 users per page
//       _page: page,  // Current page
//       q: search,    // Search term
//     },
//   });
//   return data;
// };

// export default function Home() {
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");

//   const { data = [], isLoading, error, isFetching } = useQuery<User[]>({
//     queryKey: ["users", page, searchTerm],
//     queryFn: () => fetchUsers(page, searchTerm),
//     // keepPreviousData: true,
//   });
//   console.log("dataaa===>",data)

//   const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));
//   const handleNext = () => setPage((prev) => prev + 1);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching users.</p>;

//   return (
//     <div className="grid  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <div>
//         <h1 className="text-2xl mb-4">Users</h1>

//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder="Search by name or email"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setPage(1); // Reset to the first page on new search
//           }}
//           className="border p-2 rounded mb-6 w-full"
//         />

//         {/* User List */}
//         <ul>
//           {data && data.length > 0 ? (
//             data.map((user) => (
//               <li key={user.id} className="p-2 border-b last:border-none">
//                 {user.name} - {user.email}
//               </li>
//             ))
//           ) : (
//             <li>No users found.</li>
//           )}
//         </ul>

//         {/* Pagination Controls */}
//         <div className="flex justify-between mt-4">
//           <button
//             onClick={handlePrevious}
//             disabled={page === 1}
//             className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Previous
//           </button>

//           <span className="px-4 py-2">Page {page}</span>

//           <button
//             onClick={handleNext}
//             disabled={data.length < 5}
//             className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>

//         {/* Loading State on Page Change */}
//         {isFetching && <p className="mt-2 text-sm text-gray-500">Fetching...</p>}
//       </div>
//     </div>
//   );
// }

"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

// Define the User interface for type safety
export interface User {
  id: number;
  name: string;
  email: string;
}

// Fetch Users with Pagination and Search
const fetchUsers = async (page: number, search: string): Promise<User[]> => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/users", {
    params: {
      _limit: 5,    // Limit to 5 users per page
      _page: page,  // Current page
      q: search,    // Search term
    },
  });
  return data;
};

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data = [], isLoading, error, isFetching } = useQuery<User[]>({
    queryKey: ["users", page, searchTerm],
    queryFn: () => fetchUsers(page, searchTerm),
  });

  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => prev + 1);

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
            setPage(1); // Reset to the first page on new search
          }}
          className="border p-2 rounded mb-6 w-full"
        />

        {/* User List */}
        <ul>
          {isLoading && <li>Loading...</li>}
          {error && <li>Error fetching users.</li>}
          {!isLoading && !error && data.length > 0 ? (
            data.map((user) => (
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
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2">Page {page}</span>

          <button
            onClick={handleNext}
            disabled={data.length < 5}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Loading State on Page Change */}
        {isFetching && !isLoading && <p className="mt-2 text-sm text-gray-500">Fetching more users...</p>}
      </div>
    </div>
  );
}
