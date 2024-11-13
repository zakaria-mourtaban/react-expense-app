import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css";
import TransactionDiv from "./transactiondiv";

const Tracker = () => {
    const [transactions, setTransactions] = useState([]);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [type, setType] = useState("income");
    const [minAmount, setMinAmount] = useState("");
    const [maxAmount, setMaxAmount] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [notesFilter, setNotesFilter] = useState("");
    const [budget, setBudget] = useState(0);
    const userId = 1;

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = () => {
        axios.post(
            "http://localhost/react-expense-tracker/server/gettransactions.php",
            new URLSearchParams({ id: userId }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
		).then((res) => {
			if (!res){
				res = {}}
				const loadedTransactions = Array.isArray(res.data)
				? res.data.map((item) => ({
					  title: item.title,
					  amount: parseFloat(item.amount),
					  earned: item.earned,
					  time: new Date(item.date),
					  index: item.transaction_id,
				  }))
				: []; 
            setTransactions(loadedTransactions);
            updateBudget(loadedTransactions);
        });
    };

    const addTransaction = () => {
        const newTransaction = {
            title: name,
            amount: parseFloat(amount),
            earned: type === "income" ? 1 : 0,
            time: date,
        };

        axios.post(
            "http://localhost/react-expense-tracker/server/createtransaction.php",
            new URLSearchParams({
                id: userId,
                title: newTransaction.title,
                amount: newTransaction.amount,
                date: newTransaction.time,
                earned: newTransaction.earned,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        ).then(() => {
            loadTransactions();
            resetInputs();
        });
    };

    const removeTransaction = (index) => {
        axios.post(
            "http://localhost/react-expense-tracker/server/deletetransaction.php",
            new URLSearchParams({ transaction_id: index }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        ).then(() => {
            loadTransactions();
        });
    };

    const updateBudget = (transactions) => {
        const total = transactions.reduce((acc, t) => acc + (t.earned ? t.amount : -t.amount), 0);
        setBudget(total);
    };

    const resetInputs = () => {
        setName("");
        setAmount("");
        setDate(new Date().toISOString().substring(0, 10));
    };

    const handleFilter = () => {
        let filteredTransactions = transactions;

        if (minAmount) filteredTransactions = filteredTransactions.filter((t) => t.amount >= minAmount);
        if (maxAmount) filteredTransactions = filteredTransactions.filter((t) => t.amount <= maxAmount);
        if (filterDate) filteredTransactions = filteredTransactions.filter((t) => new Date(t.time).toDateString() === new Date(filterDate).toDateString());
        if (notesFilter) filteredTransactions = filteredTransactions.filter((t) => t.title.includes(notesFilter));

        setTransactions(filteredTransactions);
        updateBudget(filteredTransactions);
    };

    const resetFilters = () => {
        setMinAmount("");
        setMaxAmount("");
        setFilterDate("");
        setNotesFilter("");
        loadTransactions();
    };

    return (
        <div className="body1">
            <div className="container1">
                <div className="incomecontainer1">
                    <h1>Income</h1>
                    {transactions
                        .filter((t) => t.earned === 1)
                        .map((t) => (
                            <TransactionDiv
                                key={t.index}
                                transaction={t}
                                onDelete={() => removeTransaction(t.index)}
                            />
                        ))}
                </div>
                <div className="expensecontainer1">
                    <h1>Expense</h1>
                    {transactions
                        .filter((t) => t.earned === 0)
                        .map((t) => (
                            <TransactionDiv
                                key={t.index}
                                transaction={t}
                                onDelete={() => removeTransaction(t.index)}
                            />
                        ))}
                </div>
            </div>
            <div>
                <div className="transactioncreator1">
                    <h1>Create Transaction</h1>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <button onClick={addTransaction}>Add</button>
                </div>
                <div className="information1">
                    <div className="budget1">
                        <h2>Budget: {budget}</h2>
                    </div>
                    <div className="filtering1">
                        <h2>Filter Transactions</h2>
                        <label htmlFor="minAmount">Min Amount:</label>
                        <input type="number" id="minAmount" placeholder="Min Amount" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} />
                        <label htmlFor="maxAmount">Max Amount:</label>
                        <input type="number" id="maxAmount" placeholder="Max Amount" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} />
                        <button onClick={handleFilter}>Filter</button>
                        <label htmlFor="dateFilter">Date:</label>
                        <input type="date" id="dateFilter" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
                        <label htmlFor="notesFilter">Notes:</label>
                        <input type="text" id="notesFilter" placeholder="Notes" value={notesFilter} onChange={(e) => setNotesFilter(e.target.value)} />
                        <button onClick={resetFilters}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracker;
