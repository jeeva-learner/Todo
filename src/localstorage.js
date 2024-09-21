let local_storage_json = new Object();

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
        );
    }
}

if (storageAvailable("localStorage")) {
    // Check if there's any data in localStorage and load it into local_storage_json
    if (localStorage.getItem('projects')) {
        local_storage_json = JSON.parse(localStorage.getItem('projects'));
    }
} else {
    alert("LocalStorage is not available in this browser.");
}

// Save the current state of local_storage_json to localStorage
function saveToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(local_storage_json));
}

export { local_storage_json, saveToLocalStorage };
