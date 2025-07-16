document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("predictForm");
    const resultDiv = document.getElementById("result");
    const predictButton = document.getElementById("predictButton");
    const buttonText = predictButton.querySelector(".button-text");
    const spinner = predictButton.querySelector(".spinner");

    // Location data
    const locations = [
        "1st Phase JP Nagar", "2nd Phase Judicial Layout", "5th Block Hbr Layout", "5th Phase JP Nagar",
        "6th Phase JP Nagar", "7th Phase JP Nagar", "8th Phase JP Nagar", "9th Phase JP Nagar",
        "AECS Layout", "Abbigere", "Akshaya Nagar", "Ambalipura", "Ambedkar Nagar", "Amruthahalli",
        "Anandapura", "Ananth Nagar", "Anekal", "Anjanapura", "Ardendale", "Arekere", "Attibele",
        "BEML Layout", "BTM 2nd Stage", "BTM Layout", "Badavala Nagar", "Balagere", "Banashankari",
        "Banashankari Stage II", "Banashankari Stage III", "Banashankari Stage V", "Banashankari Stage VI",
        "Banaswadi", "Banjara Layout", "Bannerghatta", "Bannerghatta Road", "Basavangudi", "Basaveshwara Nagar",
        "Battarahalli", "Begur", "Begur Road", "Bellandur", "Benson Town", "Bharathi Nagar", "Bhoganhalli",
        "Billekahalli", "Binny Pete", "Bisuvanahalli", "Bommanahalli", "Bommasandra", "Bommasandra Industrial Area",
        "Bommenahalli", "Brookefield", "Budigere", "CV Raman Nagar", "Chamrajpet", "Chandapura", "Channasandra",
        "Chikka Tirupathi", "Chikkabanavar", "Chikkalasandra", "Choodasandra", "Cooke Town", "Cox Town",
        "Dasanapura", "Dasarahalli", "Devanahalli", "Devarachikkanahalli", "Dodda Nekkundi", "Doddaballapur",
        "Doddakallasandra", "Doddathoguru", "Domlur", "Dommasandra", "EPIP Zone", "Electronic City",
        "Electronic City Phase II", "Electronics City Phase 1", "Frazer Town", "GM Palaya", "Garudachar Palya",
        "Gollarapalya Hosahalli", "Gottigere", "Green Glen Layout", "Gubbalala", "Gunjur", "HBR Layout",
        "HRBR Layout", "HSR Layout", "Haralur Road", "Harlur", "Hebbal", "Hebbal Kempapura", "Hegde Nagar",
        "Hennur", "Hennur Road", "Hoodi", "Horamavu Agara", "Horamavu Banaswadi", "Hormavu", "Hosa Road",
        "Hosakerehalli", "Hoskote", "Hosur Road", "Hulimavu", "ISRO Layout", "ITPL", "Iblur Village",
        "Indira Nagar", "JP Nagar", "Jakkur", "Jalahalli", "Jalahalli East", "Jigani", "Judicial Layout",
        "KR Puram", "Kadubeesanahalli", "Kadugodi", "Kaggadasapura", "Kaggalipura", "Kaikondrahalli",
        "Kalena Agrahara", "Kalyan nagar", "Kambipura", "Kammanahalli", "Kammasandra", "Kanakapura",
        "Kanakpura Road", "Kannamangala", "Karuna Nagar", "Kasavanhalli", "Kasturi Nagar", "Kathriguppe",
        "Kaval Byrasandra", "Kenchenahalli", "Kengeri", "Kengeri Satellite Town", "Kereguddadahalli",
        "Kodichikkanahalli", "Kodigehaali", "Kodigehalli", "Kodihalli", "Kogilu", "Konanakunte", "Koramangala",
        "Kothannur", "Kothanur", "Kudlu", "Kudlu Gate", "Kumaraswami Layout", "Kundalahalli", "LB Shastri Nagar",
        "Laggere", "Lakshminarayana Pura", "Lingadheeranahalli", "Magadi Road", "Mahadevpura", "Mahalakshmi Layout",
        "Mallasandra", "Malleshpalya", "Malleshwaram", "Marathahalli", "Margondanahalli", "Marsur", "Mico Layout",
        "Munnekollal", "Murugeshpalya", "Mysore Road", "NGR Layout", "NRI Layout", "Nagarbhavi", "Nagasandra",
        "Nagavara", "Nagavarapalya", "Narayanapura", "Neeladri Nagar", "Nehru Nagar", "OMBR Layout",
        "Old Airport Road", "Old Madras Road", "Padmanabhanagar", "Pai Layout", "Panathur", "Parappana Agrahara",
        "Pattandur Agrahara", "Poorna Pragna Layout", "Prithvi Layout", "R.T. Nagar", "Rachenahalli",
        "Raja Rajeshwari Nagar", "Rajaji Nagar", "Rajiv Nagar", "Ramagondanahalli", "Ramamurthy Nagar",
        "Rayasandra", "Sahakara Nagar", "Sanjay nagar", "Sarakki Nagar", "Sarjapur", "Sarjapur  Road",
        "Sarjapura - Attibele Road", "Sector 2 HSR Layout", "Sector 7 HSR Layout", "Seegehalli", "Shampura",
        "Shivaji Nagar", "Singasandra", "Somasundara Palya", "Sompura", "Sonnenahalli", "Subramanyapura",
        "Sultan Palaya", "TC Palaya", "Talaghattapura", "Thanisandra", "Thigalarapalya", "Thubarahalli",
        "Tindlu", "Tumkur Road", "Ulsoor", "Uttarahalli", "Varthur", "Varthur Road", "Vasanthapura",
        "Vidyaranyapura", "Vijayanagar", "Vishveshwarya Layout", "Vishwapriya Layout", "Vittasandra",
        "Whitefield", "Yelachenahalli", "Yelahanka", "Yelahanka New Town", "Yelenahalli", "Yeshwanthpur", "Others"
    ];

    // Searchable dropdown functionality
    const locationInput = document.getElementById("location");
    const dropdownContainer = locationInput.parentElement;
    const dropdownList = document.getElementById("locationDropdown");
    
    let filteredLocations = [...locations];
    let selectedIndex = -1;
    let selectedLocation = "";

    // Initialize dropdown
    function initializeDropdown() {
        populateDropdown(locations);
    }

    // Populate dropdown with locations
    function populateDropdown(locationList) {
        dropdownList.innerHTML = "";
        
        if (locationList.length === 0) {
            const noResultsItem = document.createElement("div");
            noResultsItem.className = "dropdown-item no-results";
            noResultsItem.textContent = "No locations found";
            dropdownList.appendChild(noResultsItem);
            return;
        }

        locationList.forEach((location, index) => {
            const item = document.createElement("div");
            item.className = "dropdown-item";
            item.textContent = location;
            item.addEventListener("click", () => selectLocation(location));
            dropdownList.appendChild(item);
        });
    }

    // Filter locations based on input
    function filterLocations(query) {
        if (!query.trim()) {
            filteredLocations = [...locations];
        } else {
            filteredLocations = locations.filter(location =>
                location.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        selectedIndex = -1;
        populateDropdown(filteredLocations);
        updateHighlight();
    }

    // Select a location
    function selectLocation(location) {
        selectedLocation = location;
        locationInput.value = location;
        closeDropdown();
    }

    // Open dropdown
    function openDropdown() {
        dropdownContainer.classList.add("open");
        dropdownList.classList.remove("hidden");
        filterLocations(locationInput.value);
    }

    // Close dropdown
    function closeDropdown() {
        dropdownContainer.classList.remove("open");
        dropdownList.classList.add("hidden");
        selectedIndex = -1;
    }

    // Update highlight for keyboard navigation
    function updateHighlight() {
        const items = dropdownList.querySelectorAll(".dropdown-item:not(.no-results)");
        items.forEach((item, index) => {
            item.classList.toggle("highlighted", index === selectedIndex);
        });
    }

    // Handle keyboard navigation
    function handleKeyNavigation(e) {
        const items = dropdownList.querySelectorAll(".dropdown-item:not(.no-results)");
        
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                updateHighlight();
                break;
            case "ArrowUp":
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, -1);
                updateHighlight();
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    selectLocation(items[selectedIndex].textContent);
                } else if (locationInput.value.trim()) {
                    // If user typed something not in the list, default to "Others"
                    const exactMatch = locations.find(loc => 
                        loc.toLowerCase() === locationInput.value.toLowerCase()
                    );
                    if (!exactMatch) {
                        selectLocation("Others");
                    }
                }
                break;
            case "Escape":
                closeDropdown();
                break;
        }
    }

    // Event listeners for location input
    locationInput.addEventListener("input", (e) => {
        openDropdown();
        filterLocations(e.target.value);
    });

    locationInput.addEventListener("focus", () => {
        openDropdown();
    });

    locationInput.addEventListener("keydown", handleKeyNavigation);

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!dropdownContainer.contains(e.target)) {
            // If user typed something not in the list, default to "Others"
            if (locationInput.value.trim() && !selectedLocation) {
                const exactMatch = locations.find(loc => 
                    loc.toLowerCase() === locationInput.value.toLowerCase()
                );
                if (!exactMatch) {
                    selectLocation("Others");
                }
            }
            closeDropdown();
        }
    });

    // Initialize dropdown on page load
    initializeDropdown();

    // Form submission handler
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Show loading state
        buttonText.classList.add("hidden");
        spinner.classList.remove("hidden");
        predictButton.disabled = true;
        resultDiv.classList.add("hidden");

        // Get form values
        const location = locationInput.value || "Others";
        const sqft = document.getElementById("total_sqft").value;
        const bath = document.getElementById("bath").value;
        const bhk = document.getElementById("bhk").value;
        const area_type = document.getElementById("area_type").value;

        // Validate location - if not in predefined list, use "Others"
        const finalLocation = locations.includes(location) ? location : "Others";

        try {
            // Using GET request as per the example URL
            const response = await fetch(`https://house-prediction-api-eqn1.onrender.com/predict?location=${encodeURIComponent(finalLocation)}&sqft=${sqft}&bath=${bath}&bhk=${bhk}&area_type=${area_type}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            // Display success result
            resultDiv.innerHTML = `Estimated Price: <strong>₹ ${Number(data.price).toLocaleString('en-IN')} Lakhs</strong>`;
            resultDiv.className = 'result-success';
            resultDiv.classList.remove('hidden');

        } catch (error) {
            console.error("Prediction error:", error);
            // Display error message
            resultDiv.textContent = "⚠️ Error: Could not fetch prediction. Please try again.";
            resultDiv.className = 'result-error';
            resultDiv.classList.remove('hidden');
        } finally {
            // Hide loading state
            buttonText.classList.remove("hidden");
            spinner.classList.add("hidden");
            predictButton.disabled = false;
        }
    });
});

