class Character::EditSerializer < ActiveModel::Serializer
  attributes :id, :open, :headers

  def headers
    @headers = Array.new
    (Header.stock.alpha_by_name + object.headers).uniq.each do |header|
      character_header = CharacterHeader.find_by(character: object, header: header)
      if character_header.present?
        @headers << CharacterHeaderSerializer.new(character_header).as_json
      else
        @headers << Header::EditCharacterSerializer.new(header).as_json
      end
    end
    @headers
  end

  def open
    binding.pry
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
end
