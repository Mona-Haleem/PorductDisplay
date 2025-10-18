import { getMe } from "@/api/auth";
import { storage } from "@/utils/storaeg";
import { useQuery } from "@tanstack/react-query";


const useUser = ()=>{
  const token = storage.getString('accsessToken')
  const query =useQuery({
    queryKey: ["userData"],
    queryFn: () => getMe(token!),
    enabled: !!token,
  });
  return query
}

export default useUser;