Ajaxtodo::Application.routes.draw do
  root :to => 'home#index'
  resources :tasks, only: [:new, :index, :create, :update, :destroy]
  resources :priorities, only: [:new, :create]
end
