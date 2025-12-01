export function showModal(modalName) {
    setTimeout(() => {
        const modal = new bootstrap.Modal(document.getElementById(modalName))
        modal.show()
    }, 50);
}

export function hideModal(modalName) {
    const modalElement = document.getElementById(modalName);
    const modal = bootstrap.Modal.getInstance(modalElement)

    if (modal) modal.hide();
}