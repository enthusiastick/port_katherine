class Character::SkillRevealer
  def initialize(params, user_id)
    @character = Character.deobfuscate(params[:character_id])
    @skill_ids = params[:skills]
    @skills = Skill.where(id: @skill_ids)
    @user = User.find(user_id)
  end

  attr_reader :character

  def reveal!
    if (@character.skills & @skills).empty?
      ApplicationRecord.transaction do
        reveal_skills!
      end
    else
      raise ActiveRecord::RecordInvalid
    end
  end

  private

  def reveal_skills!
    character_skills = []
    @skills.each do |skill|
      character_skill = CharacterSkill.new(character: character, skill: skill)
      character_skills << character_skill
    end
    tally = Tally.new(
      character: @character,
      description: "revealed #{skills_label}.",
      user: @user
    )
    character_skills.map(&:save) && tally.save && tally.update_annotation_for_character(@character)
  end

  def skills_label
    @skills.map(&:name).map { |name| name.prepend("'") && name.concat("'") }.to_sentence
  end
end
