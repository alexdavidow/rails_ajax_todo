class HomeController < ApplicationController
  def index
    @tasks = Task.all
    @priorities = Priority.all
  end
end
