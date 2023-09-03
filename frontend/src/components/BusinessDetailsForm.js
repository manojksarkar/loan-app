import React from "react";

const BusinessDetailsForm = ({ businessDetails, setBusinessDetails }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Pan Number"
        value={businessDetails.panNumber}
        onChange={(e) =>
          setBusinessDetails({ ...businessDetails, panNumber: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Business Name"
        value={businessDetails.name}
        onChange={(e) =>
          setBusinessDetails({ ...businessDetails, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Year Established"
        value={businessDetails.yearEstablished}
        onChange={(e) =>
          setBusinessDetails({
            ...businessDetails,
            yearEstablished: e.target.value,
          })
        }
      />
      <input
        type="text"
        placeholder="Loan Amount"
        value={businessDetails.loanAmount}
        onChange={(e) =>
          setBusinessDetails({ ...businessDetails, loanAmount: e.target.value })
        }
      />
    </>
  );
};

export default BusinessDetailsForm;
