class PrioritiesController < ApplicationController

  def new
    @priority = Priority.new
    @priorities = Priority.all
    @tasks = Task.all
  end

  def create
    @priority = Priority.new(params[:priority])
    @priority.save!
    render :json => @priority  
  end

end
