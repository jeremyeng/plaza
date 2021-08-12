Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    defaults format: :json do
      namespace :v1 do
        resources :posts
      end
    end
  end

  get "*posts", to: "posts#index"

  root "home#index"
end
