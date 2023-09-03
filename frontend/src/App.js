import React, { useEffect, useState } from "react";
import "./App.css";
import AccountingProviderDropdown from "./components/AccountingProviderDropdown";
import ApplicationForm from "./components/ApplicationForm";
import BalanceSheet from "./components/BalanceSheet";
import BusinessDetailsForm from "./components/BusinessDetailsForm";

function App() {
  const [step, setStep] = useState(1);
  const [businessDetails, setBusinessDetails] = useState({
    panNumber: "",
    name: "",
    yearEstablished: "",
    loanAmount: "",
  });
  const [accountProvider, setAccountProvider] = useState("");
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [preAssessment, setPreAssessment] = useState(20);
  const [accountingProviders, setAccountingProviders] = useState([]);

  useEffect(() => {
    initiateApplication();
  }, []);

  const handleProviderSelect = (provider) => {
    setAccountProvider(provider);
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const initiateApplication = async () => {
    try {
      const response = await fetch("/api/balance_sheet/providers");
      const data = await response.json();
      if (response.status === 200) {
        setAccountingProviders(data.accounting_providers);
      }
    } catch (error) {
      console.error("Error fetching accounting providers:", error);
    }
  };

  const fetchBalanceSheet = async () => {
    try {
      const response = await fetch("/api/balance_sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          panNumber: businessDetails.panNumber,
          accountProvider,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setBalanceSheet(data.balance_sheet);
        handleNextStep();
      }
    } catch (error) {
      console.error("Error fetching balance sheet:", error);
    }
  };

  const requestOutcome = async () => {
    try {
      const response = await fetch("/api/loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessDetails,
          accountProvider,
          balanceSheet,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setPreAssessment(data.pre_assessment);
        handleNextStep();
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="App">
      {step === 1 && (
        <>
          <BusinessDetailsForm
            businessDetails={businessDetails}
            setBusinessDetails={setBusinessDetails}
          />
          <AccountingProviderDropdown
            selectProvider={handleProviderSelect}
            accountingProviders={accountingProviders}
          />
          <button onClick={fetchBalanceSheet}>Submit</button>
        </>
      )}
      {step === 2 && (
        <>
          <BalanceSheet balanceSheet={balanceSheet} />
          <ApplicationForm preAssessment={preAssessment} />

          <button onClick={requestOutcome}>Submit</button>
        </>
      )}
      {step === 3 && (
        <div>
          <h2>Application Result</h2>
          <p>preAssessment value: {preAssessment}</p>
        </div>
      )}
    </div>
  );
}

export default App;
