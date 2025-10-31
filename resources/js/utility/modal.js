export function showModal(modalName) {
    setTimeout(() => {
        const modal = new bootstrap.Modal(document.getElementById(modalName))
        modal.show()
    }, 50);
}