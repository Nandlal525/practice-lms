import { useState } from "react";
import Button from "../component/button";
import { useNavigate } from "react-router";
import { PencilIcon, Trash2Icon } from "lucide-react";
import CustomModal from "../component/customModal";

type TRANSACTION_TYPE = "return" | "borrow";

export interface Transaction {
  id: number;
  book_id: number;
  member_id: number;
  transaction_date: string;
  type: TRANSACTION_TYPE;
}

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    // if (selectedTransactionId) {
    //   onDelete(selectedTransactionId);
    // }
    setIsModalOpen(false);
  };

  return (
    <div className="h-full w-full flex flex-col p-8">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-lg font-bold">Transactions</h1>
        <Button
          type="button"
          label="+ Add"
          className="bg-black text-white px-2 text-base cursor-pointer !w-[100px]"
          onClick={() => navigate("/add-transaction")}
        />
      </div>
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th>Book</th>
            <th>Member</th>
            <th>Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactionData?.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.book_id}</td>
              <td>{transaction.member_id}</td>
              <td>{transaction.type}</td>
              <td>{transaction.transaction_date}</td>
              <td>
                <div className="flex gap-4 items-center justify-center">
                  <PencilIcon
                    className="text-blue-400 cursor-pointer"
                    size={16}
                    onClick={() =>
                      navigate(`/edit-transaction/${transaction.id}`)
                    }
                  />
                  <Trash2Icon
                    className="text-red-400 cursor-pointer"
                    size={16}
                    onClick={() => {
                      setSelectedTransactionId(transaction.id);
                      setIsModalOpen(true);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <CustomModal
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}