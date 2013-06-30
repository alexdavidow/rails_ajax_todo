var sort_column = 'ui';

function add_node(task) {
  // task_name = task.children('.name').text();
  // task_urgency = task.children('.priority-id').text();
  // var row_list = $('#tasks tbody').children();

  // for(var i = 0; i< row_list.size(); i++){
  //   node = $(row_list[i]);
  //   node_name = node.children('.name').text().trim();
  //   node_urgency = node.children('.priority-id').text().trim();

  //   if (task_urgency > node_urgency) {
  //     task.insertBefore(node);
  //     return;
  //   } else if ((task_urgency == node_urgency) && task_name < node_name){
  //     task.insertBefore(node);
  //     return;
  //   }
  // }
  $('#tasks tbody').append(task);
  sort_rows();
}

//Called when one of the header cells is clicked, figures out which sorting that cell corresponds to (by doing some tricky
// string manipulation), and then calls the sort_rows function to actually perform the sorting
function sort_table(e) {
   e.preventDefault();
  //grabs everything but the '_sort' from the link's id and sets the sort_column variable to that prefix for use in column_compare
  var sort_id = $(this).attr('id');
  var id_prefix = sort_id.substr(0, sort_id.length - 5);
  sort_column = id_prefix;

  sort_rows();
}
// Client side to sort based on any column. Put old commented out functions in lib/tasks
function sort_rows() {
  sorted = $('#tasks tbody tr').sort(column_compare);
  $('#tasks tbody').empty().append(sorted);
}

// A comparison function for two rows of a table, comparing them by a td with a shared class. This used to be
// called sort_by_column, but was renamed because it compares two rows -- it does not sort
function column_compare(a, b) {
  col_a = $.trim($(a).children('.' + sort_column).text());
  col_b = $.trim($(b).children('.' + sort_column).text());

  // If the table is being sorted by urgency index, turns the values into integers so they get compared correctly.
  // Strings of integers get compared strangely (e.g. '1' < '11' < '2' < '22' < '3')
  if(sort_column === 'ui'){
    col_a = parseInt(col_a);
    col_b = parseInt(col_b);
  }

  //Sorts ascending unless the sorting is being done by urgency index, in which case it is descending
  if (col_a < col_b) {
    return sort_column === 'ui' ? 1 : -1;
  } else if (col_a > col_b) {
    return sort_column === 'ui' ? -1 : 1;
  } else {
    return 0;
  }
}

function populate_form(e) {
  e.preventDefault();
  var task_row = $(this).parent().parent();
  var task_id = task_row.attr('data-task-id');

  var name = $.trim(task_row.find('.name').text());
  var desc = $.trim(task_row.find('.desc').text());
  var duedate = $.trim(task_row.find('.duedate').text());
  var ui = $.trim(task_row.find('.ui').text());
  var priority_id = $.trim(task_row.find('.priority-id').text());
  
  $('#task_name').val(name);
  $('#task_desc').val(desc);
  $('#task_duedate').val(duedate);
  $('#task_priority_id option[value=' + priority_id +']').prop('selected', true);

    // _.each(['name', 'desc', 'duedate'], function(attr_name){
    // $('#task_' + attr_name).val(task_row.children('.' + attr_name).text().trim())
    // });
  $('#submit').addClass('hidden');
  $('#edit-submit').removeClass('hidden');
  $('#edit-submit').attr('data-task-id', task_id);
}


function bind_update_button(update_button) {
  update_button.off() // prevents double binding
  update_button.on('click', function(e) {
    e.preventDefault();
    var task_id = $(this).data('task-id')
    var settings = {
                  task: {
                    name: $('#task_name').val(),
                    desc: $('#task_desc').val(),
                    duedate: $('#task_duedate').val(),
                    priority_id: $('#task_priority_id').val(),
                  }
    };
    $.ajax({
      type: 'PUT',
      url: '/tasks/'+ task_id,
      data: settings,
      dataType: 'script'
    });
    $('#new_task input[type=text]').val('');
    $('#task_priority_id').val('');
    $('#submit').removeClass('hidden');
    $('#edit-submit').addClass('hidden')  
  });
}  
// Activates the event handler binding to the delete buttons in the table. 
function bind_delete_button_action_to(link_element) {
  //takes a jQuery element name 'link_element' and then applies an .on() etc. on it
  // console.log('Works!')

  link_element.on('click', function(e){
    e.preventDefault();
    // $(this) refers to the button that was clicked
    var task_row = $(this).parent().parent();
    var id_of_task = task_row.data('task-id');

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

function create_task(e){
  e.preventDefault();
  var params = {
    task: {
      name: $('#task_name').val(),
      desc: $('#task_desc').val(),
      duedate: $('#task_duedate').val(),
      priority_id: $('#task_priority_id').val()
    }
  };

  $.post('/tasks', params, function(data){
    // To show the data id
    // console.log(data.task.id)
    var task = $('<tr>').css('background-color', data.priority.color).attr('task-id', data.task.id);
    //Add the arrow buttons
    $('<td class="name">').text(data.task.name).appendTo(task);
    $('<td class="desc">').text(data.task.desc).appendTo(task);
    $('<td class="duedate">').text(data.task.duedate).appendTo(task);
    $('<td class="ui">').text(data.priority.urgency_index).appendTo(task);
    $('<td class="priority-id">').text(data.priority.id).hide().appendTo(task);

    // Need to add a td with the buttons when creating a new entry.
    var data_cell_options = $('<td>').addClass('options');
    var delete_button = $('<a>').text('Delete').attr('data-task-id', data.task.id).attr('href', '#').addClass('button delete-button small alert').appendTo(data_cell_options);
    var edit_button = $('<a>').text('Edit').attr('data-task-id', data.task.id).attr('href', '#').addClass('button edit-button small').appendTo(data_cell_options);
    task.append(data_cell_options)
    // Adding arrows
    var arrows = $('<td>');
    var up_arrow_link = $('<a>').attr('href', '#').appendTo(arrows);
    var up_arrow = $('<i>').addClass('general foundicon-up-arrow').appendTo(up_arrow_link);
    var down_arrow_link = $('<a>').attr('href', '#').appendTo(arrows);
    var down_arrow = $('<i>').addClass('general foundicon-down-arrow').appendTo(down_arrow_link);
    arrows.appendTo(task);
    //bind the delete functionality to the newly created button
    add_node(task);
    // bind_delete_button_action_to($('.delete-button'));
    $('#new_task input[type=text]').val('');
    $('#task_priority_id').val('');
  }); 
}

function arrow_up(e) {
  e.preventDefault();
  var task_row = $(this).parent().parent();
  var task_id = task_row.data('task-id');

  $.ajax({
    type: 'PUT',
    url: '/tasks/' + task_id + '/arrow_up'
  }).success(function(data){
    console.log(data.color)
    var task_row = $('#tasks tr[data-task-id=' + task_id + ']');
    task_row.children('td.priority-id').text(data.id);
    task_row.children('td.ui').text(data.urgency_index);
    task_row.css('background-color',data.color);
    console.log("task row is", task_row.attr('style'))
    sort_rows();
  })
}

function arrow_down(e) {
  e.preventDefault();
  var task_row = $(this).parent().parent();
  var task_id = task_row.data('task-id');

  $.ajax({
    type: 'PUT',
    url: '/tasks/' + task_id + '/arrow_down'
  }).success(function(data){
    console.log(data.color)
    var task_row = $('#tasks tr[data-task-id=' + task_id + ']');
    task_row.children('td.priority-id').text(data.id);
    task_row.children('td.ui').text(data.urgency_index);
    //this works, but there is now animation
    task_row.css('background-color',data.color);
    // task_row.animate({backgroundColor: data.color});
    // add a 'style' attr with the data.color value
    // task_row.attr('style','backgroundColor: '+data.color);
    sort_rows();
  });
}

$(function(){
  //When any of the th links is clicked, sorts by the relevant field. I have refactored this to only be a single event handler
  //by grabbing the field title out of the link's id. A little dangerous because if I change my HTML much it breaks my JS
  $('th a').on('click', sort_table);

  //When the user clicks on the form's submit button, creates a new task and displays it in the table of tasks, sorted by priority.urgency_index
  $('#submit').on('click', create_task);

  //Call our bind function and bind onclick action to delete butons
  var delete_button_elements = $('.delete-button');
  bind_delete_button_action_to(delete_button_elements);

  $('tbody').on('click', '.edit-button', populate_form)

  var update_button = $('#edit-submit');
  bind_update_button(update_button);

  $('tbody').on('click', '.up-arrow-link', arrow_up);
  $('tbody').on('click', '.down-arrow-link', arrow_down);
});