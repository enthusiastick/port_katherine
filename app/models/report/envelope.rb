class Report::Envelope
  def initialize(event_slug)
    @event = Event.find_by(slug: event_slug)
    @event_data_hash = Admin::Envelope::EventSerializer.new(@event).serializable_hash
  end

  SKILL_NAMES = ["Income", "Day Labor Income", "Military Officer",
    "Arcana Mine", "Citrine Mine", "Coal Mine", "Copper Mine",
    "Emerald Mine", "Gold Mine", "Iron Mine", "Lead Mine", "Magnesium Mine",
    "Ruby Mine", "Sapphire Mine", "Silver Mine", "Sulphur Mine", "Field",
    "Fishery", "Forest", "Pasture", "Heal Tonic Vial", "Purify Tonic Vial",
    "Venom Vial"]

  ATTRIBUTES = ["Character", "User"] + SKILL_NAMES

  def generate_csv
    CSV.generate(headers: true) do |csv|
      csv << ATTRIBUTES
      @event_data_hash[:characters].each { |character| csv << row_for(character) }
    end
  end

  private

  def cell_for(skill_name, skills_hash)
    skills_hash.keys.include?(skill_name) ? skills_hash[skill_name] : nil
  end

  def row_for(character_hash)
    row = Array.new
    row << character_hash[:name]
    row << character_hash[:user_name]
    SKILL_NAMES.each { |skill_name| row << cell_for(skill_name, character_hash[:skills]) }
    row
  end
end
