$(function(){
  $('#get_priority').on('click', function(e){
    //prevents the default behavior of the form, i.e. submitting the form
    e.preventDefault();

    var settings = {
                    priority: {
                      name: $('#priority_name').val(),
                      urgency_index: $('#priority_urgency_index').val(),
                      color: $('#priority_color').val()
                    }
                   }

    $.post('/priorities', settings, function(data){
      var priority = $('<tr>');
      $('<td>').text(data.name).appendTo(priority);
      $('<td>').text(data.urgency_index).appendTo(priority);
      $('<td>').text(data.color).appendTo(priority);
      $('<td>').css('background-color', data.color).appendTo(priority);
      $('#list tbody').append(priority)
      $('#priority_name').val('')
      $('#priority_urgency_index').val('')
      $('#priority_color').val('')
    });
  });    
})