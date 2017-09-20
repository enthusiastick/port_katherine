class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :handle, :last_name

  def id
    object.non_sequential_id
  end
end
