from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()


class UserModelTests(TestCase):

    def test_create_user_with_valid_data(self):
        user = User.objects.create_user(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            password="password123"
        )
        self.assertEqual(user.first_name, "John")
        self.assertEqual(user.last_name, "Doe")
        self.assertEqual(user.email, "john@example.com")
        self.assertTrue(user.check_password("password123"))
        self.assertTrue(user.is_active)
        self.assertTrue(user.is_staff)

    def test_email_is_required(self):
        with self.assertRaises(ValueError):
            User.objects.create_user(
                first_name="Jane",
                last_name="Smith",
                email=None,
                password="password123"
            )

    def test_email_is_normalized(self):
        user = User.objects.create_user(
            first_name="Emily",
            last_name="Stone",
            email="EmiLY@Example.Com",
            password="testpass"
        )
        self.assertEqual(user.email, "emily@example.com")

    def test_create_superuser(self):
        admin_user = User.objects.create_superuser(
            first_name="Admin",
            last_name="User",
            email="admin@example.com",
            password="adminpass"
        )
        self.assertTrue(admin_user.is_superuser)
        self.assertTrue(admin_user.is_staff)
