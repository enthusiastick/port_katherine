class Header::EditCharacterSerializer < ActiveModel::Serializer
  attributes :category, :character_header_id, :header_id, :name, :true_header,
    :skills, :season

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
    combined_skills.each { |skill| serialize_skill(skill) }
    @skills
  end

  def serialize_skill(skill)
    character_skill = CharacterSkill.find_by(character: character, skill: skill)
    if character_skill.present?
      @skills << CharacterSkillSerializer.new(character_skill).as_json
    else
      @skills << SkillSerializer.new(skill).as_json
    end
  end

  private

  def character
    @character ||= instance_options[:character]
  end

  def combined_skills
    (header_skills_to_serialize.map(&:skill) + character_skills).uniq
  end

  def header_skills_to_serialize
    object.header_skills.where(hidden: false, true_skill: false)
  end

  def character_skills
    character.skills & object.skills
  end
end
