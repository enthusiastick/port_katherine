class Admin::Header::ShowSerializer < ActiveModel::Serializer
  attributes :id, :category, :name, :season

  has_many :skills do
    object.header_skills.joins(:skill).select(:hidden, :true_skill, 'skills.id', 'skills.name')
  end

  def category
    object.category.humanize.titleize
  end

  def season
    object.season.humanize.titleize
  end
end
