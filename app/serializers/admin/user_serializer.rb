class Admin::UserSerializer < ActiveModel::Serializer
  attributes :available, :handle, :email, :last_sign_in, :name, :self_report,
    :since, :sign_in_count

  has_many :characters do
    object.characters.alpha_by_name.map{ |character| ::Admin::CharacterSerializer.new(character).as_json }
  end

  def since
    "#{ActionController::Base.helpers.distance_of_time_in_words_to_now(object.created_at)} (since #{object.created_at.to_date.to_formatted_s(:rfc822)})"
  end

  def last_sign_in
    "#{ActionController::Base.helpers.distance_of_time_in_words_to_now(object.last_signed_in_at)} ago"
  end

  def last_ip
  end

  def name
    object.label
  end
end
