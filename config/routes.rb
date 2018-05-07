Rails.application.routes.draw do
  # Application routes
  root "pages#index"

  ["admin", "between-events", "contact", "downloads", "links", "values"].each do |path|
    get path, to: "pages#index"
  end

  get "discourse/sso", to: "discourse_sso#sso"
  get "edit-user", to: "users#edit", as: :edit_user
  get "sign-in", to: "sessions#new", as: :sign_in
  get "sign-out", to: "sessions#edit", as: :sign_out
  get "sign-up", to: "users#new", as: :sign_up

  namespace :admin do
    resources :award_character_points, only: [:index]
    resources :characters, only: [:index, :show] do
      resources :backstories, only: [:index]
      resources :sheets, only: [:index]
    end
    resources :events, only: [:edit, :index, :new, :show] do
      get "check-in", to: "check_ins#index", as: :check_ins
      resources :envelopes, only: [:index]
      resources :pels, only: [:index, :show]
      resources :reports, only: [:index]
      resources :self_reports, only: [:index]
      resources :sheets, only: [:index]
    end
    resources :users, only: [:index, :show]
  end

  resources :account_confirmations, only: [:edit]
  resources :characters, only: [:edit, :index, :new, :show] do
    resources :backstory, only: [:index]
    resources :build_logs, only: :index
  end
  resources :events, only: [:index, :show] do
    ["register", "volunteer"].each do |path|
      get path, to: "bookings#new"
    end
    get "lodging-questionnaire", to: "lodgings#new"
  end
  resources :password_resets, only: [:edit, :new]
  resources :pels, only: [:new, :show]

  # API routes
  namespace :api do
    namespace :v1 do
      namespace :admin do
        resources :bookings, only: [] do
          resources :check_ins, only: [:create, :destroy]
        end
        resources :character_points, only: [:create]
        resources :characters, only: [:index] do
          resources :backstories, only: [:index]
        end
        resources :events, only: [:create, :destroy, :index, :update] do
          resources :envelopes, only: [:index]
          resources :pels, only: [:index]
        end
        resources :users, only: [:index, :show]
      end
      resources :account_confirmations, only: [:create]
      resources :between_games, only: [:index]
      resources :backstories, only: [:create]
      resources :bookings, only: [:create, :destroy] do
        resources :feedback, only: [:create]
      end
      resources :characters, only: [:create, :destroy, :edit, :index, :show, :update] do
        resources :tallies, only: [:index]
      end
      resources :client_token, only: [:index]
      resources :default_characters, only: [:update]
      resources :headers, only: [:index]
      resources :events, only: [:index] do
        resources :booking_characters, only: [:update]
        collection do
          resources :next, only: :index
        end
      end
      resources :lodging_questionnaires, only: [:create]
      resources :password_resets, only: [:create, :update]
      resources :sessions, only: [:create, :destroy]
      resources :users, only: [:create, :update] do
        collection do
          resources :current, only: :index
        end
      end
    end
  end

  # Arbitrary data (e.g. CSV) routes
  namespace :reports do
    resources :events, only: [] do
      resources :lodging_questionnaires, only: [:index]
    end
  end
end
