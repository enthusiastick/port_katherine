class CharacterHeaderSerializer < ActiveModel::Serializer
  attributes :category, :character_header_id, :header_id, :name, :true_header,
    :skills, :season

  def category
    object.header.category
  end

  def character_header_id
    object.id
  end

  def season
    object.header.season
  end

  def skills
    @skills = Array.new
    combined_skills.each { |skill| serialize_skill(skill) }
    @skills
  end

  def serialize_skill(skill)
    character_skill = CharacterSkill.find_by(character: object.character, skill: skill)
    if character_skill.present?
      @skills << CharacterSkillSerializer.new(character_skill).as_json
    else
      @skills << SkillSerializer.new(skill).as_json
    end
  end

  private

  def all_header_skills
    object.header.header_skills.where(hidden: false)
  end

  def character_skills
    object.character.skills & object.header.skills
  end

  def combined_skills
    criminal? && unlocked_crime? ? combined_skills_criminal_exception : default_combined_skills
  end

  def combined_skills_criminal_exception
    default_combined_skills - [Skill.avoid_trap]
  end

  def criminal?
    object.header == Header.criminal
  end

  def default_combined_skills
    (header_skills_to_serialize.map(&:skill) + character_skills).uniq
  end

  def first_true_header?
    instance_options[:first_true_header]
  end

  def header_skills_to_serialize
    @header_skills_to_serialize ||= first_true_header? ? all_header_skills : non_true_header_skills_only
  end

  def non_true_header_skills_only
    object.header.header_skills.where(hidden: false, true_skill: false)
  end

  def unlocked_crime?
    !object.character.character_skills.find_by(skill: Skill.crime).locked
  end
end
