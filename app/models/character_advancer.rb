class CharacterAdvancer
  def initialize(params)
    @character = Character.find_by(non_sequential_id: params[:id])
    @character_skills = params[:character_skills]
    @new_header_ids = params[:new_headers]
    @new_skills = params[:new_skills]
    binding.pry
  end

  attr_reader :response, :status

  def advance!
  end
end
