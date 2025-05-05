import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Maximize2,
  Minus,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { GetUserDetails, TransactionDbSchema } from "../utils/DbSchema";
import axios from "axios";
import { AuthHeaders, BaseURL, Transaction } from "../utils/DBLinks";
import { Drawer } from "../Modal";
import Getsuggestions from "./Getsuggestions";
import DownloadTrasactionTamplate from "./DownloadTrasactionTamplate";

export default function Transactions() {
  const [transactionList, setTransactionList] = useState<TransactionDbSchema[]>(
    []
  );

  transactionList.reverse();

  useEffect(() => {
    axios
      .get(
        `${BaseURL}${Transaction.GetByUserId}${GetUserDetails().user_id}`,
        AuthHeaders
      )
      .then((data) => setTransactionList(data.data));
  }, []);

  const [isTableCollapsed, setIsTableCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-20 mx-auto w-[80%] lg:w-[95%] bg-primary rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(90,90,90,1)] hover:shadow-[8px_8px_0px_0px_rgba(90,90,90,1)] transition-all"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-Heading text-text">
            Transaction List
          </h2>
          <button
            onClick={() => setIsTableCollapsed(!isTableCollapsed)}
            className="text-gray-500 hover:text-gray-700 bg-white border-2 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
          >
            {isTableCollapsed ? (
              <Maximize2 size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
        </div>

        <AnimatePresence>
          {!isTableCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-scroll"
            >
              <div className="overflow-x-auto">
                {/* Mobile View */}
                <div className="md:hidden space-y-4">
                  {transactionList.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-secondary border-2 border-black rounded-lg p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-bold text-text">
                          {item.sourceCategory}
                        </div>
                        <div className="">₹ {item.amount}</div>
                        <div className="">{item.transactionType}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                  <table className="min-w-full border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <thead className="bg-secondary border-b-2 border-black">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-black text-text/70 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-black text-text/70 uppercase tracking-wider">
                          Source
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-black text-text/70 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-black text-text/70 uppercase tracking-wider">
                          TransactionType
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-black text-text/70 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y-2 divide-black">
                      {transactionList.map((item, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">
                            {item.transactionId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.sourceCategory}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹ {item.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.financeType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.transactionType == "add" ? (
                              <ArrowDownRight className="text-green-500 border rounded-full " />
                            ) : item.transactionType == "update" ? (
                              <Minus className="text-yellow-500 border rounded-full " />
                            ) : (
                              <ArrowUpRight className="text-red-500 border rounded-full " />
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <DownloadTrasactionTamplate />
        <Drawer
          Buttonname="Get Personalised AI suggestion"
          Elementtoshow={Getsuggestions}
        />
      </div>
    </motion.div>
  );
}
