class Admin::MerchantSerializer < ActiveModel::Serializer
  attributes :id, :lots, :name, :user_handle, :user_label

  def id
    object.non_sequential_id
  end

  def lots
    object.character_skills.find_by(skill: Skill.lots).ranks
  end

  def user_handle
    object.user.handle
  end

  def user_label
    object.user.label
  end
end
