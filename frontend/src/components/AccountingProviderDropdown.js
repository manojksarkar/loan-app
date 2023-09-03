import React, { useState } from "react";

const AccountingProviderDropdown = ({
  selectProvider,
  accountingProviders,
}) => {
  const [selectedProvider, setSelectedProvider] = useState("");

  const handleProviderChange = (event) => {
    const provider = event.target.value;
    setSelectedProvider(provider);
    selectProvider(provider);
  };

  return (
    <div>
      <label>Select Accounting Provider:</label>
      <select value={selectedProvider} onChange={handleProviderChange}>
        <option value="">Not Selected</option>
        {accountingProviders?.map((provider) => (
          <option key={provider} value={provider}>
            {provider}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AccountingProviderDropdown;
