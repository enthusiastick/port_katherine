class Admin::Skill::ShowSerializer < ActiveModel::Serializer
  attributes :id, :cost_increase_amount, :cost_increase_rank, :description,
    :max_rank, :name, :starting_cost

  has_many :characters do
    object.character_skills.joins(:character).map { |cs|
        {
          id: cs.character.non_sequential_id,
          locked: cs.locked,
          name: cs.character.name,
          ranks: cs.ranks
        }
      }
  end

  has_many :headers do
    object.header_skills.joins(:header).select(:hidden, :true_skill, 'headers.id', 'headers.name')
  end
end
