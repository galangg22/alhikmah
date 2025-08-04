// TPQ Locations Data
const tpqLocations = {
    sidoarjo: {
        lat: -7.441597,
        lng: 112.732960,
        name: 'TPQ Al Hikmah - Cabang Sidoarjo',
        address: 'Jl. Kemiri No. 123, Kemiri, Sidoarjo, Jawa Timur 61234',
        phone: '+62 31 8765 4321',
        established: '2008',
        facilities: ['Gedung utama', 'Mushola', 'Perpustakaan', 'Ruang kelas ber-AC'],
        mapsUrl: 'https://www.google.com/maps/place/-7.441597,112.732960/@-7.441597,112.732960,17z'
    },
    surabaya: {
        lat: -7.3329826,
        lng: 112.7674106,
        name: 'TPQ Al Hikmah - Cabang Surabaya',
        address: 'Jl. Rungkut Tengah No. 456, Rungkut, Surabaya, Jawa Timur 60293',
        phone: '+62 31 5432 1098',
        established: '2025',
        facilities: ['Gedung modern', 'Parkir luas', 'Ruang multimedia', 'Taman bermain'],
        mapsUrl: 'https://www.google.com/maps/place/Gg.+1A,+Rungkut+Tengah,+Kec.+Gn.+Anyar,+Surabaya,+Jawa+Timur+60293/@-7.3329826,112.7648357,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd7fad971cdde19:0x82fc30645039527f!8m2!3d-7.3329879!4d112.7674106!16s%2Fg%2F1hm3zhvb4?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D'
    }
};

// Global maps variables
let mapSidoarjo;
let mapSurabaya;

// Initialize Google Maps
function initMaps() {
    // Initialize Sidoarjo Map
    if (document.getElementById('map-sidoarjo')) {
        initSidoarjoMap();
    }
    
    // Initialize Surabaya Map
    if (document.getElementById('map-surabaya')) {
        initSurabayaMap();
    }
}

// Initialize Sidoarjo Map
function initSidoarjoMap() {
    const location = tpqLocations.sidoarjo;
    
    mapSidoarjo = new google.maps.Map(document.getElementById('map-sidoarjo'), {
        zoom: 15,
        center: { lat: location.lat, lng: location.lng },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
            },
            {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#c9c9c9' }]
            }
        ]
    });

    // Create custom marker icon
    const markerIcon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
                <path fill="#2e8b57" d="M20,0 C31,0 40,9 40,20 C40,35 20,50 20,50 S0,35 0,20 C0,9 9,0 20,0 Z"/>
                <circle cx="20" cy="20" r="8" fill="#ffffff"/>
                <path fill="#2e8b57" d="M15,18 L18,21 L25,14" stroke="#ffffff" stroke-width="2"/>
            </svg>
        `),
        scaledSize: new google.maps.Size(40, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 50)
    };

    // Create marker
    const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapSidoarjo,
        title: location.name,
        icon: markerIcon,
        animation: google.maps.Animation.DROP
    });

    // Create info window content
    const infoWindowContent = createInfoWindowContent(location);
    
    const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
    });

    // Add click event to marker
    marker.addListener('click', () => {
        infoWindow.open(mapSidoarjo, marker);
    });

    // Auto-open info window after a short delay
    setTimeout(() => {
        infoWindow.open(mapSidoarjo, marker);
    }, 1000);
}

// Initialize Surabaya Map
function initSurabayaMap() {
    const location = tpqLocations.surabaya;
    
    mapSurabaya = new google.maps.Map(document.getElementById('map-surabaya'), {
        zoom: 15,
        center: { lat: location.lat, lng: location.lng },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
            },
            {
                featureType: 'landscape',
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#c9c9c9' }]
            }
        ]
    });

    // Create custom marker icon for Surabaya
    const markerIcon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 40 50">
                <path fill="#20b2aa" d="M20,0 C31,0 40,9 40,20 C40,35 20,50 20,50 S0,35 0,20 C0,9 9,0 20,0 Z"/>
                <circle cx="20" cy="20" r="8" fill="#ffffff"/>
                <path fill="#20b2aa" d="M15,18 L18,21 L25,14" stroke="#ffffff" stroke-width="2"/>
            </svg>
        `),
        scaledSize: new google.maps.Size(40, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 50)
    };

    // Create marker
    const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: mapSurabaya,
        title: location.name,
        icon: markerIcon,
        animation: google.maps.Animation.DROP
    });

    // Create info window content
    const infoWindowContent = createInfoWindowContent(location);
    
    const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
    });

    // Add click event to marker
    marker.addListener('click', () => {
        infoWindow.open(mapSurabaya, marker);
    });

    // Auto-open info window after a short delay
    setTimeout(() => {
        infoWindow.open(mapSurabaya, marker);
    }, 1000);
}

// Create Info Window Content
function createInfoWindowContent(location) {
    return `
        <div class="location-card p-4 max-w-sm">
            <h3 class="font-bold text-lg text-primary mb-2">${location.name}</h3>
            <p class="text-gray-600 mb-3">${location.address}</p>
            
            <div class="space-y-2 mb-4">
                <div class="flex items-center space-x-2">
                    <i class="fas fa-phone text-primary"></i>
                    <span class="text-gray-700">${location.phone}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <i class="fas fa-calendar text-primary"></i>
                    <span class="text-gray-700">Berdiri sejak ${location.established}</span>
                </div>
            </div>
            
            <div class="mb-4">
                <p class="font-semibold text-gray-800 mb-2">Fasilitas:</p>
                <ul class="text-sm text-gray-600">
                    ${location.facilities.map(facility => `<li>• ${facility}</li>`).join('')}
                </ul>
            </div>
            
            <div class="flex space-x-2">
                <button onclick="getDirections('${location.lat}', '${location.lng}')" 
                        class="bg-primary text-white px-3 py-2 rounded-lg text-sm hover:bg-primary/80 transition-colors">
                    <i class="fas fa-directions mr-1"></i>
                    Petunjuk Arah
                </button>
                <button onclick="whatsappContact('location')" 
                        class="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
                    <i class="fab fa-whatsapp mr-1"></i>
                    Chat
                </button>
            </div>
        </div>
    `;
}

// Open Maps in External App - UPDATED FUNCTION
function openMaps(location) {
    const locationData = tpqLocations[location];
    
    if (!locationData) {
        showToast('Lokasi tidak ditemukan!', 'error');
        return;
    }

    // Use the specific mapsUrl for each location
    window.open(locationData.mapsUrl, '_blank');
    
    showToast(`Membuka peta ${locationData.name}...`);
}

// Get Directions - UPDATED FUNCTION
function getDirections(lat, lng) {
    // Find which location this is based on coordinates
    let locationKey = '';
    if (lat == -7.441597 && lng == 112.732960) {
        locationKey = 'sidoarjo';
    } else if (lat == -7.3329826 && lng == 112.7674106) {
        locationKey = 'surabaya';
    }
    
    if (locationKey && tpqLocations[locationKey].mapsUrl) {
        // Use the specific maps URL for directions
        window.open(tpqLocations[locationKey].mapsUrl, '_blank');
        showToast('Membuka petunjuk arah...');
    } else {
        // Fallback to original method
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                const directionsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${lat},${lng}`;
                window.open(directionsUrl, '_blank');
                
                showToast('Membuka petunjuk arah...');
            }, function(error) {
                const directionsUrl = `https://www.google.com/maps/dir//${lat},${lng}`;
                window.open(directionsUrl, '_blank');
                
                showToast('Membuka petunjuk arah...');
            });
        } else {
            const directionsUrl = `https://www.google.com/maps/dir//${lat},${lng}`;
            window.open(directionsUrl, '_blank');
            
            showToast('Membuka petunjuk arah...');
        }
    }
}

// Handle Maps API Load Error
function handleMapsError() {
    console.error('Google Maps failed to load');
    
    // Show fallback content
    const mapElements = document.querySelectorAll('[id^="map-"]');
    mapElements.forEach(element => {
        const locationKey = element.id.split('-')[1];
        element.innerHTML = `
            <div class="flex items-center justify-center h-full bg-gray-100 rounded-3xl">
                <div class="text-center p-8">
                    <i class="fas fa-map-marked-alt text-6xl text-gray-400 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-600 mb-2">Peta Tidak Tersedia</h3>
                    <p class="text-gray-500 mb-4">Silakan gunakan tombol di bawah untuk membuka di Google Maps</p>
                    <button onclick="openMaps('${locationKey}')" 
                            class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors">
                        Buka Google Maps
                    </button>
                </div>
            </div>
        `;
    });
}

// Initialize maps when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if Google Maps API is loaded
    if (typeof google !== 'undefined' && google.maps) {
        initMaps();
    } else {
        // Set up error handler
        window.gm_authFailure = handleMapsError;
        
        // Wait a bit and check again
        setTimeout(() => {
            if (typeof google === 'undefined' || !google.maps) {
                handleMapsError();
            }
        }, 5000);
    }
});
