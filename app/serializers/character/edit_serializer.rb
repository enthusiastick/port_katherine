class Character::EditSerializer < ActiveModel::Serializer
  attributes :id, :available, :cycle_spending_cap, :headers, :name, :open,
    :player_available, :spent, :spent_cycle

  def id
    object.non_sequential_id
  end

  def headers
    @headers = Array.new
    (Header.stock.alpha_by_name + Header.profession.alpha_by_name + object.headers).uniq.each do |header|
      character_header = CharacterHeader.find_by(character: object, header: header)
      if character_header.present?
        first_true_header = (character_header.header == object.first_true_header)
        @headers << CharacterHeaderSerializer.new(character_header, { first_true_header: first_true_header }).as_json
      else
        @headers << Header::EditCharacterSerializer.new(header, { character: object }).as_json
      end
    end
    @headers
  end

  def open
    @open = Array.new
    Header.open.skills.each do |skill|
      character_skill = CharacterSkill.find_by(character: object, skill: skill)
      if character_skill.present?
        @open << CharacterSkillSerializer.new(character_skill).as_json
      else
        @open << SkillSerializer.new(skill).as_json
      end
    end
    @open
  end

  def player_available
    object.user.available
  end
end
