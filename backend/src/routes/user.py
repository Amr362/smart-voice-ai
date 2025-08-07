from flask import Blueprint, jsonify, request
from src.models.user import User, db

user_bp = Blueprint("user", __name__)

@user_bp.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@user_bp.route("/users", methods=["POST"])
def create_user():
    data = request.json
    # Assuming email, password, and name are provided for user creation
    # This route might be redundant if registration is handled by auth_bp.register
    # For demonstration, creating a user directly here
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")

    if not email or not password or not name:
        return jsonify({"error": "Email, password, and name are required"}), 400

    # Hash password before saving (simplified for example, use a proper hashing library in production)
    import hashlib
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    user = User(email=email, password=hashed_password, name=name)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@user_bp.route("/users/<uuid:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@user_bp.route("/users/<uuid:user_id>", methods=["PUT"])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.json
    user.email = data.get("email", user.email)
    user.name = data.get("name", user.name)
    # Password update should be handled via change-password route for security
    db.session.commit()
    return jsonify(user.to_dict())

@user_bp.route("/users/<uuid:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return "", 204


