// import React from "react";
// import {
//   CreditCard,
//   Banknote,
//   Building2,
//   CheckCircle2,
//   Clock,
//   XCircle,
//   Edit2,
//   Trash2,
// } from "lucide-react";
// import type { Transaction } from "../../../types/transaction.types";

// interface TransactionRowProps {
//   tx: Transaction;
//   onEdit: (tx: Transaction) => void;
//   onDelete: (id: string) => void;
// }

// const PaymentList: React.FC<TransactionRowProps> = ({
//   tx,
//   onEdit,
//   onDelete,
// }) => {
//   const getMethodIcon = (method: Transaction["method"]) => {
//     switch (method) {
//       case "vnpay":
//         return <CreditCard className="w-4 h-4" />;
//       case "cod":
//         return <Banknote className="w-4 h-4" />;
//       case "momo":
//         return <Building2 className="w-4 h-4" />;
//       default:
//         return null;
//     }
//   };

//   const getStatusColor = (status: Transaction["status"]) => {
//     switch (status) {
//       case "SUCCESS":
//         return "bg-green-50 text-green-600 border-green-200";
//       case "PENDING":
//         return "bg-yellow-50 text-yellow-600 border-yellow-200";
//       case "FAILED":
//         return "bg-red-50 text-red-600 border-red-200";
//       case "EXPIRED":
//         return "bg-gray-100 text-gray-500 border-gray-200";
//       default:
//         return "";
//     }
//   };

//   const renderStatus = (status: Transaction["status"]) => {
//     switch (status) {
//       case "SUCCESS":
//         return (
//           <>
//             <CheckCircle2 className="w-3.5 h-3.5" />
//             Thành công
//           </>
//         );
//       case "PENDING":
//         return (
//           <>
//             <Clock className="w-3.5 h-3.5" />
//             Đang xử lý
//           </>
//         );
//       case "FAILED":
//         return (
//           <>
//             <XCircle className="w-3.5 h-3.5" />
//             Thất bại
//           </>
//         );
//       case "EXPIRED":
//         return (
//           <>
//             <XCircle className="w-3.5 h-3.5" />
//             Hết hạn
//           </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <tr className="hover:bg-slate-50 transition-colors group">
//       <td className="px-6 py-4">
//         <span className="font-bold text-slate-800">
//           TXN-{tx.id.toUpperCase()}
//         </span>
//       </td>

//       <td className="px-6 py-4">
//         <span className="text-emerald-600 font-medium">
//           {tx.bookingId.toUpperCase()}
//         </span>
//       </td>

//       <td className="px-6 py-4">
//         <div className="flex items-center gap-2 text-slate-600">
//           {getMethodIcon(tx.method)}
//           <span className="text-sm">{tx.method}</span>
//         </div>
//       </td>

//       <td className="px-6 py-4">
//         <span className="text-sm text-slate-500">{tx.date}</span>
//       </td>

//       <td className="px-6 py-4">
//         <span className="font-bold text-slate-800">
//           {tx.amount.toLocaleString()}đ
//         </span>
//       </td>

//       <td className="px-6 py-4">
//         <span
//           className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(
//             tx.status,
//           )}`}
//         >
//           {renderStatus(tx.status)}
//         </span>
//       </td>

//       <td className="px-6 py-4 text-right">
//         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//           <button
//             onClick={() => onEdit(tx)}
//             className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
//           >
//             <Edit2 className="w-4 h-4" />
//           </button>

//           <button
//             onClick={() => onDelete(tx.id)}
//             className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//       </td>
//     </tr>
//   );
// };

// export default PaymentList;
