class Receipt < ApplicationRecord
  belongs_to :pass
  belongs_to :user

  validates_presence_of :braintree_transaction_id
  validates_numericality_of :amount, greater_than_or_equal_to: 0
end
