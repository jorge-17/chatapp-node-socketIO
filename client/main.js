//var socket = io.connect('http://172.16.110.61:6677', { 'forceNew': true });
var socket = io.connect('https://chatapp-bla.herokuapp.com/', { 'forceNew': true });
//var socket = io.connect('http://chatappbla-env.cmh7qhnvau.us-east-2.elasticbeanstalk.com/', { 'forceNew': true });
socket.on('messages', function (data) {
    console.log(data);
    render(data);
});
var cont = 1;

function render(data) {
    var html = data.map(function (message, index) {
        return (`
            <div class="message" id="${message.nickname}">
            <strong>${message.nickname}: </strong><label>${message.time}</label>
            <p>${message.text}</p>
            </div>
        `);

    }).join('');
    document.getElementById('audio').play();
    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function GetDate() {
    var fecha = new Date();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var time = hora + ":" + minutos;

    return time;
}


function addMessage(e) {
    var time = GetDate();
    var nickname = document.getElementById('nickname').value;
    document.getElementById('user').innerHTML = nickname;
    document.getElementById('user').style.display = 'inline-block';

    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value,
        time: time
    };

    document.getElementById('nickname').style.display = 'none';
    document.getElementById('lbl_nickname').style.display = 'none';

    socket.emit('add-message', message);
    document.getElementById("text").value = "";
    return false;
}

$(document).ready(function () {
    $("#text").emojioneArea({
        pickerPosition: "right",
        tonesStyle: "bullet"
    })
})


/*$(function() {
    // Initializes and creates emoji set from sprite sheet
    window.emojiPicker = new EmojiPicker({
      emojiable_selector: '[data-emojiable=true]',
      assetsPath: 'lib/img/',
      popupButtonClasses: 'fa fa-smile-o'
    });
    // Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
    // You may want to delay this step if you have dynamically created input fields that appear later in the loading process
    // It can be called as many times as necessary; previously converted input fields will not be converted again
    window.emojiPicker.discover();
  });*/


$("#btnSubmit").prop('disabled', true);
$("#text").keyup(function () {
    if ($(this).val() != "") {
        $("#btnSubmit").prop('disabled', false);
    }
});

