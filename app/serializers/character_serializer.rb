include ActionView::Helpers::NumberHelper

class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :available, :birthplace, :cycle_spending_cap, :headers,
    :name, :player_available, :spent, :spent_cycle

  def available
    number_to_human(object.available)
  end

  def birthplace
    object.birthplace.titleize
  end

  def id
    object.non_sequential_id
  end

  def headers
    object.character_headers.map(&:header_name)
  end

  def player_available
    number_to_human(object.user.available)
  end
end
