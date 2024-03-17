import React, { useEffect } from "react";
import { useTasks } from "../../features/hooks/useTasks";
import { useAuthState } from "../../features/hooks/useAuth";
import { toast } from "react-toastify";
import { useLoading } from "../../features/hooks/useLoading";
import ApiService from "../../services/ApiService";



function AllTasks() {
  const { fetchTasks, loading, tasks } = useTasks();
const {user} = useAuthState();
const {setLoading} = useLoading();
const api = new ApiService();

  useEffect(() => {
    if (!tasks.length) {
      fetchTasks();
    }
  }, [fetchTasks, tasks]);


  const PayWithPaystack = (task) => {
    setLoading(true);
    const email = user.email;

    const paymentHandler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: task.price * 100,
      currency: "NGN",
      onClose: function () {
        toast.warning("PAYMENT POPUP CLOSED")
        setLoading(false);
      },
      callback: (response) => {

        const paymentRunner = async () => {

          if (response.status === "success") {

            try {
             const myOrderData = {
               order: {
                 task_id: task._id,
                 price: task.price,
                 status: "pending",
                 quantity: 1,
               },
               transaction: {
                 status: "pending",
                 price: task.price,
                 reference: response.reference,
               },
             }
 
             await api.postWithToken('/order', myOrderData)
             toast.success("PAYMENT successful");
            } catch (error) {
             toast.error(error.message)
            }
 
             
           } else {
             toast.error("PAYMENT FAILED");
           }

        }

        paymentRunner();
        
      }
    });
    paymentHandler.openIframe();
  };

  return (
    <div className="w-full grid mt-8 px-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
      {loading
        ? "Loading..."
        : tasks.map((singleTask) => (
            <div
              key={singleTask._id}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {singleTask.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {singleTask.description}
              </p>
              <button
                type="button"
                onClick={()=> PayWithPaystack(singleTask)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {`Buy for $${singleTask.price}`}
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          ))}
    </div>
  );
}

export default AllTasks;
