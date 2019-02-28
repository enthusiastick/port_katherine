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
    resources :bgs, only: [:index, :show]
    resources :characters, only: [:edit, :index, :show] do
      resources :backstories, only: [:index]
      resources :build_logs, only: [:index]
      resources :headers, only: [:new]
      resources :locks, only: [:index]
      resources :sheets, only: [:index]
      resources :skills, only: [:new]
    end
    resources :events, only: [:edit, :index, :new, :show] do
      resources :bgs, only: [:index] do
        collection do
          resources :tickets, only: [:index]
        end
      end
      get "check-in", to: "check_ins#index", as: :check_ins
      resources :envelopes, only: [:index]
      resources :headers_professions, only: [:index]
      resources :pels, only: [:index, :show]
      resources :reports, only: [:index]
      resources :self_reports, only: [:index]
      resources :sheets, only: [:index]
    end
    resources :headers, only: [:show]
    resources :skills, only: [:edit, :index, :new, :show]
    resources :transfer_character_points, only: [:index]
    resources :users, only: [:index, :show]
  end

  resources :account_confirmations, only: [:edit]
  resources :bgs, only: [:edit, :new, :show]
  resources :characters, only: [:edit, :index, :new, :show] do
    resources :backstory, only: [:index]
    resources :build_logs, only: [:index]
  end
  resources :events, only: [:index, :show] do
    ["register", "volunteer"].each do |path|
      get path, to: "bookings#new"
    end
    get "lodging-questionnaire", to: "lodgings#new"
  end
  resources :password_resets, only: [:edit, :new]
  resources :pels, only: [:edit, :new, :show]

  # API routes
  namespace :api do
    namespace :v1 do
      namespace :admin do
        resources :bgs, only: [:index, :show] do
          resources :answers, only: [:create]
          resources :assignees, only: [:update]
          resources :comments, only: [:create, :update]
        end
        resources :bookings, only: [] do
          resources :check_ins, only: [:create, :destroy]
        end
        resources :character_skill_locks, only: [:update]
        resources :character_headers, only: [:create]
        resources :character_points, only: [:create]
        resources :character_skills, only: [:create]
        resources :characters, only: [:index] do
          resources :available_headers, only: [:index]
          resources :available_skills, only: [:index]
          resources :backstories, only: [:index]
        end
        resources :events, only: [:create, :destroy, :index, :update] do
          resources :bgs, only: [:index]
          resources :character_headers, only: [:index, :show]
          resources :envelopes, only: [:index]
          resources :pels, only: [:index]
          resources :merchants, only: [:index]
        end
        resources :headers, only: [:index, :show]
        resources :skills, only: [:create, :index, :show, :update]
        resources :transfer_character_points, only: [:create]
        resources :users, only: [:index, :show]
      end
      resources :account_confirmations, only: [:create]
      resources :between_games, only: [:create, :index, :show, :update]
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
          resources :next, only: [:index]
        end
      end
      resources :lodging_questionnaires, only: [:create]
      resources :password_resets, only: [:create, :update]
      resources :sessions, only: [:create, :destroy]
      resources :users, only: [:create, :update] do
        collection do
          resources :current, only: [:index]
        end
      end
    end
    namespace :v2 do
      namespace :admin do
        resources :events, only: [:index, :show]
      end
    end
  end

  # Arbitrary data (e.g. CSV) routes
  namespace :reports do
    resources :events, only: [] do
      resources :envelopes, only: [:index]
      resources :lodging_questionnaires, only: [:index]
    end
  end
end
