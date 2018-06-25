class Api::V1::Admin::CharacterHeadersController < Api::ApiController
  before_action :authenticate_plot_staff_api!

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
      header_name: @header.name,
      linked_first_skill_name: linked_first_skill_name,
      event_name: @event.name,
      event_slug: @event.slug
    }
  end
end
