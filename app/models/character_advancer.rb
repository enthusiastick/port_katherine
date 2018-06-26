class CharacterAdvancer
  def initialize(params, user_id)
    @character = Character.deobfuscate(params[:id])
    @character_skills = params[:character_skills]
    @new_header_ids = params[:new_headers]
    @new_skills = params[:new_skills]
    @user = User.find(user_id)
  end

  attr_reader :character

  def advance!
    ApplicationRecord.transaction do
      purchase_headers! && update_character_skills! && purchase_new_skills!
    end
  end

  def purchase_headers!
    @new_header_ids.each do |header_id|
      header =  Header.find(header_id)
      cost = @character.cost_of_header(header)
      character_header = CharacterHeader.new(character: @character, header: header)
      tally = Tally.new(
        character: @character,
        description: "opened '#{header.name}' for #{cost} CP.",
        user: @user
      )
      @character.spend!(cost) && character_header.save && tally.save && tally.update_annotation_for_character(@character)
    end
  end

  def update_character_skills!
    @character_skills.each do |character_skill|
      skill_to_update = CharacterSkill.find(character_skill[:character_skill_id])
      starting_rank = skill_to_update.ranks
      ending_rank = character_skill[:ranks]
      cost = skill_to_update.cost_of_delta(starting_rank, ending_rank)
      tally = Tally.new(
        character: @character,
        description: "raised '#{skill_to_update.name}' from #{starting_rank} to #{ending_rank} for #{cost} CP.",
        user: @user
      )
      @character.spend!(cost) && skill_to_update.update(character_skill.slice(:ranks)) && tally.save && tally.update_annotation_for_character(@character)
    end
  end

  def purchase_new_skills!
    @new_skills.each do |skill|
      character_skill = CharacterSkill.new(skill)
      character_skill.character = @character
      cost = character_skill.cost_of_delta(0, character_skill.ranks)
      tally = Tally.new(
        character: @character,
        description: "purchased '#{character_skill.name}' #{::ActionController::Base.helpers.pluralize(character_skill.ranks, 'time')} for #{cost} CP.",
        user: @user
      )
      @character.spend!(cost) && character_skill.save && tally.save && tally.update_annotation_for_character(@character)
    end
  end
end
