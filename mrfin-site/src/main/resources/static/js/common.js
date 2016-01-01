var Currencies = [
    {text: 'UAH - Ukrainian Hryvnia', value: 'UAH'},
    {text: 'USD - US Dollar', value: 'USD'},
    {text: 'EUR - Euro', value: 'EUR'},
    {text: 'RUR - Russian Ruble', value: 'RUR'},
    {text: 'BTC - Bitcoin', value: 'BTC'}
];

var initialCurrenciesListSrc = getCurrenciesList(Currencies.filter(function (elem, index) {
    return index != 1
}));
var initialCurrenciesListDst = getCurrenciesList(Currencies.filter(function (elem, index) {
    return index != 0
}));

$(document).ready(function () {
    var srcValue = '', dstValue = '', srcAmountValue = '';
    $(function() {
        $( "#dialog-message" ).dialog({
            modal: true,
            autoOpen: false,
            buttons: {
                Ok: function() {
                    $( this ).dialog( "close" );
                }
            }
        });
    });

    $('#srcCurrency').on('change', function () {
        var value = $(this).val();
        filteredList = Currencies.filter(function (elem) {
            return elem.value != value;
        });

        updateSelect($('#dstCurrency'), dstValue, filteredList);
        srcValue = value;
    });

    $('#dstCurrency').on('change', function () {
        var value = $(this).val(),
            filteredList = Currencies.filter(function (elem) {
                return elem.value != value;
            });

        updateSelect($('#srcCurrency'), srcValue, filteredList);
        dstValue = value;
    });

    $('#srcAmount').on('change', function () {
        $('#srcAmount').parent().removeClass('has-error');
        srcAmountValue = $(this).val();
    });

    $('#replaceCurrencies').on('click', function () {
        var temp = srcValue,
            newItemsList = [];

        srcValue = dstValue;
        dstValue = temp;

        newItemsList = Currencies.filter(function (elem) {
            return elem.value != dstValue;
        });

        updateSelect($('#srcCurrency'), srcValue, newItemsList);

        newItemsList = Currencies.filter(function (elem) {
            return elem.value != srcValue;
        });

        updateSelect($('#dstCurrency'), dstValue, newItemsList);

    });

    $('#btnSignUp').on('click', function () {
        var formValid = true;
        $('input').each(function() {
            var formGroup = $(this).parents('.form-group');
            var glyphicon = formGroup.find('.form-control-feedback');
            var name = this.name;
            if (name == "confirmPassword") {
                var password = $('#password').val();
                console.log(password);
                var confirmPassword = $('#confirmPassword').val();
                console.log(confirmPassword);
                if (password != confirmPassword) {
                    document.getElementById('confirmPassword').setCustomValidity("Passwords Don't Match");
                } else {
                    document.getElementById('confirmPassword').setCustomValidity("");
                }
            }
            if (this.checkValidity()) {
                formGroup.addClass('has-success').removeClass('has-error');
                glyphicon.addClass('glyphicon-ok').removeClass('glyphicon-remove');
            } else {
                formGroup.addClass('has-error').removeClass('has-success');
                glyphicon.addClass('glyphicon-remove').removeClass('glyphicon-ok');
                formValid = false;
            }
        });
        if (formValid) {
            var firstName = $('#firstName').val();
            var user = {
                "firstName": firstName,
                "lastName": $('#lastName').val(),
                "login": $('#login').val(),
                "email": $('#email').val(),
                "password": $('#password').val()
            };
            var urlRouter = $('#router_url').val();
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: urlRouter,
                dataType: "json",
                data: JSON.stringify(user),
                success: function(data, textStatus, jqXHR){
                    $('#myModal').modal('hide');
                    $('#success-alert').find('#firstNameLabel').text(firstName);
                    $('#success-alert').removeClass('hidden');
                },
                error: function(jqXHR, textStatus, errorThrown){
                    $('#myModal').modal('hide');
                    $('#error-alert').removeClass('hidden');
                }
            });
        }
    });

    $('#convertCurrencyButton').on('click', function () {
        var pattern = /^\d*$/;

        if (srcAmountValue.length == 0 || !pattern.test(srcAmountValue)) {
            $('#srcAmount').parent().addClass('has-error');
            $("#title-error").text("Incorrect format or value of 'Currency I have'.");
            $("#dialog-message").dialog("open");
            return;
        }

        var urlRouter = $('#router_url').val() + '/convert/' + srcValue + '/' + dstValue + '/' + srcAmountValue;

        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: urlRouter,
            dataType: "json",
            success: function(data, textStatus, jqXHR){
                if (data.status == 200) {
                    $('#dstAmount').val(data.convertedAmount);
                } else {
                    $("#title-error").text(data.message);
                    $("#dialog-message").dialog("open");
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                $("#title-error").text("Error of server.");
                $("#dialog-message").dialog("open");
            }
        });
    });

    srcValue = $('#srcCurrency').html(initialCurrenciesListSrc).val();

    dstValue = $('#dstCurrency').html(initialCurrenciesListDst).val();
});

function updateSelect($this, select, currencies) {
    var list = getCurrenciesList(currencies),
        elem = "[value = " + select + "]";

    $this.html(list);
    $this.children(elem).attr("selected", "selected");
}

function getCurrenciesList(array) {
    var list = array.map(function (elem) {
        var elem = new Option(elem.text, elem.value);
        return elem;
    });

    return list;
}