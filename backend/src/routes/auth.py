from flask import Blueprint, request, jsonify
import jwt
import datetime
import hashlib
import random
import string

auth_bp = Blueprint('auth', __name__)

# مفتاح سري للتوقيع (في التطبيق الحقيقي يجب أن يكون في متغير بيئة)
SECRET_KEY = 'your-secret-key-here'

# محاكاة قاعدة بيانات المستخدمين
users_db = {
    "admin@smartvoice.ai": {
        "id": "user_001",
        "email": "admin@smartvoice.ai",
        "password": hashlib.sha256("admin123".encode()).hexdigest(),
        "name": "المدير العام",
        "plan": "المؤسسي",
        "created_at": "2024-01-01T00:00:00Z",
        "verified": True
    }
}

def generate_token(user_id, email):
    """توليد JWT token"""
    payload = {
        'user_id': user_id,
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def verify_token(token):
    """التحقق من صحة JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def generate_user_id():
    """توليد معرف مستخدم عشوائي"""
    return 'user_' + ''.join(random.choices(string.ascii_letters + string.digits, k=8))

@auth_bp.route('/register', methods=['POST'])
def register():
    """تسجيل مستخدم جديد"""
    try:
        data = request.get_json()
        email = data.get('email', '').lower().strip()
        password = data.get('password', '')
        name = data.get('name', '')
        
        # التحقق من البيانات
        if not email or not password or not name:
            return jsonify({
                "success": False,
                "error": "جميع الحقول مطلوبة"
            }), 400
        
        if len(password) < 6:
            return jsonify({
                "success": False,
                "error": "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
            }), 400
        
        # التحقق من وجود المستخدم
        if email in users_db:
            return jsonify({
                "success": False,
                "error": "البريد الإلكتروني مستخدم بالفعل"
            }), 400
        
        # إنشاء المستخدم الجديد
        user_id = generate_user_id()
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        users_db[email] = {
            "id": user_id,
            "email": email,
            "password": hashed_password,
            "name": name,
            "plan": "المجاني",
            "created_at": datetime.datetime.utcnow().isoformat() + "Z",
            "verified": False
        }
        
        # توليد token
        token = generate_token(user_id, email)
        
        return jsonify({
            "success": True,
            "message": "تم إنشاء الحساب بنجاح",
            "token": token,
            "user": {
                "id": user_id,
                "email": email,
                "name": name,
                "plan": "المجاني",
                "verified": False
            }
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """تسجيل الدخول"""
    try:
        data = request.get_json()
        email = data.get('email', '').lower().strip()
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({
                "success": False,
                "error": "البريد الإلكتروني وكلمة المرور مطلوبان"
            }), 400
        
        # التحقق من وجود المستخدم
        if email not in users_db:
            return jsonify({
                "success": False,
                "error": "بيانات الدخول غير صحيحة"
            }), 401
        
        user = users_db[email]
        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        
        # التحقق من كلمة المرور
        if user['password'] != hashed_password:
            return jsonify({
                "success": False,
                "error": "بيانات الدخول غير صحيحة"
            }), 401
        
        # توليد token
        token = generate_token(user['id'], email)
        
        return jsonify({
            "success": True,
            "message": "تم تسجيل الدخول بنجاح",
            "token": token,
            "user": {
                "id": user['id'],
                "email": user['email'],
                "name": user['name'],
                "plan": user['plan'],
                "verified": user['verified']
            }
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@auth_bp.route('/profile', methods=['GET'])
def get_profile():
    """الحصول على بيانات المستخدم"""
    try:
        # الحصول على token من header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({
                "success": False,
                "error": "Token مطلوب"
            }), 401
        
        token = auth_header.split(' ')[1]
        payload = verify_token(token)
        
        if not payload:
            return jsonify({
                "success": False,
                "error": "Token غير صالح"
            }), 401
        
        email = payload['email']
        if email not in users_db:
            return jsonify({
                "success": False,
                "error": "المستخدم غير موجود"
            }), 404
        
        user = users_db[email]
        
        return jsonify({
            "success": True,
            "user": {
                "id": user['id'],
                "email": user['email'],
                "name": user['name'],
                "plan": user['plan'],
                "verified": user['verified'],
                "created_at": user['created_at']
            }
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@auth_bp.route('/update-profile', methods=['PUT'])
def update_profile():
    """تحديث بيانات المستخدم"""
    try:
        # التحقق من token
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({
                "success": False,
                "error": "Token مطلوب"
            }), 401
        
        token = auth_header.split(' ')[1]
        payload = verify_token(token)
        
        if not payload:
            return jsonify({
                "success": False,
                "error": "Token غير صالح"
            }), 401
        
        email = payload['email']
        if email not in users_db:
            return jsonify({
                "success": False,
                "error": "المستخدم غير موجود"
            }), 404
        
        data = request.get_json()
        name = data.get('name')
        
        if name:
            users_db[email]['name'] = name
        
        user = users_db[email]
        
        return jsonify({
            "success": True,
            "message": "تم تحديث البيانات بنجاح",
            "user": {
                "id": user['id'],
                "email": user['email'],
                "name": user['name'],
                "plan": user['plan'],
                "verified": user['verified']
            }
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@auth_bp.route('/change-password', methods=['POST'])
def change_password():
    """تغيير كلمة المرور"""
    try:
        # التحقق من token
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({
                "success": False,
                "error": "Token مطلوب"
            }), 401
        
        token = auth_header.split(' ')[1]
        payload = verify_token(token)
        
        if not payload:
            return jsonify({
                "success": False,
                "error": "Token غير صالح"
            }), 401
        
        email = payload['email']
        if email not in users_db:
            return jsonify({
                "success": False,
                "error": "المستخدم غير موجود"
            }), 404
        
        data = request.get_json()
        current_password = data.get('current_password', '')
        new_password = data.get('new_password', '')
        
        if not current_password or not new_password:
            return jsonify({
                "success": False,
                "error": "كلمة المرور الحالية والجديدة مطلوبتان"
            }), 400
        
        if len(new_password) < 6:
            return jsonify({
                "success": False,
                "error": "كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل"
            }), 400
        
        user = users_db[email]
        current_hashed = hashlib.sha256(current_password.encode()).hexdigest()
        
        if user['password'] != current_hashed:
            return jsonify({
                "success": False,
                "error": "كلمة المرور الحالية غير صحيحة"
            }), 400
        
        # تحديث كلمة المرور
        new_hashed = hashlib.sha256(new_password.encode()).hexdigest()
        users_db[email]['password'] = new_hashed
        
        return jsonify({
            "success": True,
            "message": "تم تغيير كلمة المرور بنجاح"
        })
        
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

