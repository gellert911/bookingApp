export function showAlert (message, type, delay = 2000) {
    const placeholder = document.querySelector(".toast-container");
    type = convertType(type);

    const toast = document.createElement('div');
    toast.classList.add('toast');
    //toast.classList.add(`alert-${type}`);
    toast.classList.add(`align-items-center`);
    toast.classList.add(`text-bg-${type}`);
    toast.classList.add('border-0');
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    placeholder.appendChild(toast);

    const toastObj = new bootstrap.Toast(toast, {
        autohide: true,
        delay: delay
    });

    toastObj.show(); 
}

function convertType(type) {
    if (type == "error") {
        return "danger";
    }

    return type;
}