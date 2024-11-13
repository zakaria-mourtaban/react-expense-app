import "../styles/style.css"
const Tracker = () => {
	return(
		<div className="body1">
		<div className="container1">
			<div className="incomecontainer1">
				<h1>Income</h1>
			</div>
			<div className="expensecontainer1">
				<h1>Expense</h1>
			</div>
		</div>
		<div>
			<div className="transactioncreator1">
				<h1>Create transaction</h1>
				<input type="text" placeholder="name" id="nameinput" />
				<input type="number" placeholder="amount" id="amountinput" />
				<input type="date" placeholder="date" id="dateinput" />
				<select name="type" id="typeinput">
					<option value="income">income</option>
					<option value="expense">expense</option>
				</select>
				<button id="createbutton">Add</button>
			</div>
			<div className="information1">
				<div className="budget1">
				<h2>999</h2>
				</div>
				<div className="filtering1">
					<h2>Filter Transactions</h2>
					<label for="minAmount">Min Amount:</label>
					<input
						type="number"
						id="minAmount"
						placeholder="Min Amount"
					/>

					<label for="maxAmount">Max Amount:</label>
					<input
						type="number"
						id="maxAmount"
						placeholder="Max Amount"
					/>
					<button id="filteramountsbtn">Filter</button>

					<label for="dateFilter">Date:</label>
					<input type="date" id="dateFilter" />
					<button id="filterdatesbtn">Filter</button>

					<label for="notesFilter">Notes:</label>
					<input type="text" id="notesFilter" placeholder="Notes" />

					<button id="filternotesbtn">Filter</button>
					<button id="resetbtn">Reset</button>
				</div>
			</div>
		</div>
		</div>
	)
}

export default Tracker;