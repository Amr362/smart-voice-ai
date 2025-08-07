from flask import Blueprint, jsonify, request
from src.models.user import User # User model now handles Supabase API calls

user_bp = Blueprint("user", __name__)

@user_bp.route("/users", methods=["GET"])
def get_users():
    try:
        users = User.fetch_all()
        return jsonify([user.to_dict() for user in users])
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@user_bp.route("/users", methods=["POST"])
def create_user():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")
        name = data.get("name")

        if not email or not password or not name:
            return jsonify({"error": "Email, password, and name are required"}), 400

        import hashlib
        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        new_user = User(email=email, password=hashed_password, name=name)
        new_user.save()
        return jsonify(new_user.to_dict()), 201

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@user_bp.route("/users/<user_id>", methods=["GET"])
def get_user(user_id):
    try:
        user = User.fetch_by_id(user_id)
        if not user:
            return jsonify({"success": False, "error": "المستخدم غير موجود"}), 404
        return jsonify(user.to_dict())
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@user_bp.route("/users/<user_id>", methods=["PUT"])
def update_user(user_id):
    try:
        user = User.fetch_by_id(user_id)
        if not user:
            return jsonify({"success": False, "error": "المستخدم غير موجود"}), 404

        data = request.json
        user.email = data.get("email", user.email)
        user.name = data.get("name", user.name)
        user.save()
        return jsonify(user.to_dict())
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@user_bp.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        user = User.fetch_by_id(user_id)
        if not user:
            return jsonify({"success": False, "error": "المستخدم غير موجود"}), 404
        user.delete()
        return "", 204
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


