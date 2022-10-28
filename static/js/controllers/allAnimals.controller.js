window.onload = function() {
    $('#nav-btn-all-animals').addClass('active');
};

$(() => {
    $('.datepicker').datepicker({
        format: 'dd-mm-yyyy'
    });

    let input = $('#searchField');
    let searchBtn = $('#searchBtn');
    let users = $('.username');

    let usernames = [];

    for (let i = 0; i < users.length; i += 1) {
        usernames[i] = users[i].innerText;
    }

    usernames = [...new Set(usernames)];
    input.typeahead({ source: usernames, showHintOnFocus: true, items: 'all' });
    let warning = $('#warning');
    let spacing = $('.spacing');

    searchBtn.on('click', () => {
        let inputValue = $('#searchField').val();
        let petsList = $('.petsList > li');
        let isFound = false;
        petsList.hide();
        warning.hide();

        let foundCounter = 0;
        for (let i = 0; i < petsList.length; i += 1) {
            let username = petsList[i].childNodes[4].innerText.split(':')[1];
            if (inputValue.length === 0) {
                spacing.hide();
                break;
            }
            else if (inputValue === username) {
                petsList[i].style.display = "block";
                isFound = true;
                foundCounter += 1;
                if (foundCounter === 1) {
                    $(petsList[i]).children('.ownerAddress').show();
                    $(petsList[i]).children('.ownerPhone').show();
                }
                spacing.show();
            }
            else if (i === petsList.length - 1 && !isFound) {
                warning.show();
                spacing.hide();
            }
        }
    })
});

let $edit = $('.edit');
$edit.on('click', (event) => {
    let $editButton = $(event.target);
    let li = event.target.parentElement.parentElement;

    $editButton.hide();
    let $okButton = $editButton.next();
    $okButton.show();

    let formText = event.target.parentElement.innerText;
    formText = formText.split(':');
    formText = formText[1];

    let input = $editButton.prev();
    let inlineText = input.prev();
    inlineText.hide();
    input.val(formText);
    input.show();

    $okButton.on('click', () => {
        input.hide();
        $okButton.hide();
        $editButton.show();

        if (input.val().trim().length >= 3) {
            inlineText.text(input.val().trim());
        }
        inlineText.show();
    });

    let updateBtn = $(li.lastElementChild).prev();
    updateBtn.show();

    $(updateBtn).on('click', (event) => {
        event.preventDefault();
        let currentBtn = $(event.target).hide();
        cancelButton.hide();
        $okButton.hide();
        input.hide();
        inlineText.show();
        $editButton.show();

        let currentId = $(li)[0].id;
        let ownerId = $(li).children()[5].innerText;
        let ownerAddress = $(li).children()[6].innerText.split(':')[1];
        let ownerPhone = $(li).children()[7].innerText.split(':')[1];
        let checkUp = $(li).children()[8].innerText.split(':')[1];

        $.ajax({
            method: "PUT",
            url: "/animals",
            contentType: "application/json",
            data: JSON.stringify({
                _id: currentId,
                ownerId: ownerId,
                ownerAddress: ownerAddress,
                ownerPhone: ownerPhone,
                checkUp: checkUp,
            })
        })
    });

    let cancelButton = $(updateBtn).prev().show();

    cancelButton.on('click', (event) => {
        event.preventDefault();
        let $cancelButton = $(event.target);
        $cancelButton.next().hide();
        $cancelButton.hide();
        input.hide();
        inlineText.show();
        $editButton.show();
        $okButton.hide();
    })
});