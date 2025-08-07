import os
import requests
import json

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

class User:
    def __init__(self, id=None, email=None, password=None, name=None, plan="المجاني", created_at=None, verified=False):
        self.id = id
        self.email = email
        self.password = password
        self.name = name
        self.plan = plan
        self.created_at = created_at
        self.verified = verified

    def to_dict(self):
        return {
            "id": str(self.id) if self.id else None,
            "email": self.email,
            "name": self.name,
            "plan": self.plan,
            "created_at": self.created_at.isoformat() + "Z" if self.created_at else None,
            "verified": self.verified
        }

    @staticmethod
    def fetch_all():
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }
        response = requests.get(f"{SUPABASE_URL}/rest/v1/users", headers=headers)
        response.raise_for_status()
        users_data = response.json()
        return [User(**user_data) for user_data in users_data]

    @staticmethod
    def fetch_by_email(email):
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }
        # Supabase uses 'eq' for equality filter
        response = requests.get(f"{SUPABASE_URL}/rest/v1/users?email=eq.{email}", headers=headers)
        response.raise_for_status()
        users_data = response.json()
        if users_data:
            return User(**users_data[0])
        return None

    @staticmethod
    def fetch_by_id(user_id):
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }
        response = requests.get(f"{SUPABASE_URL}/rest/v1/users?id=eq.{user_id}", headers=headers)
        response.raise_for_status()
        users_data = response.json()
        if users_data:
            return User(**users_data[0])
        return None

    def save(self):
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }
        data = self.to_dict()
        # Remove id if it's None for new user creation
        if not self.id:
            del data["id"]
            response = requests.post(f"{SUPABASE_URL}/rest/v1/users", headers=headers, data=json.dumps(data))
        else:
            response = requests.patch(f"{SUPABASE_URL}/rest/v1/users?id=eq.{self.id}", headers=headers, data=json.dumps(data))
        response.raise_for_status()
        # Update self with returned data from Supabase
        updated_data = response.json()[0]
        self.id = updated_data["id"]
        self.created_at = datetime.datetime.fromisoformat(updated_data["created_at"].replace("Z", "+00:00"))

    def delete(self):
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json"
        }
        response = requests.delete(f"{SUPABASE_URL}/rest/v1/users?id=eq.{self.id}", headers=headers)
        response.raise_for_status()


