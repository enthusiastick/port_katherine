class BookingSerializer < ActiveModel::Serializer
  attributes :id, :character, :checked_in_at, :category,
    :lodging_questionnaire_completed_at, :paid, :pass

  def character
    object.character.present? ? object.character.non_sequential_id : nil
  end

  def pass
    object.receipt.present? ? object.receipt.pass.name : nil
  end
end
