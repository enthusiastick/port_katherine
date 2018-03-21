class Header::IndexSerializer < ActiveModel::Serializer
  belongs_to :parent_header

  attributes :id, :season, :name

  def season
    object.season.titleize
  end
end
