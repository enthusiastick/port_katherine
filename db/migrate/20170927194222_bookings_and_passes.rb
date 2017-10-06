class BookingsAndPasses < ActiveRecord::Migration[5.1]
  def change
    create_table :passes do |t|
      t.boolean :active, default: true
      t.boolean :earlybird_discount, default: true
      t.string :name, null: false
      t.decimal :price, precision: 8, scale: 2, null: false
      t.string :slug

      t.timestamps
    end
    add_index :passes, :slug, unique: true

    create_table :bookings do |t|
      t.datetime :checked_in_at
      t.boolean :paid, default: false
      t.integer :event_id, null: false
      t.integer :category, default: 0, null: false
      t.integer :receipt_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :bookings, [:event_id, :user_id], unique: true

    create_table :event_passes do |t|
      t.integer :event_id, null: false
      t.integer :pass_id, null: false
    end
    add_index :event_passes, [:event_id, :pass_id], unique: true
  end
end
