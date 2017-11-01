class Header::EditCharacterSerializer < ActiveModel::Serializer
  attributes :character_header_id, :header_id, :name, :true_header, :skills

  def character_header_id
    nil
  end

  def header_id
    object.id
  end

  def true_header
    false
  end

  def skills
    @skills = Array.new
    object.header_skills.where(hidden: false, true_skill: false).each do |header_skill|
      character_skill = CharacterSkill.find_by(character: object, skill: header_skill.skill)
      if character_skill.present?
        @skills << CharacterSkillSerializer.new(character_skill).as_json
      else
        @skills << SkillSerializer.new(header_skill.skill).as_json
      end
    end
    @skills
  end
end
