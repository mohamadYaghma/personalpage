"use client"

import Loading from "@/common/Loading";
import { useGetUsers } from "@/hooks/useAuth"
import UsersTable from "./UsersTable";

export default function UsersPage() {
    
   const {data , isLoading} = useGetUsers();
   const { users } = data || {};   

   if (isLoading) return <Loading/> ;
  return (
    <div>
        <h1>اطلاعات کاربران</h1>
        <UsersTable users={users} />
    </div>
  )
}
