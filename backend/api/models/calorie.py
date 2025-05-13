from django.db import models
from django.contrib.auth import get_user_model


class Product(models.Model):

    """ Product with all of details about the product. """

    UNIT_CHOICES = (
        ('gr','gr'),
        ('unit','unit')
    )


    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=250, blank=False, null=False)
    unit = models.CharField(max_length=100, choices=UNIT_CHOICES, default='gr', blank=False, null=False)
    kcal_per_unit = models.IntegerField(blank=False, null=False)

    @property
    def user_details(self):
        return {
            'id': self.user.id,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'email': self.user_email,
        }

    def __str__(self):
        return f'{self.name} | {self.kcal_per_unit} kcal/{self.unit}'

class Intake(models.Model):
    
    """ Intake database model."""

    product = models.ForeignKey('api.Product', on_delete=models.PROTECT, blank=False, null=False)
    amount = models.IntegerField(blank=False, null=False)
    date_taken = models.DateTimeField(auto_now_add=True)


    @property
    def product_details(self):
        return {
            'user': {
                'id': self.product.user.id,
                'first_name': self.product.user.first_name,
                'last_name': self.product.user.last_name,
                'email': self.product.user.email,
            },
            'name': self.product.name,
            'unit': self.product.unit,
            'kcal_per_unit': self.product.kcal_per_unit
        }

    @property
    def total_kcal_taken(self):
        return self.amount * self.product.kcal_per_unit