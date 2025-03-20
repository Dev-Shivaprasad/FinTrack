export default function BudgetingTool() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-6">
      <div className="grid md:grid-cols-2 items-center max-w-5xl bg-secondary shadow-lg rounded-lg p-10">
        <div>
          <h2 className="text-4xl font-bold font-Heading text-primary">
            Budgeting Tools: <br />
            <span>Set and Achieve Goals</span>
          </h2>
          <p className="mt-4 ">
            Set financial goals and create budgets for different categories.
          </p>
          <p className="mt-2 ">
            Visualize progress towards goals with progress bars.
          </p>
          <div className="mt-6 space-y-4">
            {[
              "Set a Goal",
              "Create a Budget",
              "Track Progress",
              "Achieve!",
            ].map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-primary text-secondary font-bold text-xl w-12 h-12 flex items-center justify-center rounded-lg shadow-md">
                  {index + 1}
                </div>
                <p className="ml-4 text-lg text-text">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6 md:mt-0">
          <img
            src="https://th.bing.com/th/id/OIP.Wya3gF5HL42UJvCchcgTlgHaGL?rs=1&pid=ImgDetMain"
            alt="Budgeting App UI"
            className="w-72 md:w-80 shadow-lg rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

// import { Bar } from "react-chartjs-2";
// import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function BudgetingTool() {
//   const data = {
//     labels: ["Savings", "Food", "Transport", "Entertainment", "Misc"],
//     datasets: [
//       {
//         label: "Budget Progress",
//         data: [40, 60, 80, 30, 70],
//         backgroundColor: ["#34D399", "#60A5FA", "#FBBF24", "#EC4899", "#A78BFA"],
//         borderRadius: 8,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//     },
//     scales: {
//       x: { grid: { display: false } },
//       y: { beginAtZero: true, max: 100 },
//     },
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-900 to-green-900 p-6">
//       <div className="grid md:grid-cols-2 items-center max-w-5xl bg-white shadow-lg rounded-lg p-10">
//         <div>
//           <h2 className="text-4xl font-bold text-gray-800">Budgeting Tools: <br />
//             <span className="text-gray-700">Set and Achieve Goals</span>
//           </h2>
//           <p className="mt-4 text-gray-600">
//             Set financial goals and create budgets for different categories.
//           </p>
//           <p className="mt-2 text-gray-600">
//             Visualize progress towards goals with progress bars.
//           </p>
//           <div className="mt-6 space-y-4">
//             {["Set a Goal", "Create a Budget", "Track Progress", "Achieve!"].map((step, index) => (
//               <div key={index} className="flex items-center">
//                 <div className="bg-green-100 text-green-800 font-bold text-xl w-12 h-12 flex items-center justify-center rounded-lg shadow-md">
//                   {index + 1}
//                 </div>
//                 <p className="ml-4 text-lg text-gray-700">{step}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="flex justify-center mt-6 md:mt-0 w-full">
//           <div className="w-80">
//             <Bar data={data} options={options} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
