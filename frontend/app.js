const map = L.map('map').setView([20.5937, 78.9629], 5); // India center
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

document.getElementById('btnFind').addEventListener('click', async () => {
  const pickup = {
    lat: parseFloat(document.getElementById('pickupLat').value),
    lng: parseFloat(document.getElementById('pickupLng').value)
  };
  const drop = {
    lat: parseFloat(document.getElementById('dropLat').value),
    lng: parseFloat(document.getElementById('dropLng').value)
  };

  const response = await fetch('http://localhost:5000/match', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({pickup, drop})
  });
  const data = await response.json();
  if(data.driver){
    document.getElementById('result').innerText = `Driver assigned: ${data.driver.name}`;
    L.marker([pickup.lat, pickup.lng]).addTo(map).bindPopup('Pickup').openPopup();
    L.marker([drop.lat, drop.lng]).addTo(map).bindPopup('Drop').openPopup();
    L.marker([data.driver.latitude, data.driver.longitude]).addTo(map).bindPopup('Driver Location').openPopup();
  } else {
    document.getElementById('result').innerText = `No drivers available`;
  }
});
