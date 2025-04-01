import Avatar from "./components/Avatar";
import BudgetingTool from "./components/BudgetingTool";
import Chart from "./components/Chart";
import Download from "./components/Download";
import ExpenseTrack from "./components/ExpenseTrack";
import Home from "./components/Home";
import IncomeManagement from "./components/IncomeManagment";
import SavingGoal from "./components/SavingGoal";
import ThemeToggle from "./components/Theme";
import UserFriendly from "./components/UserFriendly";

export default function App() {
  return (
    <>
      {localStorage.getItem("JwtToken") ? (
        <>
          <ThemeToggle className="absolute top-5 left-16 w-fit z-30 " />
          <Avatar ClassName="absolute top-5 right-16 w-fit z-30" />
        </>
      ) : (
        <ThemeToggle className="absolute top-5 flex items-center justify-center w-full z-30 " />
      )}
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
