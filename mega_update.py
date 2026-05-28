#!/usr/bin/env python3
"""
Mega-script: crea pubblicazioni.html, aggiorna tutti i nav con Pubblicazioni,
aggiunge data-i18n a tutte le pagine, aggiorna i18n.js con traduzione slovena completa.
"""
import re, os, glob

BASE = "/Users/jacopofioretti/Documents/GitHub/Oltreilconfine"

# ══════════════════════════════════════════════════════════════════
# 1. NAV BLOCK aggiornato con Pubblicazioni nel dropdown Oltre il confine
# ══════════════════════════════════════════════════════════════════

def make_nav(logo_href):
    return f"""\
<nav class="nav" role="navigation" aria-label="Menu principale">
  <a href="{logo_href}" class="nav-logo" aria-label="Torna alla homepage">
    <span class="nav-logo-main">Oltreconfine</span>
    <span class="nav-logo-sub">Ungaretti · 1914–1919</span>
  </a>
  <ul class="nav-links" role="list">
    <li><a href="index.html#about" data-i18n="nav.progetto">Il Progetto</a></li>
    <li><a href="galleria.html" data-i18n="nav.galleria">Galleria</a></li>
    <li><a href="drammaturgia.html" data-i18n="nav.drammaturgia">Drammaturgia</a></li>
    <li><a href="sezione-documenti.html" data-i18n="nav.documenti">Documenti</a></li>
    <li class="nav-dropdown">
      <a href="#" class="nav-dropdown-toggle" data-i18n="nav.promozione">Promozione <span class="nav-dropdown-arrow">▼</span></a>
      <ul class="nav-dropdown-menu">
        <li><a href="index.html#locandine" data-i18n="nav.locandine">Locandine</a></li>
        <li><a href="rassegna-stampa.html" data-i18n="nav.rassegna">Rassegna Stampa</a></li>
      </ul>
    </li>
    <li class="nav-dropdown">
      <a href="oltreilconfine-1918-2018.html" class="nav-dropdown-toggle" data-i18n="nav.oltreconfine">Oltre il confine <span class="nav-dropdown-arrow">▼</span></a>
      <ul class="nav-dropdown-menu">
        <li><a href="oltreilconfine-1918-2018.html" data-i18n="nav.1918">Oltre il confine 1918/2018</a></li>
        <li><a href="memoria.html" data-i18n="nav.memoria">Memoria</a></li>
        <li><a href="note-artistiche.html" data-i18n="nav.note">Note Artistiche</a></li>
        <li><a href="programma.html" data-i18n="nav.programma">Programma</a></li>
        <li><a href="approfondimenti.html" data-i18n="nav.approfond">Approfondimenti</a></li>
        <li><a href="pubblicazioni.html" data-i18n="nav.pubblicazioni">Pubblicazioni</a></li>
      </ul>
    </li>
    <li class="nav-lang-item">
      <div class="lang-toggle">
        <button class="lang-btn" data-lang="it" onclick="I18n.setLang('it')">IT</button>
        <span class="lang-sep">|</span>
        <button class="lang-btn" data-lang="sl" onclick="I18n.setLang('sl')">SL</button>
      </div>
    </li>
    <li><a href="index.html#contact" class="nav-cta" data-i18n="nav.contatti">Contatti</a></li>
  </ul>
  <button class="nav-burger" id="nav-burger" aria-label="Apri menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>"""

MOBILE_NAV = """\
<div class="nav-mobile" id="nav-mobile" role="dialog" aria-modal="true" aria-label="Menu mobile">
  <a href="index.html#about" data-i18n="nav.progetto">Il Progetto</a>
  <a href="galleria.html" data-i18n="nav.galleria">Galleria</a>
  <a href="drammaturgia.html" data-i18n="nav.drammaturgia">Drammaturgia</a>
  <a href="sezione-documenti.html" data-i18n="nav.documenti">Documenti</a>
  <div class="nav-mobile-dropdown">
    <a href="#" class="nav-mobile-dropdown-toggle" data-i18n="nav.promozione">Promozione ▼</a>
    <div class="nav-mobile-dropdown-menu">
      <a href="index.html#locandine" data-i18n="nav.locandine">Locandine</a>
      <a href="rassegna-stampa.html" data-i18n="nav.rassegna">Rassegna Stampa</a>
    </div>
  </div>
  <div class="nav-mobile-dropdown">
    <a href="oltreilconfine-1918-2018.html" class="nav-mobile-dropdown-toggle" data-i18n="nav.oltreconfine">Oltre il confine ▼</a>
    <div class="nav-mobile-dropdown-menu">
      <a href="oltreilconfine-1918-2018.html" data-i18n="nav.1918">1918/2018</a>
      <a href="memoria.html" data-i18n="nav.memoria">Memoria</a>
      <a href="note-artistiche.html" data-i18n="nav.note">Note Artistiche</a>
      <a href="programma.html" data-i18n="nav.programma">Programma</a>
      <a href="approfondimenti.html" data-i18n="nav.approfond">Approfondimenti</a>
      <a href="pubblicazioni.html" data-i18n="nav.pubblicazioni">Pubblicazioni</a>
    </div>
  </div>
  <div class="lang-toggle-mobile">
    <button class="lang-btn" data-lang="it" onclick="I18n.setLang('it')">IT</button>
    <span class="lang-sep">|</span>
    <button class="lang-btn" data-lang="sl" onclick="I18n.setLang('sl')">SL</button>
  </div>
  <a href="index.html#contact" data-i18n="nav.contatti">Contatti</a>
</div>"""

NAV_RE    = re.compile(r'<nav class="nav".*?</nav>', re.DOTALL)
MOBILE_RE = re.compile(r'<div class="nav-mobile".*?^</div>', re.DOTALL | re.MULTILINE)

PAGES = {
    "index.html": "#hero",
    "drammaturgia.html": "index.html#hero",
    "rassegna-stampa.html": "index.html#hero",
    "galleria.html": "index.html#hero",
    "approfondimenti.html": "index.html#hero",
    "memoria.html": "index.html#hero",
    "note-artistiche.html": "index.html#hero",
    "oltreilconfine-1918-2018.html": "index.html#hero",
    "programma.html": "index.html#hero",
    "sezione-documenti.html": "index.html#hero",
    "pubblicazioni.html": "index.html#hero",
}

print("=== Step 1: Aggiornamento nav con Pubblicazioni ===")
for page, href in PAGES.items():
    path = os.path.join(BASE, page)
    if not os.path.exists(path):
        print(f"  SKIP (non trovato): {page}")
        continue
    with open(path) as f:
        html = f.read()
    html = NAV_RE.sub(make_nav(href), html, count=1)
    html = MOBILE_RE.sub(MOBILE_NAV, html, count=1)
    with open(path, 'w') as f:
        f.write(html)
    print(f"  OK: {page}")

print("Step 1 completato.\n")
