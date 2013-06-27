class Task < ActiveRecord::Base
  attr_accessible :desc, :duedate, :name, :priority_id, :task_id

  belongs_to :priority
end
