class Admin::BetweenGames::ShowSerializer < Admin::BetweenGames::IndexSerializer
  attributes :body, :respondent_handle, :respondent_label, :response,
    :response_title, :response_released_at

  has_many :comments do
    object.comments.order(:created_at)
  end

  def respondent_handle
    object.respondent.present? ? object.respondent.handle : nil
  end

  def respondent_label
    object.respondent.present? ? object.respondent.label : nil
  end

  def response_released_at
    object.response_released_at.present? ? object.response_released_at.to_i : nil
  end

  def self.serializer_for(model, options)
    return ::Admin::CommentSerializer if model.class.name == "Comment"
    super
  end
end
