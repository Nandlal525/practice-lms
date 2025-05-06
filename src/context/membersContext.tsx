import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import { axiosInstance } from "../utils/axiosinterceptor";
  import { toast } from "react-toastify";
  
  // contextAPI - for global data management
  // MemberContext - for implementing dark/light Member across the app
  // Context Provider - stores and manipulates context data
  // Context Consumer - useContext() hook to use the context value
  
  interface Member {
    id: number;
    name: string;
    address: string;
    email: string;
    mobile: string;
  }
  
  interface MemberContextValues {
    memberData: Member[];
    onDelete: (id: number) => void;
    updateMember: (book: Member) => void;
  }
  
  const MemberContext = createContext<MemberContextValues>({
    memberData: [],
    onDelete: () => {},
    updateMember: () => {},
  });
  
  const MembersProvider = ({ children }: { children: React.ReactElement }) => {
    const [memberData, setmemberData] = useState<Member[]>([]);
  
    const updateMember = (updateMember: Member) => {
      setmemberData([...memberData, updateMember]);
    };
  
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance("/members");
        setmemberData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const onDelete = async (id: number) => {
      try {
        await axiosInstance.delete(`/members/${id}`);
        const newData = [...memberData].filter((book) => book.id !== id);
        setmemberData(newData);
        toast.success("Member deleted successfully!");
      } catch (err: any) {
        console.log(err);
        toast.error(
          err?.response?.data?.message ?? "Error while deleting the book"
        );
      }
    };
  
    useEffect(() => {
      fetchMembers();
    }, []);
  
    const value = useMemo(
      () => ({ memberData, onDelete, updateMember }),
      [memberData]
    );
    return (
      <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
    );
  };
  
  // custom hook that consumes MemberContext and returns context values
  const useMember = () => {
    const context = useContext(MemberContext);
    return context;
  };
  
  export { useMember, MembersProvider };