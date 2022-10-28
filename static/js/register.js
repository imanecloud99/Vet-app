window.onload=function () {
    $('#nav-btn-register').addClass('active');
    
};

$('#policy-link').on('click', showModal);

function showModal() {
    $('#policy-modal').modal('show');
}
