let fleetArr = [];
document.getElementById("addFleet").addEventListener("click", function() {
    let vno =
        document.getElementById("category").Value;
    let cat =
        document.getElementById("driver").Value;
    let avail =
        document.getElementById("availability").Value;

    if (!vno || !driver) {
        alert("Required fields cannot be empty!");
        return;
    }

    let obj = {
        id: Date.now(),
        vehicleno: vno,
        category: cat,
        driver: driver,
        availability: avail
    };
    fleetArr.push(obj);
    renderData(fleetArr);
});

function renderData(data) {
    let cont =
        document.getElementById("fleetContainer");
    cont.innerHTML = "";
    data.forEach((item) => {
        let card =
            document.createElement("div");
        card.className = "card";

        card.innerHTML = `
    <h3>${item.vehicleno}</h3>
    <p>category: ${item.category}</p>
    <p>Driver: ${item.driver}</p>
    <p>Status: ${item.availability}</p>

    <button onclick="updateDriver($ {item.id})">Update Driver</button>
    <button onclick="changeAvailability</button>
    <button onclick="deleteVehicle($ {item.id})">Delete</button>
    `;
        cont.append(card);
    });
}

function updateDriver(id) {
    let newName = prompt("Enter new driver name:");
    if (!newName) {
        alert("Driver name cannot be empty!");
        return;
    }
    fleetArr = fleetArr.map((el) => el.id === id ? {...el, driver: newName } : el);
    renderData(fleetArr);
}

function changeAvailability(id) {
    fleetArr = fleetArr.map((el) =>
        el.id === id ?
        {
            ...el,
            availability: el.availability ===
                "available" ? "unavailable" : "available",
        } :
        el
    );
    renderData(fleetArr);
}

function deleteVehicle(id) {
    if (confirm("Are you sure you want to delete this vehicle")) {
        fleetArr = fleetArr.filter((el) =>
            el.id! == id);
        renderData(fleetArr);
    }
}
document.getElementById("filterCategory").
addEventListener("change", applyFilters);
document.getElementById("filterAvailability").addEventListener("change", applyFilters);

function applyFilters() {
    let cat =
        document.getElementById("filterCategory").value;
    let avail =
        document.getElementById("filterAvailability").value;
    let filtered = fleetArr.filter((el) => {
        return (
            (cat === "" || el.category === cat) &&
            (avail === "" || el.availability === avail)
        );
    });
    renderData(filtered);
}
document.getElementById("clearFilter").addEventListener("click", function() {
    document.getElementById("filterCategory").
    value = "";
    document.getElementById("filterAvailability").value = "";
    renderData(fleetArr);
});