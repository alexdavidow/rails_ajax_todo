Ajaxtodo::Application.routes.draw do
  root :to => 'home#index'

  resources :priorities, only: [:new, :create]

  resources :tasks do
    member do
      put :arrow_up
      put :arrow_down
    end
  end  
end
