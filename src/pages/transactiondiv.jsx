import React from "react";

const TransactionDiv = ({ transaction, onDelete }) => {
    const { title, amount, time } = transaction;
    return (
        <div className="transaction">
            <div>{title}</div>
            <div>{amount}</div>
            <div>{new Date(time).toLocaleDateString()}</div>
            <button onClick={onDelete}>🗑️</button>
        </div>
    );
};

export default TransactionDiv;
