from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):

    """
    Custom permission to allow only the owner of the product to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        # Read-only permissions are allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to the owner of the product
        return obj.user == request.user
    

class IsIntakeOwnerOrReadOnly(permissions.BasePermission):

    """Custom permission to allow only the owner of the intake instance to edit or delete it."""

    def has_object_permission(self, request, view, obj):
        
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return obj.product.user == request.user