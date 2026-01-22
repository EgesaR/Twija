from app.config.dependencies import get_supabase_client

supabase_client = get_supabase_client()

random_email: str = "egesaraymond644@gmail.com"
random_password: str = "3f7jer03"

user = supabase_client.auth.admin.create_user(email=random_email, password=random_password)