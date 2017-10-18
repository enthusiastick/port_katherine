class RemoveNullConstraintFromBookingReceiptId < ActiveRecord::Migration[5.1]
  def up
    change_column :bookings, :receipt_id, :integer, null: true
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
