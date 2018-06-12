class Api::V1::Admin::MerchantsController < Api::ApiController
  before_action :authenticate_plot_staff_api!

  def index
    @event = Event.find_by(slug: params[:event_id])
    characters = @event.characters.alpha_by_name.select { |character| character.headers.include?(Header.merchant) }
    render json: characters, each_serializer: ::Admin::MerchantSerializer, meta: meta
  end

  private

  def meta
    {
      event_name: @event.name,
      event_slug: @event.slug
    }
  end
end
