import BudgetingTool from "./components/BudgetingTool";
import Chart from "./components/Chart";
import Download from "./components/Download";
import ExpenseTrack from "./components/ExpenseTrack";
import Home from "./components/Home";
import IncomeManagement from "./components/IncomeManagment";
import SavingGoal from "./components/SavingGoal";
import UserFriendly from "./components/UserFriendly";

export default function App() {
  return (
    <>
      <Home />
      <Chart />
      <ExpenseTrack />
      <IncomeManagement />
      <BudgetingTool />
      <SavingGoal />
      <UserFriendly />
      <Download />
    </>
  );
}
