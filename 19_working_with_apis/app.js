console.log("Chapter: Working with APIs (REST, JSON, fetch)");

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const resultDiv = document.getElementById('result');

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

document.getElementById('getCategories').addEventListener('click', async () => {
    resultDiv.textContent = 'Se încarcă categorii...';
    
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const categories = await response.json();
        
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

const result2Div = document.getElementById('result2');

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

document.getElementById('getWeather').addEventListener('click', async () => {
    const city = (document.getElementById('city') && document.getElementById('city').value || '').trim();
    let lat = document.getElementById('latitude').value;
    let lon = document.getElementById('longitude').value;
    let resolvedLocation = null; 

    result2Div.textContent = '';

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

        const formatted = `\n╔════════════════════════════════╗\n║      DATE METEO CURENTE        ║\n╚════════════════════════════════╝\n\n Locație: ${placeLabel}  —  (${lat}°N, ${lon}°E)\n Temperatură: ${weather.temperature}°C\n Viteză vânt: ${weather.windspeed} km/h\n Direcție vânt: ${weather.winddirection}°\n  Cod meteo: ${weather.weathercode}\n Timp: ${weather.time}${genMs}\n\n────────────────────────────────\n\nSursa: Open-Meteo (https://open-meteo.com)\n\nDate complete JSON:\n${JSON.stringify(data, null, 2)}`;

        result2Div.textContent = formatted;

        console.log('Date meteo obținute:', data);
    } catch (error) {
        result2Div.textContent = 'Eroare: ' + error.message;
        console.error('Eroare la obținerea datelor meteo:', error);
    }
});

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

document.addEventListener('DOMContentLoaded', () => {
    console.log('Pagina a fost încărcată complet!');
    console.log('Aplicația API este gata de utilizare.');
    
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sections = navLinks
        .map(l => l.getAttribute('href'))
        .filter(h => h && h.startsWith('#'))
        .map(id => document.querySelector(id))
        .filter(Boolean);

    function setActiveById(id) {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    }

    if ('IntersectionObserver' in window && sections.length) {
        let currentActive = null;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -40% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            const visible = entries.filter(e => e.isIntersecting);
            if (visible.length) {
                visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                const topEntry = visible[0];
                const id = topEntry.target.id;
                if (id && id !== currentActive) {
                    currentActive = id;
                    setActiveById(id);
                }
            } else {
            }
        }, observerOptions);

        sections.forEach(sec => observer.observe(sec));

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

        setTimeout(onLoadSet, 50);
    } else if (sections.length) {
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

console.log('App.js încărcat cu succes!');