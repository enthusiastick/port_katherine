class Admin::BetweenGames::ShowSerializer < Admin::BetweenGames::IndexSerializer
  attributes :after_event_release, :before_event_release, :body,
    :is_visible_now, :respondent_handle, :respondent_label, :response,
    :response_title, :response_released_at

  has_many :comments do
    object.comments.order(:created_at)
  end

  def after_event_release
    object.after_event_release.to_i
  end

  def before_event_release
    object.before_event_release.to_i
  end

  def is_visible_now
    object.visible?
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
