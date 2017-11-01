class Api::V1::HeadersController < Api::ApiController
  def index
    headers = {}
    Header::PUBLIC.each do |category|
      headers_collection = Header.send(category)
      headers_hash = ActiveModel::Serializer::CollectionSerializer.new(headers_collection, serializer: Header::IndexSerializer).as_json
      headers[category] = headers_hash
    end
    render json: headers
  end
end
