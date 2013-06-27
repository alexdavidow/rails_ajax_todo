var sort_column;

function add_node(task) {
  task_name = task.children('.name').text();
  task_urgency = task.children('.ui').text();
  var row_list = $('#tasks tbody').children();

  for(var i=0; i< row_list.size(); i++){
    node = $(row_list[i]);
    node_name = node.children('.name').text();
    node_urgency = node.children('.ui').text();

    if (task_urgency > node_urgency) {
      task.insertBefore(node);
      return;
    } else if ((task_urgency == node_urgency) && task_name < node_name){
      task.insertBefore(node);
      return;
    }
  }
  $('#tasks tbody').append(task);
}
// Client side to sort based on any column. Put old commented out functions in lib/tasks
function sort_by_column(a, b) {
  col_a = $(a).children('.' + sort_column).text();
  col_b = $(b).children('.' + sort_column).text();
  if (col_a > col_b) {
    return 1;
  } else if (col_a < col_b) {
    return -1;
  } else {
    return 0;
  }
}

function bind_column_sort_action_to(link_element) {
  link_element.on('click', function(e){
     e.preventDefault();
    //grabs everything but the '_sort' from the link's id and sets the sort_column variable to that prefix for use in sort_by_column
    var sort_id = $(this).attr('id');
    var id_prefix = sort_id.substr(0, sort_id.length - 5);
    sort_column = id_prefix;

    sorted = $('#tasks tbody tr').sort(sort_by_column);
    $('#tasks tbody').empty().append(sorted);
  });
}

function bind_edit_button_to(edit_button) {
  edit_button.on('click', function(e) {
    e.preventDefault();
    var task_id = $(this).data('id');
    $('#edit-submit').attr('data-id', task_id)
    var task_row = $(this).parent().parent();
    
    var name = task_row.find('.name').text()
    $('#task_name').val(name.trim())

    var description = task_row.find('.desc').text()
    $('#task_desc').val(description.trim())

    var duedate = task_row.find('.duedate').text()
    $('#task_duedate').val(duedate.trim())

    var priority_id = task_row.find('.priority-id').text()
    $('#task_priority_id option[value=' + priority_id +']').prop('selected', true);
  });
}


function bind_update_button(update_button) {
  update_button.on('click', function(e) {
    e.preventDefault();

    var settings = {
                  task: {
                    name: $('#task_name').val(),
                    desc: $('#task_desc').val(),
                    duedate: $('#task_duedate').val(),
                    priority_id: $('#task_priority_id').val(),
                    task_id: $(this).data('id')
                  }
    };
    $.ajax({
      type: 'PUT',
      data: settings,
      url: '/tasks/'+ $(this).data('id'),
      success: function(data) {
      var task = $('<tr>').css('background-color', data.priority.color);
      $('<td class="name">').text(data.task.name).appendTo(task);
      $('<td class="desc">').text(data.task.desc).appendTo(task);
      $('<td class="duedate">').text(data.task.duedate).appendTo(task);
      $('<td class="ui">').text(data.priority.urgency_index).appendTo(task);
      $('<td class="priority-id">').text(data.priority.id).hide().appendTo(task);

      // Need to add a td with the buttons when creating a new entry.
      var data_cell_options = $('<td>').addClass('options');
      var edit_button = $('<a>').attr('href', '#').text('Edit').addClass('small button edit-button info');
      var delete_button = $('<a>').attr('href', '#').text('Delete').addClass('small button delete-button');
      //  add data id to our delete buttong
      delete_button.attr('data-id', data.task.id)
      edit_button.attr('data-id', data.task.id)
      data_cell_options.append(delete_button)
      data_cell_options.append(edit_button)

      task.append(data_cell_options)
      //bind the delete functionality to the newly created button
      bind_delete_button_action_to(delete_button)
      bind_update_button(update_button)
      add_node(task)
      }
    })
  });
}  
// Activates the event handler binding to the delete buttons in the table. 
function bind_delete_button_action_to(link_element) {
  //takes a jQuery element name 'link_element' and then applies an .on() etc. on it
  // console.log('Works!')

  link_element.on('click', function(e){
    e.preventDefault();

    var id_of_task = $(this).data('id');
    // $(this) refers to the button that was clicked
    var task_row = $(this).parent().parent();

    $.ajax({
        type: 'DELETE',
        url: id_of_task,
        success: function(data){
            console.log('Ajax transmitted.  Heres the data');
            console.log(data);
             // function that hides the deleted task
            task_row.animate({
              backgroundColor: 'red'
            }, 300, function(){
              $(this).fadeOut(300);
            });
        }
    });
    return link_element;
  });
}

function bind_task_create_to(submit_element){
  submit_element.on('click', function(e) {
    //prevents the default behavior of the form, i.e. submitting the form
    //Notice that if this file fails to load or your syntax errors, you will not prevent the default and
    // clicking submit will render a new page with your data on it
    e.preventDefault();

    var settings = {
      task: {
        name: $('#task_name').val(),
        desc: $('#task_desc').val(),
        duedate: $('#task_duedate').val(),
        priority_id: $('#task_priority_id').val()
      }
    };

    $.post('/tasks', settings, function(data){
      // To show the data id
      // console.log(data.task.id)
      var task = $('<tr>').css('background-color', data.priority.color);
      $('<td class="name">').text(data.task.name).appendTo(task);
      $('<td class="desc">').text(data.task.desc).appendTo(task);
      $('<td class="duedate">').text(data.task.duedate).appendTo(task);
      $('<td class="ui">').text(data.priority.urgency_index).appendTo(task);
      $('<td class="priority-id">').text(data.priority.id).hide().appendTo(task);

      // Need to add a td with the buttons when creating a new entry.
      var data_cell_options = $('<td>').addClass('options');
      var delete_button = $('<a>').text('Delete').attr('data-id', data.task.id).attr('href', '#').addClass('button delete-button small alert').appendTo(data_cell_options);
      var edit_button = $('<a>').text('Edit').attr('data-id', data.task.id).attr('href', '#').addClass('button edit-button small').appendTo(data_cell_options);
      task.append(data_cell_options)
      //bind the delete functionality to the newly created button

      add_node(task);
      bind_delete_button_action_to($('.delete-button'));
      $('#new_task input[type=text]').val('');
    });
  });
}
$(function(){ 

  //When any of the th links is clicked, sorts by the relevant field. I have refactored this to only be a single event handler
  //by grabbing the field title out of the link's id. A little dangerous because if I change my HTML much it breaks my JS
  var table_headers = $('th a');
  bind_column_sort_action_to(table_headers);

  //When the user clicks on the form's submit button, creates a new task and displays it in the table of tasks, sorted by priority.urgency_index
  var task_form_submit = $('#submit');
  bind_task_create_to(task_form_submit);
  //Call our bind function and bind onclick action to delete butons
  var delete_button_elements = $('.delete-button');
  bind_delete_button_action_to(delete_button_elements);

  var edit_button = $('.edit-button');
  bind_edit_button_to(edit_button);

  var update_button = $('#edit-submit');
  bind_update_button(update_button);
});