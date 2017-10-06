class CreateReceipts < ActiveRecord::Migration[5.1]
  def change
    create_table :receipts do |t|
      t.decimal :amount, precision: 8, scale: 2, null: false
      t.string :braintree_transaction_id, null: false
      t.string :cardholder_name
      t.string :image_url
      t.inet :ip_address
      t.integer :pass_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :receipts, [:pass_id, :user_id], unique: true
  end
end
