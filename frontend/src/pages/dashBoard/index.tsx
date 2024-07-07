import FinanceForm from "./financeForm";
import FinanceList from "./financeList";
import "./finance.css";

export default function Dashborad() {
    return (
        <div className="dashboard-container">
            <FinanceForm />
            <FinanceList />
        </div>
    )
}