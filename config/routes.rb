Rails.application.routes.draw do
  root "pages#index"

  ["admin", "contact", "values"].each do |path|
    get path, to: "pages#index"
  end

  get "edit-user", to: "users#edit", as: :edit_user
  get "sign-in", to: "sessions#new", as: :sign_in
  get "sign-out", to: "sessions#edit", as: :sign_out
  get "sign-up", to: "users#new", as: :sign_up

  namespace :admin do
    resources :events, only: [:edit, :index, :new]
  end

  namespace :api do
    namespace :v1 do
      namespace :admin do
        resources :events, only: [:create, :destroy, :index, :update]
      end
      resources :account_confirmations, only: [:create]
      resources :bookings, only: [:create]
      resources :client_token, only: [:index]
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

  resources :account_confirmations, only: [:edit]
  resources :events, only: [:index, :show] do
    get "register", to: "bookings#new"
  end
  resources :password_resets, only: [:edit, :new]
end
