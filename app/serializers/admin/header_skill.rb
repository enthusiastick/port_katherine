class Admin::HeaderSkill < ActiveModel::Serializer
  attributes :id, :name

  def id
    object.skill.id
  end

  def name
    "[#{object.header.name}] #{object.skill.name} (id: #{object.skill.id})"
  end
end
