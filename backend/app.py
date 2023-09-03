from flask import Flask, request, jsonify
from flask_cors import CORS
from blueprints.loan.routes import loan_bp
from blueprints.balance_sheet.routes import balance_sheet_bp


app = Flask(__name__)
CORS(app)

app.register_blueprint(loan_bp, url_prefix='/api/loan')
app.register_blueprint(balance_sheet_bp, url_prefix='/api/balance_sheet')

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)


