class Admin::BookingSerializer < ActiveModel::Serializer
  attributes :id, :checked_in_at, :category, :paid, :pass, :receipt, :user,
    :user_handle

  def pass
    object.receipt.present? ? object.receipt.pass.name : nil
  end

  def user
    object.user.label
  end

  def user_handle
    object.user.handle
  end

  def receipt
    object.receipt.present? ? object.receipt.braintree_transaction_id : nil
  end
end
