Task.delete_all
Priority.delete_all

# t = Task.new
# t.save!
p1 = Priority.create(name: 'Very Urgent', urgency_index: 3, color: 'red')
p2 = Priority.create(name: 'Somewhat Urgent', urgency_index: 2, color: 'yellow')
p3 = Priority.create(name: 'Not Very Urgent', urgency_index: 1, color: 'green')

t1 = Task.create(desc: 'Do the dishes', duedate: '2013-06-25', name: 'Dishes', priority_id: p2.id)
t2 = Task.create(desc: 'Finish all hw and reading', duedate: '2013-06-25', name: 'HW', priority_id: p1.id)
t3 = Task.create(desc: 'Find a job that makes me happy', duedate: '2013-08-25', name: 'Get Work', priority_id: p3.id)
  

