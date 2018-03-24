Rails.application.routes.draw do
  # Application routes
  root "pages#index"

  ["admin", "contact", "downloads", "links", "values"].each do |path|
    get path, to: "pages#index"
  end

  get "discourse/sso", to: "discourse_sso#sso"
  get "edit-user", to: "users#edit", as: :edit_user
  get "sign-in", to: "sessions#new", as: :sign_in
  get "sign-out", to: "sessions#edit", as: :sign_out
  get "sign-up", to: "users#new", as: :sign_up

  namespace :admin do
    resources :events, only: [:edit, :index, :new, :show]
    resources :users, only: [:index, :show]
  end

  resources :account_confirmations, only: [:edit]
  resources :characters, only: [:edit, :index, :new, :show] do
    resources :backstory, only: [:index]
  end
  resources :events, only: [:index, :show] do
    ["register", "volunteer"].each do |path|
      get path, to: "bookings#new"
    end
  end
  resources :password_resets, only: [:edit, :new]

  # API routes
  namespace :api do
    namespace :v1 do
      namespace :admin do
        resources :events, only: [:create, :destroy, :index, :update]
        resources :users, only: [:index, :show]
      end
      resources :account_confirmations, only: [:create]
      resources :backstories, only: [:create]
      resources :bookings, only: [:create, :destroy]
      resources :characters, only: [:create, :edit, :index, :show, :update]
      resources :client_token, only: [:index]
      resources :headers, only: [:index]
      resources :events, only: [:index]
      resources :password_resets, only: [:create, :update]
      resources :sessions, only: [:create, :destroy]
      resources :users, only: [:create, :update] do
        collection do
          resources :current, only: :index
        end
      end
    end
  end
end
