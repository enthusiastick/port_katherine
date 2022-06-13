class Api::V1::Admin::CharacterBgsController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def index
    @character = Character.deobfuscate(params[:character_id])

    render json: {
      id: @character.non_sequential_id,
      name: @character.name,
      character_bgs: bgs
    }
  end

  def bgs
    character_bgs = []
    @character.events.order(bgs_deadline: :desc).each do |event|
      unless event_bgs(event).empty?
        character_bgs << { name: event.name, slug: event.slug, bgs: event_bgs_serialized(event) }
      end
    end
    character_bgs
  end

  def event_bgs(event)
    @character.between_games.where(event: event)
  end

  def event_bgs_serialized(event)
    @character.between_games.where(event: event).select(:category, :non_sequential_id, :title)
  end

  def data(bgs)
    { id: bgs.non_sequential_id, title: bgs.title }
  end
end
