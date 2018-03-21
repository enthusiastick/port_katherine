class SkillSerializer < ActiveModel::Serializer
  attributes :character_skill_id, :skill_id, :ranks, :locked, :name,
    :cost_increase_amount, :cost_increase_rank, :max_rank, :starting_cost,
    :description

  def character_skill_id
    nil
  end

  def skill_id
    object.id
  end

  def ranks
    nil
  end

  def locked
    false
  end
end
