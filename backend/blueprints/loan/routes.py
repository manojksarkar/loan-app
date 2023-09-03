from flask import Blueprint, request, jsonify
from .services import calculate_pre_assessment

loan_bp = Blueprint('loan', __name__)

@loan_bp.route('/', methods=['POST'])
def submit_application():
    data = request.get_json()

    # Calculate pre-assessment based on rules
    pre_assessment = calculate_pre_assessment(data['businessDetails'], data['balanceSheet'])

    return jsonify({
      'business_details': {},
      'pre_assessment': pre_assessment
    })