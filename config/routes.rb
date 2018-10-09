Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  resources :trades
  resources :stocks
  resources :users
  resources :balance, only: :update
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
