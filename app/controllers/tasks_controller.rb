class TasksController < ApplicationController
	def new
		@task = Task.new
		@tasks = Task.joins(:priority).order('priorities.urgency_index DESC, name ASC' )
		@priorities = Priority.all
	end

	def create
		@task = Task.new(params[:task])
		@task.save!
		@task['color'] = @task.priority.color
		render json: {task: @task, priority: @task.priority}
	end

	def index
		@tasks = Task.all
	end

	def update
		@task = Task.find(params[:id])
		@task.save!
		render text: "I made it"
		if @task.update_attributes(params[:task])
			render json: {task: @task, desc: @task.desc, duedate: @task.duedate, urgency_index: @task.priority.urgency_index, color: @task.priority.color}
		else
			render text: "This didn't work. You could blame me but isn't it your fault for trying?"	
		end
	end

	def destroy
		# get the id of the item we wish to destroy
		task = Task.find(params[:id])
		task.destroy 
		# need to delete it from the database
		# need to render some sort of response or redirect
		render json: task
	end
end