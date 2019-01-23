class FixDefaultCharacterSpentCycle < ActiveRecord::Migration[5.1]
  class Character < ApplicationRecord
  end

  class Tally < ApplicationRecord
  end

  def up
    change_column :characters, :spent_cycle, :integer, default: -30, null: false
    Character.all.each do |character|
      adjusted_spent_cycle = character.spent_cycle + 3
      character.update(spent_cycle: adjusted_spent_cycle)
      Tally.create(
        annotation: character.tally_annotation,
        character: character,
        description: "audited spent cycle total.",
        user: User.admin.first
      )
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
