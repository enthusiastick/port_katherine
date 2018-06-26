class Header::IndexSerializer < ActiveModel::Serializer
  belongs_to :parent_header

  attributes :id, :name, :season

  def season
    object.season.titleize
  end
end
