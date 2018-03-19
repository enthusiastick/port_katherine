class CharacterAdvancer
  def initialize(params, user_id)
    @character = Character.find_by(non_sequential_id: params[:id])
    @character_skills = params[:character_skills]
    @new_header_ids = params[:new_headers]
    @new_skills = params[:new_skills]
    @user = User.find(user_id)
  end

  attr_reader :response, :status

  def advance!
    ApplicationRecord.transaction do
      if purchase_headers! && update_character_skills! && purchase_new_skills!
        @status = :ok
        @response = @character
      else
        @status = :unprocessable_entity
        @response = { error: "Your changes could not be saved." }
      end
    end
  end

  def purchase_headers!
    @new_header_ids.each do |header_id|
      header =  Header.find(header_id)
      cost = @character.cost_of_header(header)
        character_header = CharacterHeader.new(character: @character, header: header)
      tally = Tally.new(
        character: @character,
        description: "#{@user.label} purchased *#{header.name}* for #{cost} CP.",
        user: @user
      )
      @character.spend!(cost) && character_header.save && tally.save && update_tally_annotation(tally)
    end
  end

  def update_character_skills!
    @character_skills.each do |character_skill|
      updated_character_skill = CharacterSkill.find(character_skill[:character_skill_id])
      updated_character_skill.update(character_skill.slice(:ranks))
    end
  end

  def purchase_new_skills!
    @new_skills.each do |skill|
      character_skill = CharacterSkill.new(skill)
      character_skill.character = @character
      character_skill.save
    end
  end

  def update_tally_annotation(tally)
    tally.update(annotation: "[#{@character.available}+#{@character.user.available}]")
  end
end
