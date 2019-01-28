class Admin::HeaderSkill < ActiveModel::Serializer
  attributes :name, :skill_id

  def name
    "[#{object.header.name}] #{object.skill.name} (id: #{object.skill.id})"
  end

  def skill_id
    object.skill.id
  end
end
