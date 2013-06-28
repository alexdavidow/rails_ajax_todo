class Task < ActiveRecord::Base
  attr_accessible :desc, :duedate, :name, :priority_id

  belongs_to :priority

  def arrow_up
    current_urgency = self.priority.urgency_index

    higher_priorities = Priority.where('urgency_index > ?', current_urgency)
    if higher_priorities.any?
      self.priority = higher_priorities.first(order: 'urgency_index ASC')
      self.save
    end
    self.priority
  end

  def arrow_down
    current_urgency = self.priority.urgency_index

    lower_priorities = Priority.where('urgency_index < ?', current_urgency)
    if lower_priorities.any?
      self.priority = lower_priorities.first(order: 'urgency_index DESC')
      self.save
    end
    self.priority
  end
end
