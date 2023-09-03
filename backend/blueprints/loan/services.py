def calculate_pre_assessment(business_details, balance_sheet):
    profit_in_last_12_months = any(entry['profitOrLoss'] > 0 for entry in balance_sheet[-12:])
    
    average_assets = sum(entry['assetsValue'] for entry in balance_sheet) / len(balance_sheet)
    loan_amount = business_details['loanAmount'] 
    
    if profit_in_last_12_months:
        pre_assessment = 60
    elif average_assets > loan_amount:
        pre_assessment = 100
    else:
        pre_assessment = 20

    return pre_assessment