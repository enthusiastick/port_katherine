class Admin::Pel::EventSerializer < ActiveModel::Serializer
  attributes :name, :slug

  has_many :bookings do
    object.bookings.where.not(feedback_entered_at: nil).alpha_by_user_first_name
  end

  class BookingSerializer < ActiveModel::Serializer
    attributes :id, :category, :character_id, :character_name, :feedback,
      :timestamp, :timestamp_label, :user_handle, :user_label

    def character_id
      object.character.present? ? object.character.non_sequential_id : nil
    end

    def character_name
      object.character.present? ? object.character.name : nil
    end

    def timestamp
      object.feedback_entered_at.present? ? object.feedback_entered_at.to_i : nil
    end

    def timestamp_label
      object.feedback_entered_at.present? ? object.feedback_entered_at.strftime("%d %b %Y %l:%M%P") : nil
    end

    def user_handle
      object.user.handle
    end

    def user_label
      object.user.label
    end
  end
end
