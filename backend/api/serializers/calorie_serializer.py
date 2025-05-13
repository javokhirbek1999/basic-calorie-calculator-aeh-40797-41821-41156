from rest_framework import serializers

from api.models.calorie import Product, Intake


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('id', 'user_details', 'name', 'unit', 'kcal_per_unit')
    
    def create(self, validated_data):
        product_name = validated_data['name']

        product_name = product_name.lower()

        validated_data['name'] = product_name

        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class IntakeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Intake
        fields = ('id', 'product', 'product_details', 'amount', 'date_taken','total_kcal_taken')
    
    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)