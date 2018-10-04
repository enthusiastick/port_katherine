class Admin::Header::IndexSerializer < ActiveModel::Serializer
  attributes :id, :category, :name

  def category
    object.category.humanize.titleize
  end

  def name
    object.advanced? && object.parent_header.present? ? "[#{object.parent_header.name}] #{object.name}" : object.name
  end
end
