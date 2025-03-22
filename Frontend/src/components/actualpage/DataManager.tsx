import { useEffect, useState } from "react";
import { useForm, Controller, FieldValues, Path } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Maximize2, ChevronDown, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import normaldatetime from "../utils/Normaldatetime";
import { GetUserId } from "../utils/DbSchema";

interface Field {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required?: boolean;
  min?: number;
}

interface DataManagerProps {
  baseURL: string;
  endpoints: {
    get: string;
    post: string;
    put: string;
    delete: string;
  };
  fields: Field[];
  title: string;
  itemTitle: string;
}

const DataManager = <T extends FieldValues>({
  baseURL,
  endpoints,
  fields,
  title,
  itemTitle,
}: DataManagerProps) => {
  const [data, setData] = useState<T[]>([]);
  const [updateState, setUpdateState] = useState<{
    state: boolean;
    id: string | null;
  }>({ state: false, id: null });
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);

  const fetchData = () => {
    axios
      .get(baseURL + endpoints.get + GetUserId())
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<T>();

  const deleteItem = (id: string) => {
    axios
      .delete(baseURL + endpoints.delete + id)
      .then(() => {
        toast.success("Deleted Successfully");
        fetchData();
      })
      .catch((err) => toast.error("Error: " + err));
  };

  const updateItem = (item: T) => {
    reset(item);
    setUpdateState({ state: !updateState.state, id: (item as any).id });
  };

  const onSubmit = (formData: T) => {
    const dateFields = fields.filter((field) => field.type === "date");
    dateFields.forEach((field) => {
      (formData as any)[field.name] = new Date((formData as any)[field.name])
        .toISOString()
        .split("T")[0];
    });

    if (updateState.state) {
      axios
        .put(baseURL + endpoints.put + updateState.id, {
          ...formData,
          userId: GetUserId(),
        })
        .then(() => {
          toast.success("Updated Successfully");
          fetchData();
          reset();
          setUpdateState({ state: !updateState.state, id: null });
        })
        .catch((err) => {
          toast.error("Error: " + err);
          console.log(formData);
        });
    } else {
      axios
        .post(baseURL + endpoints.post, { ...formData, userId: GetUserId() })
        .then(() => {
          toast.success("Added Successfully");
          fetchData();
          reset();
        })
        .catch((err) => {
          toast.error("Error: " + err);
          console.log(formData);
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-primary to-secondary p-4 sm:p-6 md:p-8 space-y-6">
      <Toaster />
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-primary mt-14 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-text font-Heading">
              {title}
            </h1>
            <button
              onClick={() => setIsFormCollapsed(!isFormCollapsed)}
              className="text-gray-500 hover:text-gray-700 bg-white border-2 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
            >
              {isFormCollapsed ? (
                <Maximize2 size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          </div>

          <AnimatePresence>
            {!isFormCollapsed && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-bold text-background mb-1">
                        {field.label}
                      </label>
                      {field.type === "date" ? (
                        <Controller
                          control={control}
                          name={field.name as Path<T>}
                          rules={{ required: field.required }}
                          render={({ field }) => (
                            <DatePicker
                              selected={
                                field.value ? new Date(field.value) : null
                              }
                              onChange={(date) => field.onChange(date)}
                              className="w-full px-3 py-2 bg-gray-100 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:outline-none text-black"
                              dateFormat="MMMM d, yyyy"
                              calendarClassName="!border-black !shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                              popperClassName="!border-black !shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            />
                          )}
                        />
                      ) : (
                        <input
                          {...register(field.name as Path<T>, {
                            required: field.required,
                            min: field.min,
                            valueAsNumber: field.type === "number",
                          })}
                          type={field.type}
                          className="w-full px-3 py-2 bg-secondary border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all focus:outline-none"
                          placeholder={field.placeholder}
                        />
                      )}
                      {errors[field.name as keyof T] && (
                        <p className="mt-1 text-sm text-red-500 font-bold">
                          {errors[field.name as keyof T]?.message &&
                            String(errors[field.name as keyof T]?.message)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      setUpdateState({ state: false, id: null });
                    }}
                    className="px-4 py-2 bg-secondary border-2 border-black rounded-lg font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary border-2 border-black rounded-lg font-bold text-bgbg-secondary shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                  >
                    {updateState.state ? "Update" : "Submit"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mx-auto bg-primary rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-Heading text-text">
              {itemTitle}
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
                    {data.map((item) => (
                      <motion.div
                        key={(item as any).id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-secondary border-2 border-black rounded-lg p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-bold text-text">
                            {(item as any)[fields[0].name]}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateItem(item)}
                              className="p-1 bg-blue-500 text-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => deleteItem((item as any).id)}
                              className="p-1 bg-red-500 text-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {fields.slice(1).map((field) => (
                            <div key={field.name}>
                              <span className="font-bold text-text/50">
                                {field.label}:
                              </span>
                              <span className="ml-2 text-text">
                                {field.type === "date"
                                  ? normaldatetime((item as any)[field.name])
                                  : (item as any)[field.name]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:block">
                    <table className="min-w-full border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <thead className="bg-secondary border-b-2 border-black">
                        <tr>
                          {fields.map((field) => (
                            <th
                              key={field.name}
                              className="px-6 py-3 text-left text-xs font-black text-text/70 uppercase tracking-wider"
                            >
                              {field.label}
                            </th>
                          ))}
                          <th className="px-6 py-3 text-left text-xs font-black text-text/70 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y-2 divide-black">
                        {data.map((item) => (
                          <motion.tr
                            key={(item as any).id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {fields.map((field) => (
                              <td
                                key={field.name}
                                className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
                              >
                                {field.type === "date"
                                  ? normaldatetime((item as any)[field.name])
                                  : (item as any)[field.name]}
                              </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => updateItem(item)}
                                  className="p-1 bg-blue-500 text-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                                >
                                  <Pencil size={16} />
                                </button>
                                <button
                                  onClick={() => deleteItem((item as any).id)}
                                  className="p-1 bg-red-500 text-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
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
        </div>
      </motion.div>
    </div>
  );
};

export default DataManager;
