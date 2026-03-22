from django.core.management.base import BaseCommand
from store.models import Category, Product, DiscountCode


class Command(BaseCommand):
    help = 'Seed the database with demo products, categories, and discount codes'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database...')

        # Categories
        categories_data = [
            {
                'name': 'Electronics',
                'slug': 'electronics',
                'description': 'Latest gadgets, phones, laptops, and accessories',
                'image_url': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=450&fit=crop',
            },
            {
                'name': 'Clothing',
                'slug': 'clothing',
                'description': 'Trendy fashion for men and women',
                'image_url': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=450&fit=crop',
            },
            {
                'name': 'Home & Living',
                'slug': 'home-living',
                'description': 'Furniture, decor, and home essentials',
                'image_url': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop',
            },
            {
                'name': 'Sports & Outdoors',
                'slug': 'sports-outdoors',
                'description': 'Equipment and gear for active lifestyles',
                'image_url': 'https://images.unsplash.com/photo-1461896836934-bd45ba8b2cda?w=600&h=450&fit=crop',
            },
            {
                'name': 'Books & Media',
                'slug': 'books-media',
                'description': 'Books, music, and entertainment',
                'image_url': 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=450&fit=crop',
            },
        ]

        categories = {}
        for cat_data in categories_data:
            cat, created = Category.objects.update_or_create(
                slug=cat_data['slug'], defaults=cat_data
            )
            categories[cat.slug] = cat
            status = 'Created' if created else 'Updated'
            self.stdout.write(f'  {status} category: {cat.name}')

        # Products
        products_data = [
            # Electronics
            {
                'category': 'electronics', 'name': 'Wireless Noise-Cancelling Headphones',
                'slug': 'wireless-noise-cancelling-headphones',
                'description': 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio. Features Bluetooth 5.2, multipoint connection, and a comfortable memory foam design perfect for travel and daily use.',
                'price': 249.99, 'compare_at_price': 349.99, 'stock': 45, 'featured': True,
                'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
            },
            {
                'category': 'electronics', 'name': 'Smart Watch Pro',
                'slug': 'smart-watch-pro',
                'description': 'Advanced smartwatch with health monitoring, GPS tracking, and always-on AMOLED display. Track your fitness goals, receive notifications, and enjoy 5-day battery life in a sleek titanium design.',
                'price': 399.99, 'compare_at_price': 449.99, 'stock': 30, 'featured': True,
                'image_url': 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=600&fit=crop',
            },
            {
                'category': 'electronics', 'name': 'Portable Bluetooth Speaker',
                'slug': 'portable-bluetooth-speaker',
                'description': 'Waterproof portable speaker with 360-degree sound, deep bass, and 20-hour playtime. IPX7 rated for pool and beach use. Pair two speakers for stereo sound.',
                'price': 79.99, 'compare_at_price': 99.99, 'stock': 100, 'featured': False,
                'image_url': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop',
            },
            {
                'category': 'electronics', 'name': 'USB-C Laptop Docking Station',
                'slug': 'usb-c-laptop-docking-station',
                'description': 'Universal docking station with dual HDMI, USB-C Power Delivery 100W, Ethernet, and 5 USB ports. Transform your laptop into a full desktop setup with a single cable.',
                'price': 149.99, 'stock': 60, 'featured': False,
                'image_url': 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=600&h=600&fit=crop',
            },
            {
                'category': 'electronics', 'name': 'Mechanical Keyboard RGB',
                'slug': 'mechanical-keyboard-rgb',
                'description': 'Hot-swappable mechanical keyboard with per-key RGB lighting, PBT keycaps, and wireless connectivity. Supports Bluetooth, 2.4GHz, and wired modes for versatile use.',
                'price': 129.99, 'compare_at_price': 159.99, 'stock': 75, 'featured': True,
                'image_url': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop',
            },
            # Clothing
            {
                'category': 'clothing', 'name': 'Classic Denim Jacket',
                'slug': 'classic-denim-jacket',
                'description': 'Timeless denim jacket crafted from premium cotton with a comfortable relaxed fit. Features classic button closure, chest pockets, and adjustable waist tabs. Perfect for layering in any season.',
                'price': 89.99, 'compare_at_price': 120.00, 'stock': 50, 'featured': True,
                'image_url': 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=600&fit=crop',
            },
            {
                'category': 'clothing', 'name': 'Merino Wool Sweater',
                'slug': 'merino-wool-sweater',
                'description': 'Luxuriously soft merino wool sweater with a modern slim fit. Naturally temperature-regulating and odor-resistant. Available in multiple colors for effortless everyday style.',
                'price': 74.99, 'stock': 40, 'featured': False,
                'image_url': 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=600&fit=crop',
            },
            {
                'category': 'clothing', 'name': 'Running Sneakers Ultra',
                'slug': 'running-sneakers-ultra',
                'description': 'Lightweight performance running shoes with responsive cushioning and breathable mesh upper. Engineered for comfort on long runs with superior arch support and grip.',
                'price': 134.99, 'compare_at_price': 169.99, 'stock': 85, 'featured': True,
                'image_url': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
            },
            {
                'category': 'clothing', 'name': 'Linen Summer Shirt',
                'slug': 'linen-summer-shirt',
                'description': 'Breathable pure linen shirt perfect for warm weather. Relaxed fit with a mandarin collar and wooden buttons. Gets softer with every wash.',
                'price': 59.99, 'stock': 65, 'featured': False,
                'image_url': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop',
            },
            # Home & Living
            {
                'category': 'home-living', 'name': 'Minimalist Desk Lamp',
                'slug': 'minimalist-desk-lamp',
                'description': 'Sleek LED desk lamp with adjustable color temperature and brightness. Features a wireless charging base, USB port, and a space-saving folding design that fits any workspace.',
                'price': 69.99, 'compare_at_price': 89.99, 'stock': 55, 'featured': True,
                'image_url': 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&h=600&fit=crop',
            },
            {
                'category': 'home-living', 'name': 'Scented Candle Collection',
                'slug': 'scented-candle-collection',
                'description': 'Set of 3 hand-poured soy wax candles in calming scents: Lavender Fields, Vanilla Bean, and Ocean Breeze. Each candle burns for 45+ hours. Packaged in elegant glass jars.',
                'price': 44.99, 'stock': 90, 'featured': False,
                'image_url': 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&h=600&fit=crop',
            },
            {
                'category': 'home-living', 'name': 'Ceramic Plant Pot Set',
                'slug': 'ceramic-plant-pot-set',
                'description': 'Set of 3 modern ceramic pots in varying sizes with bamboo drainage trays. Matte finish in neutral tones that complement any interior decor style.',
                'price': 39.99, 'stock': 70, 'featured': False,
                'image_url': 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop',
            },
            {
                'category': 'home-living', 'name': 'Luxury Throw Blanket',
                'slug': 'luxury-throw-blanket',
                'description': 'Ultra-soft microfiber throw blanket with a chunky knit pattern. Perfect for cozying up on the couch. Machine washable and available in warm earthy tones.',
                'price': 54.99, 'compare_at_price': 79.99, 'stock': 45, 'featured': True,
                'image_url': 'https://images.unsplash.com/photo-1580301762395-21ce6d5d4bc4?w=600&h=600&fit=crop',
            },
            # Sports
            {
                'category': 'sports-outdoors', 'name': 'Yoga Mat Premium',
                'slug': 'yoga-mat-premium',
                'description': 'Extra-thick 6mm yoga mat with non-slip surface and alignment guides. Made from eco-friendly TPE material. Includes carrying strap and cleaning spray.',
                'price': 49.99, 'compare_at_price': 65.00, 'stock': 80, 'featured': False,
                'image_url': 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop',
            },
            {
                'category': 'sports-outdoors', 'name': 'Stainless Steel Water Bottle',
                'slug': 'stainless-steel-water-bottle',
                'description': 'Double-wall vacuum insulated water bottle that keeps drinks cold for 24 hours or hot for 12. BPA-free, leak-proof cap with one-hand operation. 32oz capacity.',
                'price': 34.99, 'stock': 120, 'featured': False,
                'image_url': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop',
            },
            {
                'category': 'sports-outdoors', 'name': 'Trail Running Backpack',
                'slug': 'trail-running-backpack',
                'description': 'Lightweight 15L trail running vest with hydration system compatibility. Features breathable mesh back panel, multiple pockets, and reflective details for low-light visibility.',
                'price': 89.99, 'compare_at_price': 119.99, 'stock': 35, 'featured': True,
                'image_url': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
            },
            # Books
            {
                'category': 'books-media', 'name': 'The Art of Design Thinking',
                'slug': 'the-art-of-design-thinking',
                'description': 'A comprehensive guide to creative problem-solving through design thinking methodology. Packed with real-world case studies, exercises, and frameworks used by top innovation teams.',
                'price': 24.99, 'stock': 150, 'featured': False,
                'image_url': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop',
            },
            {
                'category': 'books-media', 'name': 'Vinyl Record: Jazz Classics',
                'slug': 'vinyl-record-jazz-classics',
                'description': 'Curated collection of timeless jazz recordings on premium 180g vinyl. Features legendary artists and iconic performances. Includes liner notes and original artwork.',
                'price': 29.99, 'stock': 40, 'featured': False,
                'image_url': 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=600&h=600&fit=crop',
            },
            {
                'category': 'books-media', 'name': 'Photography Masterclass Book',
                'slug': 'photography-masterclass-book',
                'description': 'From amateur to pro — learn composition, lighting, and post-processing techniques through 200+ stunning examples. Hardcover edition with premium print quality.',
                'price': 39.99, 'compare_at_price': 54.99, 'stock': 55, 'featured': False,
                'image_url': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop',
            },
        ]

        for prod_data in products_data:
            cat_slug = prod_data.pop('category')
            prod_data['category'] = categories[cat_slug]
            product, created = Product.objects.update_or_create(
                slug=prod_data['slug'], defaults=prod_data
            )
            status = 'Created' if created else 'Updated'
            self.stdout.write(f'  {status} product: {product.name}')

        # Discount codes
        discounts = [
            {'code': 'WELCOME10', 'discount_type': 'percent', 'value': 10, 'min_order_amount': 0, 'active': True},
            {'code': 'SAVE20', 'discount_type': 'percent', 'value': 20, 'min_order_amount': 100, 'active': True},
            {'code': 'FLAT15', 'discount_type': 'fixed', 'value': 15, 'min_order_amount': 75, 'active': True},
            {'code': 'SUMMER25', 'discount_type': 'percent', 'value': 25, 'min_order_amount': 150, 'active': True, 'usage_limit': 50},
        ]

        for disc_data in discounts:
            disc, created = DiscountCode.objects.update_or_create(
                code=disc_data['code'], defaults=disc_data
            )
            status = 'Created' if created else 'Updated'
            self.stdout.write(f'  {status} discount: {disc}')

        self.stdout.write(self.style.SUCCESS(
            f'\nDone! Created {len(categories_data)} categories, {len(products_data)} products, {len(discounts)} discount codes.'
        ))
        self.stdout.write(self.style.SUCCESS('Discount codes: WELCOME10, SAVE20, FLAT15, SUMMER25'))
