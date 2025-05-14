from django.test import TestCase
from django.contrib.auth import get_user_model
from api.models.calorie import Product, Intake

User = get_user_model()


class ProductModelTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            first_name="Cal",
            last_name="Tracker",
            email="cal@example.com",
            password="trackpass"
        )

    def test_create_product(self):
        product = Product.objects.create(
            user=self.user,
            name="Banana",
            unit="unit",
            kcal_per_unit=89
        )
        self.assertEqual(product.name, "Banana")
        self.assertEqual(product.unit, "unit")
        self.assertEqual(product.kcal_per_unit, 89)
        self.assertEqual(product.user.email, "cal@example.com")
        self.assertIn("Banana", str(product))

    def test_user_details_property(self):
        product = Product.objects.create(
            user=self.user,
            name="Orange",
            unit="gr",
            kcal_per_unit=47
        )
        user_details = product.user_details
        self.assertEqual(user_details['email'], "cal@example.com")
        self.assertEqual(user_details['first_name'], "Cal")


class IntakeModelTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            first_name="In",
            last_name="Taker",
            email="intake@example.com",
            password="takepass"
        )
        self.product = Product.objects.create(
            user=self.user,
            name="Rice",
            unit="gr",
            kcal_per_unit=130
        )

    def test_create_intake(self):
        intake = Intake.objects.create(
            product=self.product,
            amount=100
        )
        self.assertEqual(intake.amount, 100)
        self.assertEqual(intake.product.name, "Rice")

    def test_total_kcal_taken_property(self):
        intake = Intake.objects.create(
            product=self.product,
            amount=200
        )
        self.assertEqual(intake.total_kcal_taken, 26000)  # 200 * 130

    def test_product_details_property(self):
        intake = Intake.objects.create(
            product=self.product,
            amount=50
        )
        details = intake.product_details
        self.assertEqual(details['name'], "Rice")
        self.assertEqual(details['kcal_per_unit'], 130)
        self.assertEqual(details['user']['email'], "intake@example.com")
