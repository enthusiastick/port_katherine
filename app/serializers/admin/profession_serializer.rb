class Admin::ProfessionSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_handle, :user_label, :ranks

  def character_skill
    @character_skill ||= object.character_skills.find_by(skill: linked_first_skill)
  end

  def header
    @header ||= Header.find(instance_options[:header_id])
  end

  def id
    object.non_sequential_id
  end

  def linked_first_skill
    header.present? ? header.linked_first_skill : nil
  end

  def linked_first_skill_ranks_present?
    character_skill.present?
  end

  def linked_first_skill_ranks
    linked_first_skill_ranks_present? ? character_skill.ranks : nil
  end

  def ranks
    linked_first_skill.present? ? linked_first_skill_ranks : nil
  end

  def user_handle
    object.user.handle
  end

  def user_label
    object.user.label
  end
end
