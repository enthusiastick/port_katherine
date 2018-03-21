class CharacterSkillSerializer < ActiveModel::Serializer
  attributes :character_skill_id, :skill_id, :ranks, :locked, :name,
    :cost_increase_amount, :cost_increase_rank, :max_rank, :starting_cost,
    :description

  def character_skill_id
    object.id
  end
end
