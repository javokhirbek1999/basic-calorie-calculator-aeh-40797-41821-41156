from django.contrib.auth import get_user_model
from django.http import Http404

from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from api.models.calorie import Product, Intake

from api.permissions import calorie_permissions

from api.serializers.calorie_serializer import ProductSerializer, IntakeSerializer


class ProductListView(generics.ListCreateAPIView):
    
    """
    API view to list products or create a product.
    
    - User can only view their own product.
    - Only authenticated users can create a product.
    """

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Restrict the products that are only added by the current user."""
        return Product.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Automatically assign the user when creating a product."""

        serializer.save(user=self.request.user)
    

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):

    """
    API view to get the specific product and also it can only be edited by the user who added that product
    """

    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated, calorie_permissions.IsOwnerOrReadOnly]

    def get_object(self):
        product_name = self.kwargs['product_name']

        product = Product.objects.filter(name=product_name,user=self.request.user).first()

        if not product:
            return Http404("This product does not exist.")
    
        return product


class IntakeListView(generics.ListCreateAPIView):

    """API view for adding and listing calorie intakes."""

    queryset = Intake.objects.all()
    serializer_class = IntakeSerializer
    permission_classes = [calorie_permissions.IsIntakeOwnerOrReadOnly]


class IntakeDetailView(generics.RetrieveUpdateDestroyAPIView):

    """
    API View to get the specific intake instance and i can only be edited and deleted by the user who created that.
    """

    serializer_class = IntakeSerializer
    permission_classes = [IsAuthenticated, calorie_permissions.IsIntakeOwnerOrReadOnly]

    def get_object(self):
        
        intake_id = self.kwargs['id']

        intake = Intake.objects.filter(id=intake_id).first()

        if not intake:
            return Http404(f'The calorie intake instance with ID: {intake_id} does not exist.')
        
        return intake