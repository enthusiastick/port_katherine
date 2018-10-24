class Api::V1::Admin::CharacterHeadersController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def create
    opener = ::Character::HeaderOpener.new(character_header_params, current_user.id)
    if opener.open!
      render json: { character: opener.character }
    else
      render json: { error: opener.character.errors }, status: :unprocessable_entity
    end
  end

  def index
    @header = Header.merchant
    @event = Event.find_by(slug: params[:event_id])
    characters = @event.characters.alpha_by_name.select { |character| character.headers.include?(@header) }
    render json: characters, each_serializer: ::Admin::ProfessionSerializer, header_id: @header.id, meta: meta
  end

  def show
    @header = Header.find(params[:id])
    @event = Event.find_by(slug: params[:event_id])
    characters = @event.characters.alpha_by_name.select { |character| character.headers.include?(@header) }
    render json: characters, each_serializer: ::Admin::ProfessionSerializer, header_id: params[:id], meta: meta
  end

  private

  def character_header_params
    params.require(:character_header).permit(:character_id, :cost, headers: [])
  end

  def linked_first_skill
    @linked_first_skill ||= @header.linked_first_skill
  end

  def linked_first_skill_name
    linked_first_skill.present? && show_linked_first_skill_name ? linked_first_skill.name : nil
  end

  def show_linked_first_skill_name
    linked_first_skill.present? ? HeaderSkill.find_by(header: @header, skill: linked_first_skill).hidden? : false
  end

  def meta
    {
      header_id: @header.id,
      header_name: @header.name.pluralize,
      linked_first_skill_name: linked_first_skill_name,
      event_name: @event.name,
      event_slug: @event.slug
    }
  end
end
