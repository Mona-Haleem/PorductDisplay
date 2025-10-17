import { getMe } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";


const useUser =(token?:string)=>{
    const query =useQuery({
    queryKey: ["userData"],
    queryFn: () => getMe(token!),
    enabled: !!token,
  });
  return query
}

export default useUser;