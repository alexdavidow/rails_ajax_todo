class TasksController < ApplicationController
	
	before_filter :ordered_tasks, only: [:new, :update]

	def new
		@task = Task.new
		@priorities = Priority.all
	end

	def create
		@task = Task.new(params[:task])
		@task.save!
		render json: {task: @task, priority: @task.priority}
	end

	def index
		@tasks = Task.all
	end

	def update
		@task = Task.find(params[:id])
		if @task.update_attributes(params[:task])
			# render json: {task: @task, priority: @task.priority}
			respond_to do |format|
				format.js
			end
		else
			respond_to do |format|
				format.js { render status: 500, text: 'Server error'}
			end
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

	def arrow_up
		@task = Task.find(params[:id])
		@task.arrow_up
		render json: @task.priority
	end

	def arrow_down
		@task = Task.find(params[:id])
		@task.arrow_down
		render json: @task.priority
	end

	private
	def ordered_tasks
		@tasks = Task.joins(:priority).order('priorities.urgency_index DESC, name ASC' )
	end
end

