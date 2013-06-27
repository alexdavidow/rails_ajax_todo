// function sort_by_desc(a, b) {
//   desc_a = $(a).children('.desc').text();
//   desc_b = $(b).children('.desc').text();
//   if (desc_a > desc_b){
//     return 1;
//   } else if (desc_a < desc_b) {
//     return -1;
//   } else {
//     return 0;
//   }
// }
// function sort_by_name(a, b) {
//   name_a = $(a).children('.name').text();
//   name_b = $(b).children('.name').text();
//   if (name_a > name_b){
//     return 1;
//   } else if (name_a < name_b) {
//     return -1;
//   } else {
//     return 0;
//   }
// }

// function sort_by_urgency(a, b) {
//   ui_a = $(a).children('.ui').text();
//   ui_b = $(b).children('.ui').text();
//   if (ui_a < ui_b){
//     return 1;
//   } else if(ui_a > ui_b) {
//     return -1;
//   } else {
//     return 0;
//   }
// }

// function sort_by_duedate(a, b) {
//   dd_a = $(a).children('.duedate').text();
//   dd_b = $(b).children('.duedate').text();
//   if (dd_a < dd_b){
//     return 1;
//   } else if(dd_a > dd_b) {
//     return -1;
//   } else {
//     return 0;
//   }
// }

// function bind_edit_button(edit_button) {
//   edit_button.on('click', function(e){
//     var task_id = $(this).data('id')
//     $('#edit-submit').attr('data-id', task_id)
//     var task_row = $(this).parent().parent();
   
//     var name = task_row.find('.name').text()
//     $('#task_name').val(name.trim())

//     var description = task_row.find('.desc').text()
//     $('#task_desc').val(description.trim())

//     var duedate = task_row.find('.duedate').text()
//     $('#task_duedate').val(duedate.trim())

//     // var urgency = task_row.find('.ui').text()
//     // $('#task_priority_id').val(urgency.trim())
//     // The below works the same as the two lines above, but better b/c no errors. 
//     var priority_id = task_row.find('.priority-id').text()
//     $('#task_priority_id option[value=' + priority_id +']').prop('selected', true);

//     // _.each(['name', 'desc', 'duedate'], function(attr_name){
//     //   $('#task_' + attr_name).val(task_row.children('.' + attr_name).text().trim()
//     // })
//     $('#submit').addClass('hidden');
//     $('#edit-submit').removeClass('hidden');
//   })
// }

  // Client side to sorting based on columns
  // $('#name').on('click', function(e){
  //   e.preventDefault();
  //   sorted_name = $('tbody tr').sort(sort_by_name);
  //   $('tbody').empty().append(sorted_name);
  // });

  // $('#description').on('click', function(e){
  //   e.preventDefault();
  //   sorted_desc = $('tbody tr').sort(sort_by_desc);
  //   $('tbody').empty().append(sorted_desc);
  // });

  // $('#duedate').on('click', function(e){
  //   e.preventDefault();
  //  sorted_dd = $('tbody tr').sort(sort_by_duedate);
  //   $('tbody').empty().append(sorted_dd);
  // });

  // $('#ui').on('click', function(e){
  //   e.preventDefault();
  //   sorted_urgency = $('tbody tr').sort(sort_by_urgency);
  //   $('tbody').empty().append(sorted_urgency);
  // });   