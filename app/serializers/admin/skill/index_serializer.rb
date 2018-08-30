class Admin::Skill::IndexSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :headers do
    object.headers.alpha_by_name.select(:id, :name)
  end
end
