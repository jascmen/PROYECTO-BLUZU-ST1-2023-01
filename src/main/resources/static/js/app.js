const openModalLink = document.querySelector('.open-modal');
const closeModal = document.querySelector('.jsModalClose');

openModalLink.addEventListener('click', (event) => {
    event.preventDefault();
    const modalId = openModalLink.getAttribute('data-modal');
    const modal = document.querySelector(modalId);
    modal.classList.add('active');
});

closeModal.addEventListener('click', () => {
    const modal = document.querySelector('.modal.active');
    modal.classList.remove('active');
});

window.onclick = (event) => {
    const modal = document.querySelector('.modal.active');
    if (event.target === modal) {
        modal.classList.remove('active');
    }
};