import React, { useState } from "react";
import { useFinancialRecords } from "../../contexts/financialRecord";

export default function FinanceForm() {

  const [amount, setAmount] = useState<string>("")
  const [description, setDescription] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");

  const createRecord = useFinancialRecords().createRecord
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const financeDetails = {
      userId: "LoggedInUser",
      date: new Date(),
      description,
      amount,
      details,
      paymentType
    }

    createRecord(financeDetails)
    setDescription("");
    setDetails("");
    setAmount("");
    setPaymentType("")

  }
  return (
    <div className="form-container">
      <h1>ADD EXPENSE</h1>
      <form onSubmit={submitForm}>
        <div className="form-field">
          <label>Description:</label>
          <input className="input" type="text" required placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
        </div>
        <div className="form-field">
          <label>Amount:</label>
          <input className="input" type="number" required placeholder="Amount" value={amount} onChange={(e) => { setAmount(e.target.value) }} />
        </div>
        <div className="form-field">
          <label>Details:</label>
          <input className="input" type="text" required placeholder="Details" value={details} onChange={(e) => { setDetails(e.target.value) }} />
        </div>
        <div className="form-field">
          <label>Payment Type:</label>
          <select required className="input" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} >
            <option value="">Select a Payment Type</option>
            <option value="Card Payment">Card Payment</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
          </select>
        </div>
        <input className="button" type="submit" placeholder="Submit" />
      </form>
    </div>
  )
}
