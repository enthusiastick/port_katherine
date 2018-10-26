class Character::HeaderOpener
  def initialize(params, user_id)
    @character = Character.deobfuscate(params[:character_id])
    @cost = params[:cost]
    @header_ids = params[:headers]
    @user = User.find(user_id)
  end

  attr_reader :character

  def open!
    total_cost = @header_ids.count * @cost
    if @character.can_spend?(total_cost)
      ApplicationRecord.transaction do
        purchase_headers!
      end
    else
      raise ActiveRecord::RecordInvalid
    end
  end

  def purchase_headers!
    @header_ids.each do |header_id|
      header = Header.find(header_id)
      character_header = CharacterHeader.new(character: @character, header: header)
      tally = Tally.new(
        character: @character,
        description: description(header.name),
        user: @user
      )
      @character.spend!(@cost) && character_header.save && tally.save && tally.update_annotation_for_character(@character)
    end
  end

  def description(name)
    @cost == 0 ? "opened '#{name}'." : "opened '#{name}' for #{@cost} CP."
  end
end
