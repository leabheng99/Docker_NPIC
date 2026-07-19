import Swal from 'sweetalert2';

const defaultOptions = {
    width: '300px',
    showClass: { popup: '' }, // Disable animation for faster appearance
    hideClass: { popup: '' }
};

export function LoadingModal(title = 'Loading...') {
    Swal.fire({
        ...defaultOptions,
        title: title,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

export function MessageModal({ icon = 'success', title = '', text = '' }) {
    return Swal.fire({
        ...defaultOptions,
        icon,
        title,
        text
    });
}

export function CloseModal() {
    Swal.close();
}
