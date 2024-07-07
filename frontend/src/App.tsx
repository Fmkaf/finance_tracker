import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashBoard/index";
import Signin from "./pages/auth/Signin";
import { FinancialRecordProvider } from "./contexts/financialRecord";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FinancialRecordProvider><Dashboard /></FinancialRecordProvider>} />
          {/* <Route path="/signIn" element={<Signin />} /> */}
        </Routes>
      </Router>
    </div >
  );
}

export default App;
