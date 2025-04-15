document.addEventListener("DOMContentLoaded", function () {
    loadRegions();
  
    document.getElementById("region").addEventListener("change", function () {
      const regionId = this.value;
      clearAndDisable(["province", "city", "barangay"]);
      if (regionId) loadProvinces(regionId);
    });
  
    document.getElementById("province").addEventListener("change", function () {
      const provinceId = this.value;
      clearAndDisable(["city", "barangay"]);
      if (provinceId) loadCities(provinceId);
    });
  
    document.getElementById("city").addEventListener("change", function () {
      const cityId = this.value;
      clearAndDisable(["barangay"]);
      if (cityId) loadBarangays(cityId);
    });
  
    document.getElementById("addressForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const fname = document.getElementById("firstName").value;
      const lname = document.getElementById("lastName").value;
      const region = document.getElementById("region").selectedOptions[0].text;
      const province = document.getElementById("province").selectedOptions[0].text;
      const city = document.getElementById("city").selectedOptions[0].text;
      const barangay = document.getElementById("barangay").selectedOptions[0].text;
  
      document.body.innerHTML = `
            <div class="form-container">
                <h2>Hello ${fname} ${lname},</h2>
                <p>You live at <strong>${barangay}, ${city}, ${province}, ${region}</strong>, Philippines.</p>
            </div>
        `;

    });
});
  
  function loadRegions() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../index.php?action=regions", true);
    xhttp.onload = function () {
      if (xhttp.status === 200) {
        const data = JSON.parse(xhttp.responseText);
        const select = document.getElementById("region");
        select.innerHTML = `<option value="">Select Region</option>`;
        data.forEach(item => {
          const option = document.createElement("option");
          option.value = item.region_id;
          option.text = item.region_description;
          select.appendChild(option);
        });
        select.disabled = false;
      }
    };
    xhttp.send();
  }
  
  function loadProvinces(regionId) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../index.php?action=provinces", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onload = function () {
      if (xhttp.status === 200) {
        const data = JSON.parse(xhttp.responseText);
        const select = document.getElementById("province");
        select.innerHTML = `<option value="">Select Province</option>`;
        data.forEach(item => {
          const option = document.createElement("option");
          option.value = item.province_id;
          option.text = item.province_name;
          select.appendChild(option);
        });
        select.disabled = false;
      }
    };
    xhttp.send("region_id=" + encodeURIComponent(regionId));
  }
  
  function loadCities(provinceId) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../index.php?action=municipalities", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onload = function () {
      if (xhttp.status === 200) {
        const data = JSON.parse(xhttp.responseText);
        const select = document.getElementById("city");
        select.innerHTML = `<option value="">Select City/Municipality</option>`;
        data.forEach(item => {
          const option = document.createElement("option");
          option.value = item.municipality_id;
          option.text = item.municipality_name;
          select.appendChild(option);
        });
        select.disabled = false;
      }
    };
    xhttp.send("province_id=" + encodeURIComponent(provinceId));
  }
  
  function loadBarangays(cityId) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../index.php?action=barangays", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onload = function () {
      if (xhttp.status === 200) {
        const data = JSON.parse(xhttp.responseText);
        const select = document.getElementById("barangay");
        select.innerHTML = `<option value="">Select Barangay</option>`;
        data.forEach(item => {
          const option = document.createElement("option");
          option.value = item.barangay_id;
          option.text = item.barangay_name;
          select.appendChild(option);
        });
        select.disabled = false;
      }
    };
    xhttp.send("municipality_id=" + encodeURIComponent(cityId));
  }
  
  function clearAndDisable(ids) {
    ids.forEach(id => {
      const select = document.getElementById(id);
      select.innerHTML = `<option value="">Select ${id.charAt(0).toUpperCase() + id.slice(1)}</option>`;
      select.disabled = true;
    });
  }
  