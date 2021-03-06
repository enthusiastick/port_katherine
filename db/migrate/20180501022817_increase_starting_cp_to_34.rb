class IncreaseStartingCpTo34 < ActiveRecord::Migration[5.2]
  def up
    change_column :characters, :available, :decimal,
      precision: 6, scale: 2, default: 34.0
  end

  def down
    change_column :characters, :available, :decimal,
      precision: 6, scale: 2, default: 33.0
  end
end
