class Admin::BetweenGames::ShowSerializer < Admin::BetweenGames::IndexSerializer
  attributes :body

  has_many :comments do
    object.comments.order(:created_at)
  end
end
