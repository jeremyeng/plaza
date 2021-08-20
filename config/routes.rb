Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    defaults format: :jsonapi do
      namespace :v1 do
        resources :posts, only: [:index, :show, :create, :update, :destroy]
      end
    end
  end

  get "*posts", to: "posts#index"

  root "home#index"
end
