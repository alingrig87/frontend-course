// Working with APIs (REST, JSON, fetch) - app.js
console.log("Chapter: Working with APIs (REST, JSON, fetch)");

// ============================================
// NAVIGARE SMOOTH ÎNTRE SECȚIUNI
// ============================================
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Actualizează clasa active
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Scroll smooth către secțiune
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// WORKSHOP 1: API DE PRODUSE (FakeStore API)
// ============================================
const resultDiv = document.getElementById('result');

// Obține toate produsele (limitat la 5)
document.getElementById('getProducts').addEventListener('click', async () => {
    resultDiv.textContent = 'Se încarcă produsele...';
    
    try {
        const response = await fetch('https://fakestoreapi.com/products?limit=5');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();
        resultDiv.textContent = JSON.stringify(products, null, 2);
        
        console.log('Produse obținute:', products);
    } catch (error) {
        resultDiv.textContent = 'Eroare: ' + error.message;
        console.error('Eroare la obținerea produselor:', error);
    }
});

// Obține un produs specific după ID
document.getElementById('getProduct').addEventListener('click', async () => {
    const id = document.getElementById('productId').value;
    
    if (!id || id < 1) {
        resultDiv.textContent = 'Te rog introdu un ID valid (1-20)!';
        return;
    }
    
    resultDiv.textContent = `Se încarcă produsul cu ID ${id}...`;
    
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
            throw new Error(`Produsul cu ID ${id} nu a fost găsit!`);
        }
        
        const product = await response.json();
        resultDiv.textContent = JSON.stringify(product, null, 2);
        
        console.log('Produs obținut:', product);
    } catch (error) {
        resultDiv.textContent = 'Eroare: ' + error.message;
        console.error('Eroare la obținerea produsului:', error);
    }
});

// Obține toate categoriile disponibile
document.getElementById('getCategories').addEventListener('click', async () => {
    resultDiv.textContent = 'Se încarcă categorii...';
    
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const categories = await response.json();
        
        // Populează dropdown-ul cu categorii
        const select = document.getElementById('categorySelect');
        select.innerHTML = '<option value="">Selectează categorie</option>';
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
        
        resultDiv.textContent = JSON.stringify(categories, null, 2);
        
        console.log('Categorii obținute:', categories);
    } catch (error) {
        resultDiv.textContent = 'Eroare: ' + error.message;
        console.error('Eroare la obținerea categoriilor:', error);
    }
});

// Filtrează produsele după categorie selectată
document.getElementById('getByCategory').addEventListener('click', async () => {
    const category = document.getElementById('categorySelect').value;
    
    if (!category) {
        resultDiv.textContent = 'Te rog selectează o categorie mai întâi!';
        return;
    }
    
    resultDiv.textContent = `Se încarcă produse din categoria "${category}"...`;
    
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const products = await response.json();
        resultDiv.textContent = JSON.stringify(products, null, 2);
        
        console.log(`Produse din categoria ${category}:`, products);
    } catch (error) {
        resultDiv.textContent = 'Eroare: ' + error.message;
        console.error('Eroare la filtrarea produselor:', error);
    }
});

// ============================================
// WORKSHOP 2: API METEO (Open-Meteo API)
// ============================================
const result2Div = document.getElementById('result2');

// Geocode a city name to coordinates using Open-Meteo's geocoding API
async function geocodeCity(city) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ro`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Geocoding error: ${resp.status}`);
    const data = await resp.json();
    if (!data || !data.results || data.results.length === 0) {
        return null;
    }
    // return first matched result
    const r = data.results[0];
    return {
        latitude: r.latitude,
        longitude: r.longitude,
        name: r.name,
        country: r.country
    };
}

// Reverse geocode coordinates to a human-readable place (if available)
async function reverseGeocode(lat, lon) {
    const url = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&count=1&language=ro`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Reverse geocoding error: ${resp.status}`);
    const data = await resp.json();
    if (!data || !data.results || data.results.length === 0) return null;
    const r = data.results[0];
    return {
        latitude: r.latitude,
        longitude: r.longitude,
        name: r.name,
        country: r.country
    };
}

// Obține datele meteo pentru coordonatele introduse sau pentru un oraș
document.getElementById('getWeather').addEventListener('click', async () => {
    const city = (document.getElementById('city') && document.getElementById('city').value || '').trim();
    let lat = document.getElementById('latitude').value;
    let lon = document.getElementById('longitude').value;
    let resolvedLocation = null; // will hold human-readable place if available

    result2Div.textContent = '';

    // If a city is provided, try to geocode it first
    if (city) {
        result2Div.textContent = `Se caută orașul "${city}"...`;
        try {
            const loc = await geocodeCity(city);
            if (!loc) {
                result2Div.textContent = `Orașul "${city}" nu a fost găsit.`;
                return;
            }
            lat = loc.latitude;
            lon = loc.longitude;
            resolvedLocation = loc;
            result2Div.textContent = `Găsit: ${loc.name}, ${loc.country} — încărcare date meteo...`;
        } catch (err) {
            result2Div.textContent = 'Eroare la geocodare: ' + err.message;
            console.error('Eroare geocodare:', err);
            return;
        }
    }

    // Validate coordinates
    if (!lat || !lon) {
        result2Div.textContent = 'Te rog introdu latitudine și longitudine sau un oraș!';
        return;
    }
    if (isNaN(lat) || isNaN(lon)) {
        result2Div.textContent = 'Latitudinea și longitudinea trebuie să fie numere valide!';
        return;
    }

    result2Div.textContent = 'Se încarcă date meteo...';

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const weather = data.current_weather;

        // If the user did not provide a city, try reverse geocoding to get a place name
        if (!resolvedLocation) {
            try {
                const r = await reverseGeocode(lat, lon);
                if (r) resolvedLocation = r;
            } catch (e) {
                console.warn('Reverse geocode failed:', e);
            }
        }

        const placeLabel = resolvedLocation && resolvedLocation.name ? `${resolvedLocation.name}, ${resolvedLocation.country}` : `${lat}°, ${lon}°`;
        const genMs = typeof data.generationtime_ms !== 'undefined' ? ` (generation: ${data.generationtime_ms} ms)` : '';

        // Formatare răspuns user-friendly
        const formatted = `\n╔════════════════════════════════╗\n║      DATE METEO CURENTE        ║\n╚════════════════════════════════╝\n\n Locație: ${placeLabel}  —  (${lat}°N, ${lon}°E)\n Temperatură: ${weather.temperature}°C\n Viteză vânt: ${weather.windspeed} km/h\n Direcție vânt: ${weather.winddirection}°\n  Cod meteo: ${weather.weathercode}\n Timp: ${weather.time}${genMs}\n\n────────────────────────────────\n\nSursa: Open-Meteo (https://open-meteo.com)\n\nDate complete JSON:\n${JSON.stringify(data, null, 2)}`;

        result2Div.textContent = formatted;

        console.log('Date meteo obținute:', data);
    } catch (error) {
        result2Div.textContent = 'Eroare: ' + error.message;
        console.error('Eroare la obținerea datelor meteo:', error);
    }
});

// ============================================
// FUNCȚII HELPER (pentru exerciții suplimentare)
// ============================================

// Exemplu funcție pentru POST request
async function createProduct(productData) {
    try {
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const newProduct = await response.json();
        console.log('Produs creat:', newProduct);
        return newProduct;
    } catch (error) {
        console.error('Eroare la crearea produsului:', error);
        throw error;
    }
}

// Exemplu funcție pentru PUT request
async function updateProduct(id, productData) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const updatedProduct = await response.json();
        console.log('Produs actualizat:', updatedProduct);
        return updatedProduct;
    } catch (error) {
        console.error('Eroare la actualizarea produsului:', error);
        throw error;
    }
}

// Exemplu funcție pentru DELETE request
async function deleteProduct(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Produs șters:', result);
        return result;
    } catch (error) {
        console.error('Eroare la ștergerea produsului:', error);
        throw error;
    }
}

// ============================================
// EVENIMENTE LA ÎNCĂRCAREA PAGINII
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Pagina a fost încărcată complet!');
    console.log('Aplicația API este gata de utilizare.');
    
    // Poți adăuga aici orice inițializări necesare
    // De exemplu: încărcare automată a categoriilor
    // document.getElementById('getCategories').click();
    
    // NAV SCROLL-SPY: highlight nav link for section in viewport
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sections = navLinks
        .map(l => l.getAttribute('href'))
        .filter(h => h && h.startsWith('#'))
        .map(id => document.querySelector(id))
        .filter(Boolean);

    // helper to set active link by section id
    function setActiveById(id) {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    }

    if ('IntersectionObserver' in window && sections.length) {
        let currentActive = null;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -40% 0px', // consider section active when its top reaches 60% of viewport
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            // pick the entry that isIntersecting and has the largest boundingClientRect.top (closest to top)
            const visible = entries.filter(e => e.isIntersecting);
            if (visible.length) {
                // choose the one with the smallest distance from top of viewport
                visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                const topEntry = visible[0];
                const id = topEntry.target.id;
                if (id && id !== currentActive) {
                    currentActive = id;
                    setActiveById(id);
                }
            } else {
                // if none intersecting, optionally clear active (or keep current)
            }
        }, observerOptions);

        sections.forEach(sec => observer.observe(sec));

        // ensure active is set on load based on current scroll position
        // find section whose top is closest but <= viewport middle
        const onLoadSet = () => {
            let best = null;
            let bestDist = Infinity;
            const mid = window.innerHeight * 0.4;
            sections.forEach(sec => {
                const rect = sec.getBoundingClientRect();
                const dist = Math.abs(rect.top - mid);
                if (dist < bestDist) {
                    bestDist = dist;
                    best = sec;
                }
            });
            if (best && best.id) setActiveById(best.id);
        };

        // run once after small delay to let layout settle
        setTimeout(onLoadSet, 50);
    } else if (sections.length) {
        // fallback: on scroll, compute visible section
        window.addEventListener('scroll', () => {
            let best = null;
            let bestDist = Infinity;
            const mid = window.innerHeight * 0.4;
            sections.forEach(sec => {
                const rect = sec.getBoundingClientRect();
                const dist = Math.abs(rect.top - mid);
                if (dist < bestDist) {
                    bestDist = dist;
                    best = sec;
                }
            });
            if (best && best.id) setActiveById(best.id);
        }, { passive: true });
    }
});

// ============================================
// EXEMPLE PENTRU EXERCIȚII
// ============================================

// Exemplu: Folosește funcțiile helper definite mai sus
/*
// Creare produs nou
createProduct({
    title: 'Produs Test',
    price: 99.99,
    description: 'Aceasta este o descriere',
    image: 'https://i.pravatar.cc',
    category: 'electronic'
});

// Actualizare produs
updateProduct(1, {
    title: 'Produs Actualizat',
    price: 149.99
});

// Ștergere produs
deleteProduct(1);
*/

console.log('App.js încărcat cu succes!');