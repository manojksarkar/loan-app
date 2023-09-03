from flask import Blueprint, request, jsonify

balance_sheet_bp = Blueprint('balance_sheet', __name__)

xero_balance_sheets = {
  "PAN00001": [
    {
        "year": 2020,
        "month": 12,
        "profitOrLoss": 250000,
        "assetsValue": 1234
    },
    {
        "year": 2020,
        "month": 11,
        "profitOrLoss": 1150,
        "assetsValue": 5789
    },
    {
        "year": 2020,
        "month": 10,
        "profitOrLoss": 2500,
        "assetsValue": 22345
    },
    {
        "year": 2020,
        "month": 9,
        "profitOrLoss": -187000,
        "assetsValue": 223452
    }
],
  "PAN00002": [
    {
        "year": 2020,
        "month": 12,
        "profitOrLoss": 250000,
        "assetsValue": 1234
    },
    {
        "year": 2020,
        "month": 11,
        "profitOrLoss": 1150,
        "assetsValue": 5789
    },
    {
        "year": 2020,
        "month": 10,
        "profitOrLoss": 2500,
        "assetsValue": 22345
    },
    {
        "year": 2020,
        "month": 9,
        "profitOrLoss": -187000,
        "assetsValue": 223452
    }
]
}

myob_balance_sheets = {
  "PAN00001":[
    {
        "year": 2020,
        "month": 12,
        "profitOrLoss": 250000,
        "assetsValue": 1234
    },
    {
        "year": 2020,
        "month": 11,
        "profitOrLoss": 1150,
        "assetsValue": 5789
    },
    {
        "year": 2020,
        "month": 10,
        "profitOrLoss": 2500,
        "assetsValue": 22345
    },
],
    "PAN00002":[
    {
        "year": 2020,
        "month": 12,
        "profitOrLoss": 250000,
        "assetsValue": 1234
    },
    {
        "year": 2020,
        "month": 11,
        "profitOrLoss": 1150,
        "assetsValue": 5789
    },
    {
        "year": 2020,
        "month": 10,
        "profitOrLoss": 2500,
        "assetsValue": 22345
    },
]
}

accounting_providers = ["Xero","MYOB"]

@balance_sheet_bp.route('/providers', methods=['GET'])
def initiate():
    return jsonify({'accounting_providers': accounting_providers})

@balance_sheet_bp.route('/', methods=['POST'])
def fetch_balance_sheet():
    data = request.get_json()

    accounting_provider = data["accountProvider"]
    pan_number = data["panNumber"]

    if accounting_provider in accounting_providers:
      balance_sheets = {}
      if accounting_provider == "Xero":
        balance_sheets =  xero_balance_sheets
      if accounting_provider == "MYOB":
        balance_sheets = myob_balance_sheets
      if pan_number in balance_sheets:
        return jsonify({'balance_sheet': balance_sheets[pan_number]})
      response = jsonify({'message': 'Unknown Pan Number'})
      response.status_code = 404
      return response
    response = jsonify({'message': "Unknown Account Provider"})      
    response.status_code = 400
    return response
