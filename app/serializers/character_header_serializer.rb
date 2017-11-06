class CharacterHeaderSerializer < ActiveModel::Serializer
  attributes :character_header_id, :header_id, :name, :true_header, :skills

  def character_header_id
    object.id
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

  def combined_skills
    (header_skills_to_serialize.map(&:skill) + character_skills).uniq
  end

  def first_true_header?
    instance_options[:first_true_header]
  end

  def character_skills
    object.character.skills & object.header.skills
  end

  def header_skills_to_serialize
    @header_skills_to_serialize ||= first_true_header? ? all_header_skills : non_true_header_skills_only
  end

  def non_true_header_skills_only
    object.header.header_skills.where(hidden: false, true_skill: false)
  end
end
