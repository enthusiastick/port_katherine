class Admin::Header::IndexSerializer < ActiveModel::Serializer
  attributes :id, :category, :name

  def category
    object.category.humanize.titleize
  end
end
