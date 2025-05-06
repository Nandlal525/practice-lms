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
  // BookContext - for implementing dark/light Book across the app
  // Context Provider - stores and manipulates context data
  // Context Consumer - useContext() hook to use the context value
  
  interface Book {
    id: number;
    title: string;
    author: string;
    available_copies: number;
    availability: boolean;
  }
  
  interface BookContextValues {
    bookData: Book[];
    onDelete: (id: number) => void;
    updateBook: (book: Book) => void;
  }
  
  const BookContext = createContext<BookContextValues>({
    bookData: [],
    onDelete: () => {},
    updateBook: () => {},
  });
  
  const BooksProvider = ({ children }: { children: React.ReactElement }) => {
    const [bookData, setBookData] = useState<Book[]>([]);
  
    const updateBook = (updateBook: Book) => {
      setBookData([...bookData, updateBook]);
    };
  
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance("/books");
        setBookData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const onDelete = async (id: number) => {
      try {
        await axiosInstance.delete(`/books/${id}`);
        const newData = [...bookData].filter((book) => book.id !== id);
        setBookData(newData);
        toast.success("Book deleted successfully!");
      } catch (err: any) {
        console.log(err);
        toast.error(
          err?.response?.data?.message ?? "Error while deleting the book"
        );
      }
    };
  
    useEffect(() => {
      fetchBooks();
    }, []);
  
    const value = useMemo(() => ({ bookData, onDelete, updateBook }), [bookData]);
    return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
  };
  
  // custom hook that consumes BookContext and returns context values
  const useBook = () => {
    const context = useContext(BookContext);
    return context;
  };
  
  export { useBook, BooksProvider };