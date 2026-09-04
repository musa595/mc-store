import './styles.css';

const app = document.querySelector('#app');
const packages = [
    { name: 'beginner-rank', kind: 'rank', value: 'beginner-rank', price: 3.70, image: '/assets/beginner-rank.png', description: 'A first step into the SurvivalCraft community.' },
    { name: 'starter rank', kind: 'rank', value: 'starter rank', price: 1.50, image: '/assets/starter-rank.png', description: 'A simple starting rank for new survivors.' },
    { name: 'intermediate-rank', kind: 'rank', value: 'intermediate-rank', price: 5.00, image: '/assets/intermediate-rank.png', description: 'A stronger rank for players ready to go further.' },
    { name: 'master-rank', kind: 'rank', value: 'master-rank', price: 7.00, image: '/assets/master-rank.png', description: 'A respected rank for experienced players.' },
    { name: 'king', kind: 'rank', value: 'king', price: 10.00, image: '/assets/king.png', description: 'A royal rank for players who lead the way.' },
    { name: 'admin-rank', kind: 'rank', value: 'admin-rank', price: 12.00, image: '/assets/admin-rank.png', description: 'The highest listed rank package in this store.' },
    { name: '10k', kind: 'money', value: 10000, price: 2.00, image: '/assets/10k.png', description: '10,000 in-game currency delivered to your account.' },
    { name: '50k', kind: 'money', value: 50000, price: 4.00, image: '/assets/50k.png', description: '50,000 in-game currency delivered to your account.' },
    { name: '100k', kind: 'money', value: 100000, price: 8.00, image: '/assets/100k.png', description: '100,000 in-game currency delivered to your account.' },
    { name: '1mil', kind: 'money', value: 1000000, price: 12.00, image: '/assets/1mil.png', description: '1,000,000 in-game currency delivered to your account.' },
    { name: '5mil', kind: 'money', value: 5000000, price: 17.00, image: '/assets/5mil.png', description: '5,000,000 in-game currency delivered to your account.' },
    { name: '1bil', kind: 'money', value: 1000000000, price: 22.99, image: '/assets/1bil.png', description: '1,000,000,000 in-game currency delivered to your account.' }
];
let cart = [];

const money = value => `$${value.toFixed(2)}`;
app.innerHTML = `<main class="store-shell"><nav class="nav"><a class="logo" href="#top"><span class="logo-mark">S</span><span>survivalcraft<span class="logo-accent">.</span></span></a><div class="nav-links"><a href="#ranks">Ranks</a><a href="#money">Currency</a><a href="#how-it-works">How it works</a></div><div class="nav-actions"><div class="server-status"><span></span> Server online</div><button class="cart-button" id="open-cart">Cart <b id="cart-count">0</b></button></div></nav><section class="hero" id="top"><div class="hero-copy"><p class="kicker"><span class="spark">✦</span> Official server store</p><h1>Build your<br><em>legacy.</em></h1><p class="hero-text">Ranks, rewards, and a little more room to dream. Pick your path and make your mark on SurvivalCraft.</p><a class="hero-link" href="#ranks">Explore the store <span>↓</span></a></div><div class="hero-art" aria-label="Code-built block landscape illustration"><div class="sun"></div><div class="mountain mountain-back"></div><div class="mountain mountain-front"></div><div class="island"><i></i><i></i><i></i><i></i></div><div class="pixel-cloud cloud-one"></div><div class="pixel-cloud cloud-two"></div></div></section><section class="store-section" id="ranks"><div class="section-heading"><div><p class="kicker">Choose your path</p><h2>Ranks & perks</h2></div><p class="section-note">Test payments only<br>with instant RCON delivery.</p></div><div class="rank-grid">${packages.filter(item => item.kind === 'rank').map(packageCard).join('')}</div><div class="section-heading money-heading" id="money"><div><p class="kicker">Fill the coffers</p><h2>In-game currency</h2></div><p class="section-note">Numeric rewards only.<br>No shorthand, no surprises.</p></div><div class="rank-grid">${packages.filter(item => item.kind === 'money').map(packageCard).join('')}</div></section><section class="steps" id="how-it-works"><p class="kicker">Simple as spawning in</p><h2>From checkout to<br><em>in-game.</em></h2><div class="step-grid"><div><b>01</b><h4>Pick your packages</h4><p>Build a cart with rank and currency packages.</p></div><div><b>02</b><h4>Run test payment</h4><p>No card is charged while the store is in testing.</p></div><div><b>03</b><h4>Join the server</h4><p>Your selected commands are delivered by RCON.</p></div></div></section><footer id="support"><div class="logo"><span class="logo-mark">S</span><span>survivalcraft<span class="logo-accent">.</span></span></div><p>Made for the players who stay up one more night.</p><span>© 2026 SurvivalCraft</span></footer><div id="modal-root"></div></main>`;

function packageCard(item) {
    const index = packages.indexOf(item) + 1;
    const displayValue = item.kind === 'rank' ? item.value : item.value.toLocaleString('en-US');
    const visual = item.image ? `<img src="${item.image}" alt="${item.name} package artwork">` : '<div class="pixel-sun"></div><div class="pixel-mountain"></div><div class="pixel-ground"></div><div class="pixel-totem"><i></i><i></i><i></i></div>';
    return `<article class="rank-card ${item.kind === 'money' ? 'money-card' : ''}"><div class="rank-card-art art-${item.kind}-${item.value}">${visual}<span class="rank-number">${String(index).padStart(2, '0')}</span></div><div class="rank-card-body"><div class="rank-meta"><span>${item.kind === 'rank' ? 'Rank package' : 'Currency package'}</span><span class="available"><i></i> Available</span></div><h3>${item.name}</h3><p>${item.description}</p><div class="perk-line"><span>✦</span><b>${item.kind === 'rank' ? item.value : `$${displayValue}`}</b> ${item.kind === 'rank' ? 'LuckPerms rank' : 'in-game balance'}</div><div class="rank-buy"><strong>${money(item.price)}</strong><div class="card-actions"><button class="buy-button buy-now" data-value="${item.value}" data-kind="${item.kind}">Buy now <span>↗</span></button><button class="buy-button add-cart" data-value="${item.value}" data-kind="${item.kind}">Add to cart <span>+</span></button></div></div></div></article>`;
}

document.querySelectorAll('.add-cart').forEach(button => button.addEventListener('click', () => {
    addToCart(button.dataset.kind, button.dataset.value);
    if (button.dataset.kind === 'money') showQuantityControl(button);
}));
document.querySelectorAll('.buy-now').forEach(button => button.addEventListener('click', () => { cart = []; addToCart(button.dataset.kind, button.dataset.value); openCheckout(); }));
document.querySelector('#open-cart').addEventListener('click', openCart);

function addToCart(kind, value) {
    const item = packages.find(packageItem => packageItem.kind === kind && String(packageItem.value) === value);
    if (!item) return;
    const existing = cart.find(cartItem => cartItem.kind === kind && String(cartItem.value) === value);
    if (existing) {
        if (kind === 'money') existing.quantity += 1;
    } else cart.push({ ...item, quantity: 1 });
    updateCartCount();
}

function showQuantityControl(button) {
    const actions = button.closest('.card-actions');
    const item = cart.find(cartItem => cartItem.kind === 'money' && String(cartItem.value) === button.dataset.value);
    actions.innerHTML = `<div class="quantity-control"><button type="button" class="quantity-minus">−</button><b>${item.quantity}</b><button type="button" class="quantity-plus">+</button></div>`;
    actions.querySelector('.quantity-minus').addEventListener('click', () => changeQuantity(button.dataset.value, -1, actions));
    actions.querySelector('.quantity-plus').addEventListener('click', () => changeQuantity(button.dataset.value, 1, actions));
}

function changeQuantity(value, change, actions) {
    const item = cart.find(cartItem => cartItem.kind === 'money' && String(cartItem.value) === value);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(cartItem => !(cartItem.kind === 'money' && String(cartItem.value) === value));
        actions.innerHTML = `<button class="buy-button add-cart" data-value="${value}" data-kind="money">Add to cart <span>+</span></button>`;
        actions.querySelector('.add-cart').addEventListener('click', event => { addToCart('money', value); showQuantityControl(event.currentTarget); });
    } else actions.querySelector('b').textContent = item.quantity;
    updateCartCount();
}

function updateCartCount() { document.querySelector('#cart-count').textContent = cart.reduce((total, item) => total + item.quantity, 0); }
function closeModal() { document.querySelector('#modal-root').innerHTML = ''; }

function openCart() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.querySelector('#modal-root').innerHTML = `<div class="modal-backdrop"><section class="purchase-modal cart-modal"><button class="modal-close" type="button" id="close-modal">×</button><p class="kicker">Your cart · Test mode</p><h2>${cart.length ? 'Ready to begin?' : 'Your cart is quiet.'}</h2>${cart.length ? `<div class="cart-items">${cart.map(item => `<div class="cart-item"><span>${item.name}<small>${item.kind === 'rank' ? `Rank: ${item.value}` : `Balance: ${item.value.toLocaleString('en-US')} × ${item.quantity}`}</small></span><strong>${money(item.price * item.quantity)}</strong><button type="button" class="remove-item" data-kind="${item.kind}" data-value="${item.value}">×</button></div>`).join('')}</div><div class="cart-total"><span>Test payment total</span><strong>${money(total)}</strong></div><button class="buy-button wide" id="checkout-open">Continue to test checkout <span>↗</span></button>` : '<p class="modal-copy">Add a package to see it here.</p><button class="buy-button wide" type="button" id="keep-shopping">Keep shopping <span>↓</span></button>'}</section></div>`;
    document.querySelector('#close-modal').addEventListener('click', closeModal);
    document.querySelector('#keep-shopping')?.addEventListener('click', closeModal);
    document.querySelectorAll('.remove-item').forEach(button => button.addEventListener('click', () => { cart = cart.filter(item => !(item.kind === button.dataset.kind && String(item.value) === button.dataset.value)); updateCartCount(); openCart(); }));
    document.querySelector('#checkout-open')?.addEventListener('click', openCheckout);
}

function openCheckout() {
    document.querySelector('#modal-root').innerHTML = `<div class="modal-backdrop"><form class="purchase-modal" id="purchase-form"><button class="modal-close" type="button" id="close-modal">×</button><p class="kicker">${cart.length} package${cart.length > 1 ? 's' : ''} · Test mode</p><h2>Ready to begin?</h2><p class="modal-copy">No real money or card details are collected. Your selected package will be delivered to your account.</p><label for="username">Minecraft username</label><input id="username" name="username" minlength="3" maxlength="16" pattern="[A-Za-z0-9_]+" placeholder="e.g. Steve" required autofocus><p class="form-message" id="form-message"></p><button class="buy-button wide" type="submit">Run test payment <span>↗</span></button></form></div>`;
    document.querySelector('#close-modal').addEventListener('click', closeModal);
    document.querySelector('#purchase-form').addEventListener('submit', submitPurchase);
}

async function submitPurchase(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const message = form.querySelector('#form-message');
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.innerHTML = 'Running test...';
    try {
        const response = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: form.username.value.trim(), packages: cart.map(item => ({ kind: item.kind, value: item.value, quantity: item.quantity })), testPayment: true }) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.details ? `${result.error} (${result.details})` : result.error || 'Unable to deliver the packages.');
        form.innerHTML = `<div class="success-icon">✓</div><p class="kicker">Test order complete</p><h2>Welcome, ${result.username}.</h2><p class="modal-copy">${result.message}</p><button class="buy-button wide" type="button" id="done">Done</button>`;
        cart = [];
        updateCartCount();
        form.querySelector('#done').addEventListener('click', closeModal);
    } catch (error) { message.textContent = error.message; button.disabled = false; button.innerHTML = 'Try again <span>↗</span>'; }
}