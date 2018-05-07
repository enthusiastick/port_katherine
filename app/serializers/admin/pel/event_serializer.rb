class Admin::Pel::EventSerializer < ActiveModel::Serializer
  attributes :name, :slug

  has_many :bookings do
    object.bookings.where.not(feedback_entered_at: nil).alpha_by_user_first_name
  end

  class BookingSerializer < ActiveModel::Serializer
    attributes :id, :category, :feedback, :user_handle, :user_label

    def user_handle
      object.user.handle
    end

    def user_label
      object.user.label
    end
  end
end
