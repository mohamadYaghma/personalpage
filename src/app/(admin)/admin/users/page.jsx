"use client";

import Loading from "@/common/Loading";
import { useGetUsers } from "@/hooks/useAuth";
import UsersTable from "./UsersTable";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce"; // Import debounce hook

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 800); // Add debouncing

  const { data, isLoading, refetch } = useGetUsers(debouncedSearchQuery); // Use debounced query
  const { users } = data || {};

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update the search query as user types
  };

  // Refetch data when the debounced query changes
  useEffect(() => {
    refetch();
  }, [debouncedSearchQuery, refetch]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-lg sm:text-xl font-bold mb-4 sm:mb-0">اطلاعات کاربران</h1>

      {/* Search Form */}
      <div className="my-4">
        <input
          type="text"
          placeholder="جستجو نام و شماره تلفن"
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 rounded-md"
        />
      </div>

      {/* Users Table */}
      <UsersTable users={users} />
    </div>
  );
}
