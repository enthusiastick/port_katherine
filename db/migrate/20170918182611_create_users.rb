class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.boolean :admin, default: false
      t.string :confirmation_digest
      t.datetime :confirmed_at
      t.string :email, null: false
      t.integer :failed_sign_in_attempts, default: 0
      t.string :first_name, null: false
      t.string :handle, null: false
      t.string :last_name, null: false
      t.datetime :last_signed_in_at
      t.string :non_sequential_id, null: false
      t.string :password_digest
      t.string :password_reset_digest
      t.datetime :password_reset_sent_at
      t.string :remember_digest
      t.integer :sign_in_count, default: 0

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :handle, unique: true
    add_index :users, :non_sequential_id, unique: true
  end
end
