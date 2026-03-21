import React from "react";
import {
  CreditCard,
  Banknote,
  Building2,
  CheckCircle2,
  Clock,
  XCircle,
  Edit2,
  Trash2,
} from "lucide-react";

interface TransactionRowProps {
  tx: Transaction;
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionRowProps> = ({
  tx,
  onEdit,
  onDelete,
}) => {
 
  
  const getMethodIcon = (method: Transaction["method"]) => {
    switch (method) {
      case "Credit Card":
        return <CreditCard className="w-4 h-4" />;
      case "Cash":
        return <Banknote className="w-4 h-4" />;
      case "Bank Transfer":
        return <Building2 className="w-4 h-4" />;
    }
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="px-6 py-4">
        <span className="font-bold text-slate-800">
          TXN-{tx.id.toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-emerald-600 font-medium">
          {tx.bookingId.toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-slate-600">
          {getMethodIcon(tx.method)}
          <span className="text-sm">{tx.method}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-500">{tx.date}</span>
      </td>
      <td className="px-6 py-4">
        <span className="font-bold text-slate-800">
          {tx.amount.toLocaleString()}đ
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(tx.status)}`}
        >
          {tx.status === "Success" ? (
            <CheckCircle2 className="w-3.5 h-3.5" />
          ) : tx.status === "Pending" ? (
            <Clock className="w-3.5 h-3.5" />
          ) : (
            <XCircle className="w-3.5 h-3.5" />
          )}
          {tx.status === "Success"
            ? "Thành công"
            : tx.status === "Pending"
              ? "Đang xử lý"
              : tx.status === "Failed"
                ? "Thất bại"
                : "Đã hoàn tiền"}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(tx)}
            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(tx.id)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionList;
