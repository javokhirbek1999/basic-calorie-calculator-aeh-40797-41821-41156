from django.urls import path

from api.views import calorie_views


app_name = 'calirie'


urlpatterns = [
    path('products/', calorie_views.ProductListView.as_view(), name='all-products'),
    path('products/<str:product_name>/', calorie_views.ProductDetailView.as_view(), name='product-detail'),
    path('intakes/', calorie_views.IntakeListView.as_view(), name='all-intakes'),
    path('intakes/<int:id>/', calorie_views.IntakeDetailView.as_view(), name='intake-detail'),
    path('intakes/<str:user_email>/', calorie_views.IntakeUserListView.as_view(), name='user-intake-list')
]