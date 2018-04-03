include ActionView::Helpers::NumberHelper

class Character::ShowSerializer < ActiveModel::Serializer
  attributes :id, :available, :backstories_count, :birthplace,
    :cycle_spending_cap, :headers, :name, :open, :player_available, :spent,
    :spent_cycle, :user_handle

  has_many :tallies do
    Tally.where(character: object).or(Tally.where(recipient: object.user)).order(created_at: :desc).limit(10)
  end

  def available
    number_to_human(object.available)
  end

  def backstories_count
    object.backstories.count
  end

  def birthplace
    object.birthplace.titleize
  end

  def id
    object.non_sequential_id
  end

  def headers
    @headers = Array.new
    object.character_headers.alpha_by_header_name.each do |character_header|
      first_true_header = (character_header.header == object.first_true_header)
      @headers << CharacterHeaderSerializer.new(character_header, { first_true_header: first_true_header }).as_json
    end
    @headers
  end

  def open
    @open = Array.new
    object.character_skills.where(skill: Header.open.skills).each do |character_skill|
      @open << CharacterSkillSerializer.new(character_skill).as_json
    end
    @open
  end

  def player_available
    number_to_human(object.user.available)
  end

  def user_handle
    object.user.handle
  end
end
