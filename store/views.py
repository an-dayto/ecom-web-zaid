from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib import messages
from decimal import Decimal

from .models import Category, Product, DiscountCode, Order, OrderItem
from .cart import Cart


def home(request):
    featured = Product.objects.filter(featured=True, available=True)[:8]
    categories = Category.objects.all()
    latest = Product.objects.filter(available=True)[:4]
    return render(request, 'store/home.html', {
        'featured_products': featured,
        'categories': categories,
        'latest_products': latest,
    })


def product_list(request, category_slug=None):
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)
    current_category = None
    sort = request.GET.get('sort', '')

    if category_slug:
        current_category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=current_category)

    search = request.GET.get('q', '')
    if search:
        products = products.filter(name__icontains=search)

    if sort == 'price_asc':
        products = products.order_by('price')
    elif sort == 'price_desc':
        products = products.order_by('-price')
    elif sort == 'name':
        products = products.order_by('name')

    return render(request, 'store/product_list.html', {
        'categories': categories,
        'products': products,
        'current_category': current_category,
        'search': search,
        'sort': sort,
    })


def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug, available=True)
    related = Product.objects.filter(category=product.category, available=True).exclude(id=product.id)[:4]
    return render(request, 'store/product_detail.html', {
        'product': product,
        'related_products': related,
    })


@require_POST
def cart_add(request, product_id):
    product = get_object_or_404(Product, id=product_id, available=True)
    cart = Cart(request)
    qty = int(request.POST.get('quantity', 1))
    cart.add(product, quantity=qty)

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({
            'count': len(cart),
            'subtotal': str(cart.subtotal),
            'message': f'{product.name} added to cart',
        })
    messages.success(request, f'{product.name} added to cart!')
    return redirect(request.META.get('HTTP_REFERER', 'store:cart_detail'))


@require_POST
def cart_update(request):
    cart = Cart(request)
    product_id = request.POST.get('product_id')
    quantity = int(request.POST.get('quantity', 1))
    cart.update(product_id, quantity)

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({
            'count': len(cart),
            'subtotal': str(cart.subtotal),
        })
    return redirect('store:cart_detail')


@require_POST
def cart_remove(request, product_id):
    cart = Cart(request)
    cart.remove(product_id)

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({
            'count': len(cart),
            'subtotal': str(cart.subtotal),
        })
    return redirect('store:cart_detail')


def cart_detail(request):
    cart = Cart(request)
    discount_code = request.session.get('discount_code')
    discount_amount = Decimal('0')
    discount_obj = None

    if discount_code:
        try:
            discount_obj = DiscountCode.objects.get(code=discount_code, active=True)
            discount_amount = discount_obj.get_discount(cart.subtotal)
        except DiscountCode.DoesNotExist:
            del request.session['discount_code']

    total = cart.subtotal - discount_amount

    return render(request, 'store/cart.html', {
        'cart_items': list(cart),
        'discount_code': discount_code,
        'discount_amount': discount_amount,
        'total': total,
    })


@require_POST
def apply_discount(request):
    code = request.POST.get('code', '').strip().upper()
    cart = Cart(request)

    try:
        discount = DiscountCode.objects.get(code=code, active=True)
        if discount.usage_limit and discount.times_used >= discount.usage_limit:
            messages.error(request, 'This discount code has expired.')
        elif cart.subtotal < discount.min_order_amount:
            messages.error(request, f'Minimum order amount is ${discount.min_order_amount}.')
        else:
            request.session['discount_code'] = code
            messages.success(request, f'Discount code "{code}" applied!')
    except DiscountCode.DoesNotExist:
        messages.error(request, 'Invalid discount code.')

    return redirect('store:cart_detail')


def checkout(request):
    cart = Cart(request)
    if len(cart) == 0:
        return redirect('store:product_list')

    discount_code = request.session.get('discount_code')
    discount_amount = Decimal('0')
    discount_obj = None

    if discount_code:
        try:
            discount_obj = DiscountCode.objects.get(code=discount_code, active=True)
            discount_amount = discount_obj.get_discount(cart.subtotal)
        except DiscountCode.DoesNotExist:
            pass

    total = cart.subtotal - discount_amount

    if request.method == 'POST':
        order = Order.objects.create(
            first_name=request.POST['first_name'],
            last_name=request.POST['last_name'],
            email=request.POST['email'],
            phone=request.POST.get('phone', ''),
            address=request.POST['address'],
            city=request.POST['city'],
            state=request.POST['state'],
            zip_code=request.POST['zip_code'],
            discount_code=discount_obj,
            discount_amount=discount_amount,
            subtotal=cart.subtotal,
            total=total,
            note=request.POST.get('note', ''),
        )

        for item in cart:
            OrderItem.objects.create(
                order=order,
                product=item['product'],
                price=item['price'],
                quantity=item['quantity'],
            )
            product = item['product']
            product.stock -= item['quantity']
            product.save()

        if discount_obj:
            discount_obj.times_used += 1
            discount_obj.save()

        cart.clear()
        return redirect('store:order_confirmation', order_id=order.id)

    return render(request, 'store/checkout.html', {
        'cart_items': list(cart),
        'discount_amount': discount_amount,
        'total': total,
    })


def order_confirmation(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    return render(request, 'store/order_confirmation.html', {'order': order})
