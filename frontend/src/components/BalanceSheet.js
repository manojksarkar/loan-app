import React from "react";

const BalanceSheet = ({ balanceSheet }) => {
  return (
    <div>
      <h2>Balance Sheet</h2>
      <ul>
        {balanceSheet?.map((entry, index) => (
          <li key={index}>
            Year: {entry.year}, Month: {entry.month}, Profit/Loss:{" "}
            {entry.profitOrLoss}, Assets: {entry.assetsValue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BalanceSheet;
