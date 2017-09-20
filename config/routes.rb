Rails.application.routes.draw do
  root "pages#index"

  get "edit-user", to: "users#edit", as: :edit_user
  get "sign-in", to: "sessions#new", as: :sign_in
  get "sign-out", to: "sessions#edit", as: :sign_out
  get "sign-up", to: "users#new", as: :sign_up

  namespace :api do
    namespace :v1 do
      resources :account_confirmations, only: [:create]
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
  resources :password_resets, only: [:edit, :new]
end
