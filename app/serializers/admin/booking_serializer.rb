class Admin::BookingSerializer < ActiveModel::Serializer
  attributes :id, :category, :character, :checked_in_at, :paid, :pass,
    :purchased_at, :receipt, :user, :user_handle

  def character
    object.character.present? ? character_hash : {}
  end

  def purchased_at
    object.receipt.present? ? object.receipt.created_at.strftime("%d %b %Y") : nil
  end

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

  private

  def character_hash
    { id: object.character.non_sequential_id, name: object.character.name }
  end

end
