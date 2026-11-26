/* nuée: shared site script (menu bar, mobile menu, languages, cart, product cards, ingredient art) */
(() => {
'use strict';

/* ---------- errors: open any page with ?debug to see them on screen ---------- */
const DEBUG = /[?&]debug\b/.test(location.search);
function reportError(e) {
  try { console.error(e); } catch (_) {}
  if (!DEBUG || !document.body) return;
  let box = document.getElementById('nuee-debug');
  if (!box) {
    box = document.createElement('pre'); box.id = 'nuee-debug';
    box.style.cssText = 'position:fixed;left:8px;right:8px;bottom:8px;z-index:99;max-height:40vh;overflow:auto;margin:0;padding:10px 12px;background:#2B1F14;color:#F6EEE2;font:12px/1.4 ui-monospace,monospace;white-space:pre-wrap;border-radius:6px';
    document.body.appendChild(box);
  }
  box.textContent += (e && (e.stack || e.message) || String(e)) + '\n';
}
addEventListener('error', ev => reportError(ev.error || ev.message));
addEventListener('unhandledrejection', ev => reportError(ev.reason));
if (DEBUG) addEventListener('DOMContentLoaded', () => reportError('debug on · ' + navigator.userAgent));

/* ---------- translations (FR is the default) ---------- */
const DICT = {
fr: {
  'title.home': 'nuée · Sérum Éclat', 'title.shop': 'Boutique · nuée', 'title.product': 'Sérum Éclat · nuée',
  'nav.home': 'Accueil', 'nav.products': 'Produits', 'nav.about': 'À propos', 'nav.reviews': 'Avis', 'nav.contact': 'Contact',
  'nav.cart': 'Panier', 'nav.menu': 'Ouvrir le menu', 'nav.close': 'Fermer le menu', 'nav.lang': 'Langue',
  'hero.headline': 'Sérum éclat hydratant', 'hero.shop': 'Boutique',
  'ing.ha.name': 'Acide hyaluronique', 'ing.ha.line': 'Retient l’eau dans la peau',
  'ing.nia.name': 'Niacinamide', 'ing.nia.line': 'Unifie le teint',
  'ing.vc.name': 'Vitamine C', 'ing.vc.line': 'Illumine et protège',
  'ing.sq.name': 'Squalane', 'ing.sq.line': 'Hydratation légère',
  'ing.ve.name': 'Vitamine E', 'ing.ve.line': 'Soin antioxydant',
  'row1.t': 'Hydratation profonde', 'row1.p': 'L’acide hyaluronique retient l’eau pour repulper et lisser la surface de la peau.',
  'row2.t': 'Teint lumineux et uniforme', 'row2.p': 'La niacinamide et la vitamine C aident à atténuer le teint terne et les taches avec le temps.',
  'row3.t': 'Léger comme la brume', 'row3.p': 'Le squalane imite les huiles naturelles de la peau : il pénètre vite, sans effet gras.',
  'cta.tagline': 'NÉE DE LA BRUME,<br>FAITE POUR VOTRE PEAU.', 'cta.discover': 'Découvrir',
  'about.eyebrow': 'À propos', 'about.title': 'Notre histoire',
  'about.p1': '« Nuée » signifie nuage en français. Nous avons imaginé une marque de soin aussi légère qu’une brume du matin : peu de produits, des formules courtes et des actifs bien étudiés.',
  'about.p2': 'Chaque formule associe hydratation et antioxydants, comme l’acide hyaluronique, la niacinamide et les vitamines C et E, des actifs étudiés en dermatologie.',
  'reviews.eyebrow': 'Avis', 'reviews.title': 'Ce qu’elles en disent', 'reviews.note': 'Avis d’exemple pour cette démonstration.',
  'r1.text': 'Léger, il pénètre en quelques secondes et mon teint paraît plus uniforme après quelques semaines.', 'r1.name': 'Camille, Lyon',
  'r2.text': 'Je l’utilise matin et soir sous ma crème. Aucun effet collant.', 'r2.name': 'Olena, Kyiv',
  'r3.text': 'Un flacon superbe et une texture douce. Ma peau reste hydratée toute la journée.', 'r3.name': 'Sophie, Bruxelles',
  'contact.eyebrow': 'Contact', 'contact.title': 'Écrivez-nous', 'contact.intro': 'Une question sur nos soins ? Laissez-nous un message.',
  'contact.name': 'Nom', 'contact.email': 'E-mail', 'contact.message': 'Message', 'contact.send': 'Envoyer',
  'contact.thanks': 'Merci ! Ce formulaire de démonstration n’envoie pas encore de message.',
  'contact.error': 'Veuillez remplir tous les champs avec une adresse e-mail valide.',
  'footer.note': 'nuée est une marque fictive, créée comme projet de portfolio web.', 'footer.top': 'Retour en haut',
  'shop.eyebrow': 'Boutique', 'shop.title': 'Les essentiels nuée', 'shop.intro': 'Six soins aux formules courtes et légères, pour une routine simple.',
  'cart.add': 'Ajouter au panier', 'cart.added': 'Ajouté au panier', 'unit.ml': 'ml',
  'p.serum.name': 'Sérum Éclat', 'p.serum.desc': 'Acide hyaluronique, niacinamide et vitamine C dans un sérum doré et léger.',
  'p.cream.name': 'Crème Nuage', 'p.cream.desc': 'Une crème hydratante douce aux céramides et au squalane.',
  'p.cleanser.name': 'Gel Nettoyant Doux', 'p.cleanser.desc': 'Un gel peu moussant qui retire maquillage et écran solaire sans tiraillement.',
  'p.toner.name': 'Lotion Brume', 'p.toner.desc': 'Une brume tonique fraîche à la glycérine et au panthénol, à vaporiser avant le sérum.',
  'p.eye.name': 'Contour des Yeux', 'p.eye.desc': 'Une crème légère à la caféine et aux peptides pour le contour de l’œil.',
  'p.body.name': 'Lait Corps', 'p.body.desc': 'Un lait corps fondant au beurre de karité et à la glycérine pour une peau douce.',
  'pp.back': 'Retour à la boutique', 'pp.volume': 'Contenance',
  'pp.desc': 'Un sérum léger qui associe l’acide hyaluronique pour l’hydratation, la niacinamide et la vitamine C pour un teint plus uniforme, le squalane et la vitamine E pour le confort. Il pénètre vite et s’utilise matin et soir.',
  'pp.qty': 'Quantité', 'pp.less': 'Diminuer la quantité', 'pp.more': 'Augmenter la quantité',
  'pp.ingredients': 'Ingrédients clés', 'pp.howto': 'Utilisation',
  'pp.step1': 'Nettoyez et séchez la peau.', 'pp.step2': 'Appliquez 3 à 4 gouttes sur le visage et le cou, matin et soir.',
  'pp.step3': 'Terminez par votre crème, puis un SPF 30 ou plus le matin.', 'pp.also': 'Vous aimerez aussi'
},
uk: {
  'title.home': 'nuée · Сироватка «Сяйво»', 'title.shop': 'Магазин · nuée', 'title.product': 'Сироватка «Сяйво» · nuée',
  'nav.home': 'Головна', 'nav.products': 'Продукти', 'nav.about': 'Про нас', 'nav.reviews': 'Відгуки', 'nav.contact': 'Контакти',
  'nav.cart': 'Кошик', 'nav.menu': 'Відкрити меню', 'nav.close': 'Закрити меню', 'nav.lang': 'Мова',
  'hero.headline': 'Зволожувальна сироватка для сяйва', 'hero.shop': 'Магазин',
  'ing.ha.name': 'Гіалуронова кислота', 'ing.ha.line': 'Утримує воду в шкірі',
  'ing.nia.name': 'Ніацинамід', 'ing.nia.line': 'Вирівнює тон шкіри',
  'ing.vc.name': 'Вітамін C', 'ing.vc.line': 'Сяйво та захист',
  'ing.sq.name': 'Сквалан', 'ing.sq.line': 'Невагоме зволоження',
  'ing.ve.name': 'Вітамін E', 'ing.ve.line': 'Антиоксидантний догляд',
  'row1.t': 'Глибоке зволоження', 'row1.p': 'Гіалуронова кислота утримує воду, тож шкіра стає пружною та гладкою.',
  'row2.t': 'Сяйво та рівний тон', 'row2.p': 'Ніацинамід і вітамін C з часом допомагають зменшити тьмяність і пігментні плями.',
  'row3.t': 'Легка, як туман', 'row3.p': 'Сквалан схожий на власні ліпіди шкіри, тому швидко вбирається без жирного блиску.',
  'cta.tagline': 'НАРОДЖЕНА З ТУМАНУ,<br>ДЛЯ ВАШОЇ ШКІРИ.', 'cta.discover': 'Відкрити',
  'about.eyebrow': 'Про нас', 'about.title': 'Наша історія',
  'about.p1': '«Nuée» французькою означає «хмара». Ми уявили бренд догляду, легкий, як ранковий туман: небагато засобів, короткі формули й добре вивчені активні компоненти.',
  'about.p2': 'Кожна формула поєднує зволоження й антиоксиданти: гіалуронову кислоту, ніацинамід, вітаміни C та E. Це інгредієнти, досліджені в дерматології.',
  'reviews.eyebrow': 'Відгуки', 'reviews.title': 'Що кажуть клієнтки', 'reviews.note': 'Приклади відгуків для цієї демонстрації.',
  'r1.text': 'Легка, вбирається за секунди, а за кілька тижнів тон шкіри став рівнішим.', 'r1.name': 'Камій, Ліон',
  'r2.text': 'Наношу вранці й увечері під крем. Зовсім не липне.', 'r2.name': 'Олена, Київ',
  'r3.text': 'Гарний флакон і ніжна текстура. Шкіра зволожена весь день.', 'r3.name': 'Софі, Брюссель',
  'contact.eyebrow': 'Контакти', 'contact.title': 'Напишіть нам', 'contact.intro': 'Маєте запитання щодо догляду? Залиште нам повідомлення.',
  'contact.name': 'Ім’я', 'contact.email': 'Електронна пошта', 'contact.message': 'Повідомлення', 'contact.send': 'Надіслати',
  'contact.thanks': 'Дякуємо! Ця демонстраційна форма поки не надсилає повідомлень.',
  'contact.error': 'Заповніть усі поля та вкажіть правильну адресу пошти.',
  'footer.note': 'nuée — вигаданий бренд, створений як проєкт для вебпортфоліо.', 'footer.top': 'Догори',
  'shop.eyebrow': 'Магазин', 'shop.title': 'Основи nuée', 'shop.intro': 'Шість засобів із короткими легкими формулами для простого догляду.',
  'cart.add': 'Додати в кошик', 'cart.added': 'Додано в кошик', 'unit.ml': 'мл',
  'p.serum.name': 'Сироватка «Сяйво»', 'p.serum.desc': 'Гіалуронова кислота, ніацинамід і вітамін C у легкій золотистій сироватці.',
  'p.cream.name': 'Крем «Хмара»', 'p.cream.desc': 'М’який зволожувальний крем із керамідами та скваланом.',
  'p.cleanser.name': 'М’який гель для вмивання', 'p.cleanser.desc': 'Гель із ніжною піною, що змиває макіяж і SPF без відчуття стягнутості.',
  'p.toner.name': 'Тонік «Серпанок»', 'p.toner.desc': 'Свіжий тонік-спрей із гліцерином і пантенолом, який розпилюють перед сироваткою.',
  'p.eye.name': 'Крем для повік', 'p.eye.desc': 'Легкий крем із кофеїном і пептидами для делікатної зони навколо очей.',
  'p.body.name': 'Лосьйон для тіла', 'p.body.desc': 'Ніжний лосьйон для тіла з олією ши та гліцерином для м’якої шкіри.',
  'pp.back': 'Назад до магазину', 'pp.volume': 'Об’єм',
  'pp.desc': 'Легка сироватка, що поєднує гіалуронову кислоту для зволоження, ніацинамід і вітамін C для рівного тону, сквалан і вітамін E для комфорту шкіри. Швидко вбирається, підходить для ранку й вечора.',
  'pp.qty': 'Кількість', 'pp.less': 'Зменшити кількість', 'pp.more': 'Збільшити кількість',
  'pp.ingredients': 'Ключові інгредієнти', 'pp.howto': 'Як застосовувати',
  'pp.step1': 'Очистіть і висушіть шкіру.', 'pp.step2': 'Нанесіть 3–4 краплі на обличчя й шию вранці та ввечері.',
  'pp.step3': 'Завершіть кремом, а вранці нанесіть SPF 30 або вище.', 'pp.also': 'Вам також може сподобатися'
},
en: {
  'title.home': 'nuée · Radiance Serum', 'title.shop': 'Shop · nuée', 'title.product': 'Radiance Serum · nuée',
  'nav.home': 'Home', 'nav.products': 'Products', 'nav.about': 'About', 'nav.reviews': 'Reviews', 'nav.contact': 'Contact',
  'nav.cart': 'Cart', 'nav.menu': 'Open menu', 'nav.close': 'Close menu', 'nav.lang': 'Language',
  'hero.headline': 'Hydrating radiance serum', 'hero.shop': 'Shop',
  'ing.ha.name': 'Hyaluronic Acid', 'ing.ha.line': 'Holds water in skin',
  'ing.nia.name': 'Niacinamide', 'ing.nia.line': 'Evens skin tone',
  'ing.vc.name': 'Vitamin C', 'ing.vc.line': 'Brightens & protects',
  'ing.sq.name': 'Squalane', 'ing.sq.line': 'Weightless moisture',
  'ing.ve.name': 'Vitamin E', 'ing.ve.line': 'Antioxidant care',
  'row1.t': 'Deep Hydration', 'row1.p': 'Hyaluronic acid binds water to plump and smooth the skin’s surface.',
  'row2.t': 'Brighter, Even Tone', 'row2.p': 'Niacinamide and vitamin C help fade dullness and dark spots over time.',
  'row3.t': 'Light as Mist', 'row3.p': 'Squalane mirrors the skin’s own oils, so it sinks in fast with no greasy feel.',
  'cta.tagline': 'BORN OF THE MIST,<br>MADE FOR YOUR SKIN.', 'cta.discover': 'Discover',
  'about.eyebrow': 'About', 'about.title': 'Our story',
  'about.p1': '“Nuée” is French for cloud. We imagined a skincare brand as light as morning mist: few products, short formulas and well-studied actives.',
  'about.p2': 'Each formula pairs hydration with antioxidants such as hyaluronic acid, niacinamide and vitamins C and E, ingredients studied in dermatology research.',
  'reviews.eyebrow': 'Reviews', 'reviews.title': 'What they say', 'reviews.note': 'Sample reviews for this demo.',
  'r1.text': 'Light, absorbs in seconds, and my skin looks more even after a few weeks.', 'r1.name': 'Camille, Lyon',
  'r2.text': 'I use it morning and evening under my cream. No stickiness at all.', 'r2.name': 'Olena, Kyiv',
  'r3.text': 'A beautiful bottle and a soft texture. My skin feels hydrated all day.', 'r3.name': 'Sophie, Brussels',
  'contact.eyebrow': 'Contact', 'contact.title': 'Write to us', 'contact.intro': 'A question about our skincare? Leave us a message.',
  'contact.name': 'Name', 'contact.email': 'Email', 'contact.message': 'Message', 'contact.send': 'Send',
  'contact.thanks': 'Thank you! This demo form does not send messages yet.',
  'contact.error': 'Please fill in every field with a valid email address.',
  'footer.note': 'nuée is a fictional brand, created as a web design portfolio project.', 'footer.top': 'Back to top',
  'shop.eyebrow': 'Shop', 'shop.title': 'The nuée essentials', 'shop.intro': 'Six products with short, light formulas for a simple routine.',
  'cart.add': 'Add to cart', 'cart.added': 'Added to cart', 'unit.ml': 'ml',
  'p.serum.name': 'Radiance Serum', 'p.serum.desc': 'Hyaluronic acid, niacinamide and vitamin C in a light golden serum.',
  'p.cream.name': 'Cloud Cream', 'p.cream.desc': 'A soft moisturiser with ceramides and squalane.',
  'p.cleanser.name': 'Gentle Cleanser', 'p.cleanser.desc': 'A low-foam gel that removes makeup and sunscreen without tightness.',
  'p.toner.name': 'Mist Toner', 'p.toner.desc': 'A fresh toner mist with glycerin and panthenol to spray on before serum.',
  'p.eye.name': 'Eye Cream', 'p.eye.desc': 'A light cream with caffeine and peptides for the delicate eye area.',
  'p.body.name': 'Body Lotion', 'p.body.desc': 'A melting body lotion with shea butter and glycerin for soft skin.',
  'pp.back': 'Back to shop', 'pp.volume': 'Volume',
  'pp.desc': 'A light serum that pairs hyaluronic acid for hydration, niacinamide and vitamin C for a more even tone, and squalane and vitamin E for comfort. It absorbs fast and suits morning and evening use.',
  'pp.qty': 'Quantity', 'pp.less': 'Decrease quantity', 'pp.more': 'Increase quantity',
  'pp.ingredients': 'Key ingredients', 'pp.howto': 'How to use',
  'pp.step1': 'Cleanse and dry your skin.', 'pp.step2': 'Apply 3–4 drops to face and neck, morning and evening.',
  'pp.step3': 'Finish with moisturiser, and SPF 30 or higher in the morning.', 'pp.also': 'You may also like'
}};

const PRODUCTS = [
  { id: 'serum', price: 48, vol: 30, img: 'assets/products/serum.webp', link: 'product.html' },
  { id: 'cream', price: 42, vol: 50, img: 'assets/products/cream.webp' },
  { id: 'cleanser', price: 26, vol: 150, img: 'assets/products/cleanser.webp' },
  { id: 'toner', price: 28, vol: 200, img: 'assets/products/toner.webp' },
  { id: 'eye', price: 36, vol: 15, img: 'assets/products/eye.webp' },
  { id: 'body', price: 34, vol: 250, img: 'assets/products/body.webp' }
];

const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
const LANGS = ['fr', 'uk', 'en'], LABEL = { fr: 'FR', uk: 'UA', en: 'EN' }, LOCALE = { fr: 'fr-FR', uk: 'uk-UA', en: 'en-IE' };
let lang = store.get('nuee-lang');
if (!LANGS.includes(lang)) lang = 'fr';
const t = k => (DICT[lang][k] ?? DICT.en[k] ?? k);
const price = n => {
  try { return new Intl.NumberFormat(LOCALE[lang], { style: 'currency', currency: 'EUR', currencyDisplay: 'narrowSymbol' }).format(n); }
  catch (e) { return new Intl.NumberFormat(LOCALE[lang], { style: 'currency', currency: 'EUR' }).format(n); }
};

/* ---------- menu bar + full-screen menu ---------- */
const root = document.documentElement;
const LINKS = [['home', 'index.html'], ['products', 'shop.html'], ['about', 'index.html#about'], ['reviews', 'index.html#reviews'], ['contact', 'index.html#contact']];
const page = document.body.dataset.page || 'home';
const langGroup = () => `<div class="lang" role="group" data-i18n-aria="nav.lang">${LANGS.map(l => `<button type="button" data-lang="${l}" lang="${l}">${LABEL[l]}</button>`).join('')}</div>`;
const BAG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M5 8h14l-1.2 12.2H6.2z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>';
const cartLink = `<a class="cart" href="shop.html">${BAG}<span class="cart-label" data-i18n="nav.cart"></span><span class="count" aria-live="polite">0</span></a>`;
const current = k => (page === 'home' && k === 'home') || (page !== 'home' && k === 'products') ? ' aria-current="page"' : '';

const nav = document.getElementById('nav');
nav.innerHTML =
  `<a class="logo" href="index.html" data-nav="home">nuée</a>` +
  `<div class="links">${LINKS.map(([k, h]) => `<a href="${h}" data-nav="${k}"${current(k)} data-i18n="nav.${k}"></a>`).join('')}</div>` +
  `<div class="right">${langGroup()}${cartLink}<button class="burger" type="button" aria-expanded="false" aria-controls="menu" data-i18n-aria="nav.menu">` +
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M3 8.5h18M3 15.5h18"/></svg></button></div>`;

const menu = document.createElement('div');
menu.className = 'menu'; menu.id = 'menu'; menu.setAttribute('role', 'dialog'); menu.setAttribute('aria-modal', 'true');
menu.innerHTML =
  `<div class="menu-top"><a class="logo" href="index.html" data-nav="home">nuée</a>` +
  `<button class="menu-close" type="button" data-i18n-aria="nav.close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button></div>` +
  `<nav class="menu-links">${LINKS.map(([k, h]) => `<a href="${h}" data-nav="${k}" data-i18n="nav.${k}"></a>`).join('')}</nav>` +
  `<div class="menu-foot">${langGroup()}${cartLink}</div>`;
document.body.appendChild(menu);

const burger = nav.querySelector('.burger');
function setMenu(open) {
  menu.classList.toggle('open', open); root.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', String(open));
  if (open) menu.querySelector('.menu-close').focus(); else if (document.activeElement && menu.contains(document.activeElement)) burger.focus();
}
burger.addEventListener('click', () => setMenu(true));
menu.querySelector('.menu-close').addEventListener('click', () => setMenu(false));
addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });
addEventListener('resize', () => { if (innerWidth >= 768 && menu.classList.contains('open')) setMenu(false); });

// Menu links: on the home page they drive the scenes; elsewhere they are normal links.
document.addEventListener('click', e => {
  const a = e.target.closest('[data-nav]');
  if (!a) return;
  const home = window.nueeHome;
  setMenu(false);
  if (home && a.dataset.nav !== 'products' && a.dataset.nav !== 'cart') { e.preventDefault(); home.nav(a.dataset.nav); }
});

/* ---------- toast ---------- */
const toast = document.createElement('div');
toast.className = 'toast'; toast.setAttribute('role', 'status'); toast.setAttribute('aria-live', 'polite');
document.body.appendChild(toast);
let toastTimer;
function showToast(msg) {
  toast.textContent = msg; toast.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ---------- cart ---------- */
function readCart() { try { return JSON.parse(store.get('nuee-cart')) || {}; } catch (e) { return {}; } }
let cart = readCart();
const cartCount = () => Object.values(cart).reduce((a, b) => a + (+b || 0), 0);
function renderCart(bump) {
  document.querySelectorAll('.cart').forEach(c => {
    c.querySelector('.count').textContent = cartCount();
    if (bump) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }
  });
}
function addToCart(id, qty) {
  qty = Math.max(1, Math.min(99, qty | 0 || 1));
  cart[id] = (cart[id] || 0) + qty;
  store.set('nuee-cart', JSON.stringify(cart));
  renderCart(true);
  showToast(`${t('cart.added')} · ${t('p.' + id + '.name')}${qty > 1 ? ' × ' + qty : ''}`);
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-add]');
  if (!b) return;
  const q = b.dataset.qty ? +document.querySelector(b.dataset.qty).value : 1;
  addToCart(b.dataset.add, q);
});
addEventListener('storage', e => { if (e.key === 'nuee-cart') { cart = readCart(); renderCart(); } });

/* ---------- product cards ---------- */
function renderCards(el, ids) {
  el.innerHTML = PRODUCTS.filter(p => !ids || ids.includes(p.id)).map(p => {
    const img = `<img src="${p.img}" alt="" data-i18n-alt="p.${p.id}.name" loading="lazy" width="1000" height="1250">`;
    const name = `<span data-i18n="p.${p.id}.name"></span>`;
    return `<article class="card">` +
      (p.link ? `<a class="card-img" href="${p.link}" tabindex="-1">${img}</a>` : `<div class="card-img">${img}</div>`) +
      `<div class="card-body"><h3>${p.link ? `<a href="${p.link}">${name}</a>` : name}</h3>` +
      `<p data-i18n="p.${p.id}.desc"></p>` +
      `<div class="card-meta"><span class="price" data-price="${p.price}"></span><span class="vol" data-vol="${p.vol}"></span></div>` +
      `<button class="pill" type="button" data-add="${p.id}" data-i18n="cart.add"></button></div></article>`;
  }).join('');
  applyLang();
}

/* ---------- ingredient artwork (drawn SVG macro textures) ---------- */
function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }
const svg = body => `url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>${body}</svg>`)}")`;
const ART = {
  ha() {
    const r = rng(7); let b = '';
    for (let i = 0; i < 16; i++) { const x = r() * 100, y = r() * 100, rr = 2 + r() * 9;
      b += `<circle cx='${x}' cy='${y}' r='${rr}' fill='url(#bub)' stroke='#fff' stroke-opacity='.85' stroke-width='.7'/><circle cx='${x - rr * .35}' cy='${y - rr * .4}' r='${rr * .22}' fill='#fff' opacity='.9'/>`; }
    return `<defs><radialGradient id='g' cx='.4' cy='.35' r='.8'><stop offset='0' stop-color='#f4f8f8'/><stop offset='1' stop-color='#c9d9dc'/></radialGradient><radialGradient id='bub' cx='.5' cy='.5' r='.5'><stop offset='.6' stop-color='#fff' stop-opacity='0'/><stop offset='1' stop-color='#9fb9bf' stop-opacity='.55'/></radialGradient></defs><rect width='100' height='100' fill='url(#g)'/>${b}`;
  },
  nia() {
    const r = rng(11); let b = '';
    for (let i = 0; i < 170; i++) { const x = r() * 100, y = 30 + r() * 75, z = .6 + r() * 2.4, a = r() * 180;
      b += `<rect x='${x}' y='${y}' width='${z}' height='${z * (.6 + r())}' transform='rotate(${a} ${x} ${y})' fill='${r() > .3 ? '#ffffff' : '#d9d2c6'}'/>`; }
    return `<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#efe9df'/><stop offset='1' stop-color='#d8cfc1'/></linearGradient><radialGradient id='m' cx='.5' cy='.85' r='.6'><stop offset='0' stop-color='#fff' stop-opacity='.95'/><stop offset='1' stop-color='#fff' stop-opacity='0'/></radialGradient></defs><rect width='100' height='100' fill='url(#g)'/><ellipse cx='50' cy='88' rx='58' ry='40' fill='url(#m)'/>${b}`;
  },
  vc() {
    let b = '';
    for (let i = 0; i < 10; i++) { const a0 = i * 36 + 3, a1 = i * 36 + 33, R = 38, rad = d => d * Math.PI / 180;
      const p = (a, rr) => `${50 + rr * Math.cos(rad(a))},${50 + rr * Math.sin(rad(a))}`;
      b += `<path d='M${p((a0 + a1) / 2, 6)} L${p(a0, R)} A${R} ${R} 0 0 1 ${p(a1, R)} Z' fill='url(#seg)'/>`; }
    return `<defs><radialGradient id='seg' cx='.5' cy='.5' r='.5'><stop offset='0' stop-color='#ffd37a'/><stop offset='1' stop-color='#f39a2b'/></radialGradient></defs><rect width='100' height='100' fill='#f6c873'/><circle cx='50' cy='50' r='48' fill='#e9842a'/><circle cx='50' cy='50' r='43' fill='#fbf0d6'/>${b}<circle cx='50' cy='50' r='5' fill='#fbf0d6'/>`;
  },
  sq() {
    const r = rng(23); let b = '';
    for (let i = 0; i < 9; i++) { const x = 8 + r() * 84, y = 8 + r() * 84, rr = 4 + r() * 10;
      b += `<circle cx='${x}' cy='${y}' r='${rr}' fill='url(#d)'/><ellipse cx='${x - rr * .3}' cy='${y - rr * .45}' rx='${rr * .4}' ry='${rr * .2}' fill='#fff' opacity='.85'/>`; }
    return `<defs><radialGradient id='g' cx='.35' cy='.3' r='.9'><stop offset='0' stop-color='#f8ebc6'/><stop offset='1' stop-color='#d6ad5e'/></radialGradient><radialGradient id='d' cx='.55' cy='.6' r='.6'><stop offset='0' stop-color='#fff6d8' stop-opacity='.9'/><stop offset='.75' stop-color='#e9c77c' stop-opacity='.6'/><stop offset='1' stop-color='#a77a2a' stop-opacity='.8'/></radialGradient></defs><rect width='100' height='100' fill='url(#g)'/>${b}`;
  },
  ve() {
    const cap = (x, y, a, s) => `<g transform='translate(${x} ${y}) rotate(${a}) scale(${s})'><ellipse rx='22' ry='13' fill='url(#cap)'/><ellipse cx='-6' cy='-6' rx='10' ry='3' fill='#fff' opacity='.75'/></g>`;
    return `<defs><radialGradient id='g' cx='.5' cy='.4' r='.8'><stop offset='0' stop-color='#fbf3e4'/><stop offset='1' stop-color='#e8d7b9'/></radialGradient><radialGradient id='cap' cx='.45' cy='.4' r='.7'><stop offset='0' stop-color='#ffd97a'/><stop offset='.6' stop-color='#e0a334'/><stop offset='1' stop-color='#9a5f12'/></radialGradient></defs><rect width='100' height='100' fill='url(#g)'/><ellipse cx='52' cy='76' rx='40' ry='8' fill='#b98d4e' opacity='.18'/>${cap(36, 40, -28, 1)}${cap(64, 64, 20, 1.05)}`;
  }
};
const artCache = {};
const art = k => (artCache[k] || (artCache[k] = svg(ART[k]())));
function paintArt(scope) { (scope || document).querySelectorAll('[data-art]').forEach(i => { i.style.backgroundImage = art(i.dataset.art); }); }

/* ---------- apply language ---------- */
function each(sel, fn) { document.querySelectorAll(sel).forEach(el => { try { fn(el); } catch (e) { reportError(e); } }); }
function applyLang() {
  try { root.lang = lang; } catch (e) {}
  each('[data-i18n]', el => { el.textContent = t(el.dataset.i18n); });
  each('[data-i18n-html]', el => { el.innerHTML = t(el.dataset.i18nHtml); });
  each('[data-i18n-ph]', el => { el.placeholder = t(el.dataset.i18nPh); });
  each('[data-i18n-aria]', el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  each('[data-i18n-alt]', el => { el.alt = t(el.dataset.i18nAlt); });
  each('[data-price]', el => { el.textContent = price(+el.dataset.price); });
  each('[data-vol]', el => { el.textContent = `${el.dataset.vol} ${t('unit.ml')}`; });
  each('[data-lang]', b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  try { if (root.dataset.title) document.title = t(root.dataset.title); } catch (e) {}
}
function setLang(l) {
  if (!LANGS.includes(l) || l === lang) return;
  lang = l; store.set('nuee-lang', l); applyLang();
  try { document.dispatchEvent(new CustomEvent('nuee:lang', { detail: l })); } catch (e) { reportError(e); }
}
document.addEventListener('click', e => { const b = e.target.closest('[data-lang]'); if (b) setLang(b.dataset.lang); });

// Shrink the bar's bottom line in on content pages once scrolled
if (page !== 'home') {
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
}

window.NUEE = { reportError,  t, price, lang: () => lang, setLang, applyLang, renderCards, paintArt, art, products: PRODUCTS, toast: showToast, closeMenu: () => setMenu(false) };
paintArt();
applyLang();
renderCart();
})();
