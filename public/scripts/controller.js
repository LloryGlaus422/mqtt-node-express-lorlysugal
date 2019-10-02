var btnConnect = document.getElementById('btn-connect')
var btnPublish = document.getElementById('btn-publish')
var btnSubscribe = document.getElementById('btn-Subscribe')
var btnUnsubscribe = document.getElementById('btn-Unsubscribe')
var btndisconnect = document.getElementById('btn-disconnect')
var client = null;


// Connect
btnConnect.addEventListener('click', function (e) {
  e.preventDefault();
  var timestamp = null;
  var address = $("#address").val();
  $('#Stat').text('Connecting........');
  client = mqtt.connect(address)
  client.on("connect", function () {
    $('#Stat').text('Connected');
    console.log('Connected to ' + address);
    console.log('Successfully Connected!')
  })



  // Disconnect
  btndisconnect.addEventListener('click', function (e) {
    client.disconnect($("#address").val());
    client.on("connect", function () {
      $('#Stat').text('Disconnected');
      console.log('Disconnected');
    })
  })

  // Subscribe
  btnSubscribe.addEventListener('click', function (e) {
    e.preventDefault();
    var sub = $("#sub").val();
    // topic.push(sub);
    client.subscribe(sub);
    console.log('Subscribe to Topic: '+sub);
  })

  // Unsubscribe
  btnUnsubscribe.addEventListener('click', function (e) {
    e.preventDefault();
    client.unsubscribe($("#Topic").val());
    console.log('Unsubscribe to topic: '+ $("#sub").val());
  })

  // Publish
  btnPublish.addEventListener('click', function (e) {
    e.preventDefault(); 
      var top1 = $("#Topic").val();
      var payload1 = $("#Payload").val();
      client.publish(top1, payload1)
      console.log('Published:'+ '(Topic :'+top1+' ; '+ 'Payload: '+ payload1+')');
  })

  // Message
  client.on("message", function (topic, payload) {
    var tr = $("<tr>")
    timestamp = moment().format('MMMM D YYYY , h:mm:ss a');
    $("<td>").text(topic).appendTo($(tr))
    $("<td>").text(payload).appendTo($(tr))
    $("<td>").text(timestamp).appendTo($(tr))
    $("tbody").append($(tr))
  })
})