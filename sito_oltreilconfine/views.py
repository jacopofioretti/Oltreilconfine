from django.shortcuts import render
from django.conf import settings
import os

def home(request):
    """Homepage view"""
    return render(request, 'index.html', {'show_rassegna_only': False})

def rassegna_stampa(request):
    """Rassegna Stampa page view"""
    return render(request, 'index.html', {'show_rassegna_only': True})

def galleria(request):
    """Galleria page view"""
    gallery_images = []
    gallery2_images = []

    static_root = settings.BASE_DIR / 'sito_oltreilconfine' / 'static'

    # Gallery folder images
    gallery_path = static_root / 'images' / 'gallery'
    if gallery_path.exists():
        gallery_images = [f'images/gallery/{f}' for f in os.listdir(gallery_path)
                         if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))]
        gallery_images.sort()

    # Gallery_2 folder images
    gallery2_path = static_root / 'images' / 'gallery_2'
    if gallery2_path.exists():
        gallery2_images = [f'images/gallery_2/{f}' for f in os.listdir(gallery2_path)
                          if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif'))]
        gallery2_images.sort()

    all_images = gallery_images + gallery2_images
    return render(request, 'galleria.html', {'images': all_images})
